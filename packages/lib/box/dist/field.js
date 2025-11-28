var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Arrays, Lazy, Objects, Option, panic, safeExecute } from "@opendaw/lib-std";
import { Address } from "./address";
import { PointerHub } from "./pointer-hub";
export class Field {
    static hook(construct) {
        return new Field(construct);
    }
    #parent;
    #fieldKey;
    #fieldName;
    #pointerRules;
    #deprecated;
    constructor({ parent, fieldKey, fieldName, pointerRules, deprecated }) {
        this.#parent = parent;
        this.#fieldKey = fieldKey;
        this.#fieldName = fieldName;
        this.#pointerRules = pointerRules;
        this.#deprecated = deprecated;
        if (pointerRules.mandatory) {
            this.graph.edges().watchVertex(this);
        }
    }
    accept(visitor) {
        return safeExecute(visitor.visitField, this);
    }
    get box() { return this.#parent.box; }
    get graph() { return this.#parent.graph; }
    get parent() { return this.#parent; }
    get fieldKey() { return this.#fieldKey; }
    get fieldName() { return this.#fieldName; }
    get pointerRules() { return this.#pointerRules; }
    get deprecated() { return this.#deprecated; }
    get pointerHub() { return new PointerHub(this); }
    get address() { return this.#parent.address.append(this.#fieldKey); }
    get debugPath() {
        return `${this.box.name}:${this.box.mapFields(field => field.fieldName, ...this.address.fieldKeys).join("/")}`;
    }
    isBox() { return false; }
    isField() { return true; }
    isAttached() { return this.graph.findBox(this.address.uuid).nonEmpty(); }
    fields() { return Arrays.empty(); }
    record() { return Objects.empty(); }
    getField(_key) { return panic(); }
    optField(_key) { return Option.None; }
    read(_input) { }
    write(_output) { }
    toJSON() { return undefined; }
    fromJSON(_value) { return panic("fromJSON should never be called on a field"); }
    disconnect() {
        if (this.pointerHub.isEmpty()) {
            return;
        }
        const incoming = this.pointerHub.incoming();
        incoming.forEach(pointer => {
            pointer.defer();
            if (pointer.mandatory || (this.pointerRules.mandatory && incoming.length === 1)) {
                pointer.box.delete();
            }
        });
    }
    toString() { return `{${this.box.constructor.name}:${this.constructor.name} (${this.fieldName}) ${this.address.toString()}`; }
}
__decorate([
    Lazy,
    __metadata("design:type", PointerHub),
    __metadata("design:paramtypes", [])
], Field.prototype, "pointerHub", null);
__decorate([
    Lazy,
    __metadata("design:type", Address),
    __metadata("design:paramtypes", [])
], Field.prototype, "address", null);
__decorate([
    Lazy,
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], Field.prototype, "debugPath", null);
