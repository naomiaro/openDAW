import { assert, isNull, Option, panic, safeExecute, tryCatch } from "@opendaw/lib-std";
import { Address } from "./address";
import { PointerHub } from "./pointer-hub";
import { Field } from "./field";
import { Propagation } from "./dispatchers";
const _Unreferenceable = Symbol("Unreferenceable");
export class PointerField extends Field {
    static create(construct, pointerType, mandatory) {
        return new PointerField(construct, pointerType, mandatory);
    }
    static encodeWith(encoder, exec) {
        assert(this.#encoder.isEmpty(), "SerializationEncoder already in use");
        this.#encoder = Option.wrap(encoder);
        const result = tryCatch(exec);
        this.#encoder = Option.None;
        if (result.status === "failure") {
            throw result.error;
        }
        return result.value;
    }
    static decodeWith(decoder, exec) {
        assert(this.#decoder.isEmpty(), "SerializationDecoder already in use");
        this.#decoder = Option.wrap(decoder);
        const result = tryCatch(exec);
        this.#decoder = Option.None;
        if (result.status === "failure") {
            throw result.error;
        }
        return result.value;
    }
    static #encoder = Option.None;
    static #decoder = Option.None;
    #pointerType;
    #mandatory;
    #targetVertex = Option.None;
    #targetAddress = Option.None;
    constructor(field, pointerType, mandatory) {
        super(field);
        this.#pointerType = pointerType;
        this.#mandatory = mandatory;
        if (mandatory) {
            this.graph.edges().watchVertex(this);
        }
    }
    get pointerHub() { return panic(`${this} cannot be pointed to`); }
    get pointerType() { return this.#pointerType; }
    get mandatory() { return this.#mandatory; }
    accept(visitor) {
        return safeExecute(visitor.visitPointerField, this);
    }
    subscribe(observer) {
        return this.graph.subscribeVertexUpdates(Propagation.This, this.address, () => this.graph.subscribeEndTransaction(() => observer(this)));
    }
    catchupAndSubscribe(observer) {
        observer(this);
        return this.subscribe(observer);
    }
    refer(vertex) {
        this.targetVertex = Option.wrap(vertex);
    }
    defer() { this.targetVertex = Option.None; }
    get targetVertex() {
        return this.graph.inTransaction()
            ? this.#targetAddress.flatMap((address) => this.graph.findVertex(address))
            : this.#targetVertex;
    }
    set targetVertex(option) {
        if (option.nonEmpty()) {
            const issue = PointerHub.validate(this, option.unwrap());
            if (issue.nonEmpty()) {
                panic(issue.unwrap());
            }
        }
        this.targetAddress = option.map(vertex => vertex.address);
    }
    get targetAddress() { return this.#targetAddress; }
    set targetAddress(newValue) {
        const oldValue = this.#targetAddress;
        if ((oldValue.isEmpty() && newValue.isEmpty())
            || (newValue.nonEmpty() && oldValue.unwrapOrNull()?.equals(newValue.unwrap())) === true) {
            return;
        }
        this.#targetAddress = newValue;
        this.graph.onPointerAddressUpdated(this, oldValue, newValue);
    }
    isEmpty() { return this.targetAddress.isEmpty(); }
    nonEmpty() { return this.targetAddress.nonEmpty(); }
    resolvedTo(newTarget) { this.#targetVertex = newTarget; }
    read(input) {
        const address = input.readBoolean()
            ? Option.wrap(Address.read(input))
            : Option.None;
        this.targetAddress = PointerField.#decoder.match({
            none: () => address,
            some: decoder => decoder.map(this, address)
        });
    }
    write(output) {
        assert(!this.deprecated, "PointerField.write: deprecated field");
        PointerField.#encoder.match({
            none: () => this.#targetAddress,
            some: encoder => encoder.map(this)
        }).match({
            none: () => output.writeBoolean(false),
            some: address => {
                output.writeBoolean(true);
                address.write(output);
            }
        });
    }
    toJSON() {
        if (this.deprecated) {
            return undefined;
        }
        return PointerField.#encoder
            .match({
            none: () => this.#targetAddress,
            some: encoder => encoder.map(this)
        }).match({
            none: () => null,
            some: address => address.toString()
        });
    }
    fromJSON(value) {
        if (this.deprecated) {
            return;
        }
        if (isNull(value) || typeof value === "string") {
            const address = Option.wrap(isNull(value) ? null : Address.decode(value));
            this.targetAddress = PointerField.#decoder.match({
                none: () => address,
                some: decoder => decoder.map(this, address)
            });
        }
        else {
            return panic(`Pointer: Type mismatch. value (${typeof value}) must be a string.`);
        }
    }
}
