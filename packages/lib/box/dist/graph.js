import { asDefined, assert, ByteArrayInput, ByteArrayOutput, Checksum, isDefined, Listeners, Option, panic, Predicates, UUID } from "@opendaw/lib-std";
import { Address } from "./address";
import { DeleteUpdate, NewUpdate, PointerUpdate, PrimitiveUpdate } from "./updates";
import { Dispatchers } from "./dispatchers";
import { GraphEdges } from "./graph-edges";
export class BoxGraph {
    #boxFactory;
    #boxes;
    #deferredPointerUpdates;
    #updateListeners;
    #immediateUpdateListeners;
    #transactionListeners;
    #dispatchers;
    #edges;
    #pointerTransactionState;
    #finalizeTransactionObservers;
    #inTransaction = false;
    #constructingBox = false;
    constructor(boxFactory = Option.None) {
        this.#boxFactory = boxFactory;
        this.#boxes = UUID.newSet(box => box.address.uuid);
        this.#deferredPointerUpdates = [];
        this.#dispatchers = Dispatchers.create();
        this.#updateListeners = new Listeners();
        this.#immediateUpdateListeners = new Listeners();
        this.#transactionListeners = new Listeners();
        this.#edges = new GraphEdges();
        this.#pointerTransactionState = Address.newSet(({ pointer }) => pointer.address);
        this.#finalizeTransactionObservers = [];
    }
    beginTransaction() {
        assert(!this.#inTransaction, "Transaction already in progress");
        this.#inTransaction = true;
        this.#transactionListeners.proxy.onBeginTransaction();
    }
    endTransaction() {
        assert(this.#inTransaction, "No transaction in progress");
        if (this.#deferredPointerUpdates.length > 0) {
            this.#deferredPointerUpdates.forEach(({ pointerField, update }) => this.#processPointerVertexUpdate(pointerField, update));
            this.#deferredPointerUpdates.length = 0;
        }
        this.#pointerTransactionState.values()
            .toSorted((a, b) => a.index - b.index)
            .forEach(({ pointer, initial, final }) => {
            if (!initial.equals(final)) {
                initial.ifSome(address => this.findVertex(address).unwrapOrUndefined()?.pointerHub.onRemoved(pointer));
                final.ifSome(address => this.findVertex(address).unwrapOrUndefined()?.pointerHub.onAdded(pointer));
            }
        });
        this.#pointerTransactionState.clear();
        this.#inTransaction = false;
        // it is possible that new observers will be added while executing
        while (this.#finalizeTransactionObservers.length > 0) {
            this.#finalizeTransactionObservers.splice(0).forEach(observer => observer());
            if (this.#finalizeTransactionObservers.length > 0) {
                console.debug(`${this.#finalizeTransactionObservers.length} new observers while notifying`);
            }
        }
        this.#transactionListeners.proxy.onEndTransaction();
    }
    inTransaction() { return this.#inTransaction; }
    constructingBox() { return this.#constructingBox; }
    createBox(name, uuid, constructor) {
        return this.#boxFactory.unwrap("No box-factory installed")(name, this, uuid, constructor);
    }
    stageBox(box, constructor) {
        this.#assertTransaction();
        assert(!this.#constructingBox, "Cannot construct box while other box is constructing");
        if (isDefined(constructor)) {
            this.#constructingBox = true;
            constructor(box);
            this.#constructingBox = false;
        }
        const added = this.#boxes.add(box);
        assert(added, `${box} already staged`);
        const update = new NewUpdate(box.address.uuid, box.name, box.toArrayBuffer());
        this.#updateListeners.proxy.onUpdate(update);
        this.#immediateUpdateListeners.proxy.onUpdate(update);
        return box;
    }
    subscribeTransaction(listener) {
        return this.#transactionListeners.subscribe(listener);
    }
    subscribeToAllUpdates(listener) {
        return this.#updateListeners.subscribe(listener);
    }
    subscribeToAllUpdatesImmediate(listener) {
        return this.#immediateUpdateListeners.subscribe(listener);
    }
    subscribeVertexUpdates(propagation, address, procedure) {
        return this.#dispatchers.subscribe(propagation, address, procedure);
    }
    subscribeEndTransaction(observer) { this.#finalizeTransactionObservers.push(observer); }
    unstageBox(box) {
        this.#assertTransaction();
        const deleted = this.#boxes.removeByKey(box.address.uuid);
        assert(deleted === box, `${box} could not be found to unstage`);
        this.#edges.unwatchVerticesOf(box);
        const update = new DeleteUpdate(box.address.uuid, box.name, box.toArrayBuffer());
        this.#updateListeners.proxy.onUpdate(update);
        this.#immediateUpdateListeners.proxy.onUpdate(update);
    }
    findBox(uuid) {
        return this.#boxes.opt(uuid);
    }
    findVertex(address) {
        return this.#boxes.opt(address.uuid).flatMap(box => box.searchVertex(address.fieldKeys));
    }
    boxes() { return this.#boxes.values(); }
    edges() { return this.#edges; }
    checksum() {
        const checksum = new Checksum();
        this.boxes().forEach(box => box.write(checksum));
        return checksum.result();
    }
    onPrimitiveValueUpdate(field, oldValue, newValue) {
        this.#assertTransaction();
        if (field.isAttached() && !this.#constructingBox) {
            const update = new PrimitiveUpdate(field.address, field.serialization(), oldValue, newValue);
            this.#dispatchers.dispatch(update);
            this.#updateListeners.proxy.onUpdate(update);
            this.#immediateUpdateListeners.proxy.onUpdate(update);
        }
    }
    onPointerAddressUpdated(pointerField, oldValue, newValue) {
        this.#assertTransaction();
        if (oldValue.nonEmpty()) {
            this.#edges.disconnect(pointerField);
        }
        if (newValue.nonEmpty()) {
            this.#edges.connect(pointerField, newValue.unwrap());
        }
        const update = new PointerUpdate(pointerField.address, oldValue, newValue);
        if (this.#constructingBox) {
            this.#deferredPointerUpdates.push({ pointerField, update });
        }
        else {
            this.#processPointerVertexUpdate(pointerField, update);
            this.#immediateUpdateListeners.proxy.onUpdate(update);
        }
    }
    #processPointerVertexUpdate(pointerField, update) {
        const { oldAddress, newAddress } = update;
        pointerField.resolvedTo(newAddress.flatMap(address => this.findVertex(address)));
        const optState = this.#pointerTransactionState.opt(pointerField.address);
        optState.match({
            none: () => this.#pointerTransactionState.add({
                pointer: pointerField,
                initial: oldAddress,
                final: newAddress,
                index: this.#pointerTransactionState.size()
            }),
            some: state => state.final = newAddress
        });
        this.#dispatchers.dispatch(update);
        this.#updateListeners.proxy.onUpdate(update);
    }
    dependenciesOf(box, options = {}) {
        const excludeBox = isDefined(options.excludeBox) ? options.excludeBox : Predicates.alwaysFalse;
        const alwaysFollowMandatory = isDefined(options.alwaysFollowMandatory) ? options.alwaysFollowMandatory : false;
        const boxes = new Set();
        const pointers = new Set();
        const trace = (box) => {
            if (boxes.has(box) || excludeBox(box)) {
                return;
            }
            boxes.add(box);
            box.outgoingEdges()
                .filter(([pointer]) => !pointers.has(pointer))
                .forEach(([source, targetAddress]) => {
                const targetVertex = this.findVertex(targetAddress)
                    .unwrap(`Could not find target of ${source.toString()}`);
                pointers.add(source);
                if (targetVertex.pointerRules.mandatory &&
                    (alwaysFollowMandatory || targetVertex.pointerHub.incoming()
                        .every(pointer => pointers.has(pointer)))) {
                    return trace(targetVertex.box);
                }
            });
            box.incomingEdges()
                .forEach(pointer => {
                pointers.add(pointer);
                if (pointer.mandatory) {
                    trace(pointer.box);
                }
            });
        };
        trace(box);
        boxes.delete(box);
        return { boxes, pointers: Array.from(pointers).reverse() };
    }
    verifyPointers() {
        this.#edges.validateRequirements();
        let count = 0 | 0;
        const verify = (vertex) => {
            for (const field of vertex.fields()) {
                field.accept({
                    visitPointerField: (pointer) => {
                        if (pointer.targetAddress.nonEmpty()) {
                            const isResolved = pointer.targetVertex.nonEmpty();
                            const inGraph = this.findVertex(pointer.targetAddress.unwrap()).nonEmpty();
                            assert(isResolved, `pointer ${pointer.address} is broken`);
                            assert(inGraph, `Cannot find target for pointer ${pointer.address}`);
                            count++;
                        }
                    },
                    visitObjectField: (object) => verify(object)
                });
            }
        };
        this.#boxes.forEach((box) => verify(box));
        console.debug("verification complete.");
        return { count };
    }
    debugBoxes() {
        console.table(this.#boxes.values().reduce((dict, box) => {
            dict[UUID.toString(box.address.uuid)] = {
                class: box.name,
                "incoming links": box.incomingEdges().length,
                "outgoing links": box.outgoingEdges().length,
                "est. memory (bytes)": box.estimateMemory()
            };
            return dict;
        }, {}));
    }
    debugDependencies() {
        console.debug("Dependencies:");
        this.boxes().forEach(box => {
            console.debug(`\t${box}`);
            for (const dependency of this.dependenciesOf(box).boxes) {
                console.debug(`\t\t${dependency}`);
            }
        });
    }
    addressToDebugPath(address) {
        return address.flatMap(address => address.isBox()
            ? this.findBox(address.uuid).map(box => box.name)
            : this.findBox(address.uuid)
                .flatMap(box => box.searchVertex(address.fieldKeys)
                .map(vertex => vertex.isField() ? vertex.debugPath : panic("Unknown address"))));
    }
    toArrayBuffer() {
        const output = ByteArrayOutput.create();
        const boxes = this.#boxes.values();
        output.writeInt(boxes.length);
        boxes.forEach(box => {
            const buffer = box.serialize();
            output.writeInt(buffer.byteLength);
            output.writeBytes(new Int8Array(buffer));
        });
        return output.toArrayBuffer();
    }
    fromArrayBuffer(arrayBuffer) {
        assert(this.#boxes.isEmpty(), "Cannot call fromArrayBuffer if boxes is not empty");
        const input = new ByteArrayInput(arrayBuffer);
        const numBoxes = input.readInt();
        this.beginTransaction();
        const boxes = [];
        for (let i = 0; i < numBoxes; i++) {
            const length = input.readInt();
            const int8Array = new Int8Array(length);
            input.readBytes(int8Array);
            const boxStream = new ByteArrayInput(int8Array.buffer);
            const creationIndex = boxStream.readInt();
            const name = boxStream.readString();
            const uuid = UUID.fromDataInput(boxStream);
            boxes.push({ creationIndex, name, uuid, boxStream });
        }
        boxes
            .sort((a, b) => a.creationIndex - b.creationIndex)
            .forEach(({ name, uuid, boxStream }) => this.createBox(name, uuid, box => box.read(boxStream)));
        this.endTransaction();
    }
    toJSON() {
        return this.#boxes.values().map(box => ({
            name: box.name,
            uuid: box.address.toString(),
            fields: asDefined(box.toJSON())
        }));
    }
    #assertTransaction() {
        assert(this.#inTransaction, () => "Modification only prohibited in transaction mode.");
    }
}
