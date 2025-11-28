import { Arrays, isDefined, isInstanceOf, panic } from "@opendaw/lib-std";
import { Address } from "./address";
import { PointerField } from "./pointer";
export class GraphEdges {
    #requiresTarget;
    #requiresPointer;
    #incoming;
    #outgoing;
    constructor() {
        this.#requiresTarget = Address.newSet(source => source.address);
        this.#requiresPointer = Address.newSet(vertex => vertex.address);
        this.#incoming = Address.newSet(([address]) => address);
        this.#outgoing = Address.newSet(([source]) => source.address);
    }
    watchVertex(vertex) {
        if (isInstanceOf(vertex, PointerField)) {
            if (!vertex.mandatory) {
                return panic("watchVertex called but has no edge requirement");
            }
            this.#requiresTarget.add(vertex);
        }
        else {
            if (!vertex.pointerRules.mandatory) {
                return panic("watchVertex called but has no edge requirement");
            }
            this.#requiresPointer.add(vertex);
        }
    }
    unwatchVerticesOf(...boxes) {
        const map = ({ box: { address: { uuid } } }) => uuid;
        for (const { address: { uuid } } of boxes) {
            this.#removeSameBox(this.#requiresTarget, uuid, map);
            this.#removeSameBox(this.#requiresPointer, uuid, map);
        }
        for (const box of boxes) {
            const outgoingLinks = this.outgoingEdgesOf(box);
            if (outgoingLinks.length > 0) {
                return panic(`${box} has outgoing edges: ${outgoingLinks.map(([source, target]) => `[${source.toString()}, ${target.toString()}]`)}`);
            }
            const incomingPointers = this.incomingEdgesOf(box);
            if (incomingPointers.length > 0) {
                return panic(`${box} has incoming edges from: ${incomingPointers.map((source) => source.toString())}`);
            }
        }
    }
    connect(source, target) {
        this.#outgoing.add([source, target]);
        this.#incoming.opt(target).match({
            none: () => this.#incoming.add([target, [source]]),
            some: ([, sources]) => sources.push(source)
        });
    }
    disconnect(source) {
        const [, target] = this.#outgoing.removeByKey(source.address);
        const [, sources] = this.#incoming.get(target);
        Arrays.remove(sources, source);
        if (sources.length === 0) {
            this.#incoming.removeByKey(target);
        }
    }
    isConnected(source, target) {
        return this.#outgoing.opt(source.address).mapOr(([, actualTarget]) => actualTarget.equals(target), false);
    }
    outgoingEdgesOf(box) {
        return this.#collectSameBox(this.#outgoing, box.address.uuid, ([{ box: { address: { uuid } } }]) => uuid);
    }
    incomingEdgesOf(vertex) {
        if (vertex.isBox()) {
            return this.#collectSameBox(this.#incoming, vertex.address.uuid, ([{ uuid }]) => uuid)
                .flatMap(([_, pointers]) => pointers);
        }
        else {
            return this.#incoming.opt(vertex.address).mapOr(([_, pointers]) => pointers, Arrays.empty());
        }
    }
    validateRequirements() {
        // TODO I removed the assertions because they were too slow in busy graphs.
        //  I tried to use a Set<Box> in BoxGraph, but that wasn't faster than the SortedSet.
        //  We could just use a boolean in Box, but it could be set from the outside world and break it.
        //  Claude suggest to use dirty sets, but I am too lazy to implement it right now.
        // const now = performance.now()
        this.#requiresTarget.forEach(pointer => {
            // assert(pointer.isAttached(), `Pointer ${pointer.address.toString()} is not attached`)
            if (pointer.isEmpty()) {
                if (pointer.mandatory) {
                    return panic(`Pointer ${pointer.toString()} requires an edge.`);
                }
                else {
                    return panic(`Illegal state: ${pointer} has no edge requirements.`);
                }
            }
        });
        this.#requiresPointer.forEach(target => {
            // assert(target.isAttached(), `Target ${target.address.toString()} is not attached`)
            if (target.pointerHub.isEmpty()) {
                if (target.pointerRules.mandatory) {
                    return panic(`Target ${target.toString()} requires an edge.`);
                }
                else {
                    return panic(`Illegal state: ${target} has no edge requirements.`);
                }
            }
        });
        // console.debug(`GraphEdges validation took ${performance.now() - now} ms.`)
    }
    #collectSameBox(set, id, map) {
        const range = Address.boxRange(set, id, map);
        return isDefined(range) ? set.values().slice(range[0], range[1]) : Arrays.empty();
    }
    #removeSameBox(set, id, map) {
        const range = Address.boxRange(set, id, map);
        if (isDefined(range)) {
            set.removeRange(range[0], range[1]);
        }
    }
}
