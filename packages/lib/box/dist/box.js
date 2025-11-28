var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Address } from "./address";
import { Arrays, asDefined, asInstanceOf, ByteArrayOutput, ByteCounter, isDefined, isRecord, Lazy, Option, panic } from "@opendaw/lib-std";
import { PointerHub } from "./pointer-hub";
import { Serializer } from "./serializer";
export class Box {
    static DEBUG_DELETION = false;
    static Index = 0 | 0;
    #address;
    #graph;
    #name;
    #pointerRules;
    #fields;
    #creationIndex = Box.Index++;
    constructor({ uuid, graph, name, pointerRules }) {
        this.#address = Address.compose(uuid);
        this.#graph = graph;
        this.#name = name;
        this.#pointerRules = pointerRules;
        this.#fields = this.initializeFields();
        if (pointerRules.mandatory) {
            this.graph.edges().watchVertex(this);
        }
    }
    fields() { return Object.values(this.#fields); }
    record() { return this.#fields; }
    getField(key) {
        return asDefined(this.#fields[key], () => `Field ${String(key)} not found in ${this.toString()}`);
    }
    optField(key) { return Option.wrap(this.#fields[key]); }
    subscribe(propagation, procedure) {
        return this.graph.subscribeVertexUpdates(propagation, this.address, procedure);
    }
    get box() { return this; }
    get name() { return this.#name; }
    get graph() { return this.#graph; }
    get parent() { return this; }
    get address() { return this.#address; }
    get pointerRules() { return this.#pointerRules; }
    get creationIndex() { return this.#creationIndex; }
    get pointerHub() { return new PointerHub(this); }
    estimateMemory() {
        const byteCounter = new ByteCounter();
        this.write(byteCounter);
        return byteCounter.count;
    }
    isBox() { return true; }
    asBox(type) { return asInstanceOf(this, type); }
    isField() { return false; }
    isAttached() { return this.#graph.findBox(this.address.uuid).nonEmpty(); }
    read(input) { Serializer.readFields(input, this.#fields); }
    write(output) { Serializer.writeFields(output, this.#fields); }
    serialize() {
        const output = ByteArrayOutput.create();
        output.writeInt(this.#creationIndex); // allows to re-load the boxes in the same order as created
        output.writeString(this.name);
        output.writeBytes(new Int8Array(this.address.uuid.buffer));
        this.write(output);
        return output.toArrayBuffer();
    }
    toArrayBuffer() {
        const output = ByteArrayOutput.create();
        this.write(output);
        return output.toArrayBuffer();
    }
    toJSON() {
        return Object.entries(this.#fields).reduce((result, [key, field]) => {
            const value = field.toJSON();
            if (isDefined(value)) {
                result[key] = value;
            }
            return result;
        }, {});
    }
    fromJSON(record) {
        if (isRecord(record)) {
            Object.entries(record).forEach(([key, value]) => {
                const field = this.#fields[parseInt(key)];
                if (isDefined(value)) {
                    field.fromJSON(value);
                }
            });
        }
        else {
            return panic("Type mismatch");
        }
    }
    incomingEdges() { return this.graph.edges().incomingEdgesOf(this); }
    outgoingEdges() { return this.graph.edges().outgoingEdgesOf(this); }
    mapFields(map, ...keys) {
        if (keys.length === 0) {
            return Arrays.empty();
        }
        let parent = this.getField(keys[0]);
        const result = [map(parent)];
        for (let index = 1; index < keys.length; index++) {
            parent = parent.getField(keys[index]);
            result.push(map(parent));
        }
        return result;
    }
    searchVertex(keys) {
        if (keys.length === 0) {
            return Option.wrap(this);
        }
        let parent = this.optField(keys[0]);
        if (parent.isEmpty()) {
            return Option.None;
        }
        for (let index = 1; index < keys.length; index++) {
            parent = parent.unwrap().optField(keys[index]);
            if (parent.isEmpty()) {
                return Option.None;
            }
        }
        return parent;
    }
    delete() {
        if (!this.isAttached()) {
            return;
        }
        const { boxes, pointers } = this.graph.dependenciesOf(this);
        if (Box.DEBUG_DELETION) {
            console.debug(`Delete ${this.toString()}`);
            console.debug("\tunplugs", [...pointers].map(x => x.toString()).join("\n"));
            console.debug("\tunstages", [...boxes].map(x => x.toString()).join("\n"), this);
        }
        for (const pointer of pointers) {
            pointer.defer();
        }
        for (const box of boxes) {
            box.unstage();
        }
        this.unstage();
    }
    unstage() { this.graph.unstageBox(this); }
    isValid() {
        if (this.#pointerRules.mandatory && this.pointerHub.incoming().length === 0) {
            return false;
        }
        const walkRecursive = (fields) => fields.every(field => field.accept({
            visitPointerField: (field) => !field.mandatory || field.nonEmpty(),
            visitArrayField: (field) => walkRecursive(field.fields()),
            visitObjectField: (field) => walkRecursive(field.fields()),
            visitPrimitiveField: (_field) => true,
            visitField: (_field) => true
        }) ?? true);
        return walkRecursive(this.fields());
    }
    toString() { return `${this.constructor.name} ${this.address.toString()}`; }
}
__decorate([
    Lazy,
    __metadata("design:type", PointerHub),
    __metadata("design:paramtypes", [])
], Box.prototype, "pointerHub", null);
