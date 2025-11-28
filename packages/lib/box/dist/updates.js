import { ValueSerialization } from "./primitive";
import { Address } from "./address";
import { Arrays, ByteArrayInput, Option, UUID } from "@opendaw/lib-std";
export var Updates;
(function (Updates) {
    Updates.decode = (input) => {
        const numBlocks = input.readInt();
        return Arrays.create(() => {
            const type = input.readString();
            switch (type) {
                case "new": {
                    const uuid = UUID.fromDataInput(input);
                    const name = input.readString();
                    const settings = new Int8Array(input.readInt());
                    input.readBytes(settings);
                    return new NewUpdate(uuid, name, settings.buffer);
                }
                case "pointer": {
                    const address = Address.read(input);
                    const oldAddress = input.readBoolean() ? Option.wrap(Address.read(input)) : Option.None;
                    const newAddress = input.readBoolean() ? Option.wrap(Address.read(input)) : Option.None;
                    return new PointerUpdate(address, oldAddress, newAddress);
                }
                case "primitive": {
                    const address = Address.read(input);
                    const type = input.readString();
                    const serializer = ValueSerialization[type];
                    const oldValue = serializer.decode(input);
                    const newValue = serializer.decode(input);
                    return new PrimitiveUpdate(address, serializer, oldValue, newValue);
                }
                case "delete": {
                    const uuid = UUID.fromDataInput(input);
                    const name = input.readString();
                    const settings = new Int8Array(input.readInt());
                    input.readBytes(settings);
                    return new DeleteUpdate(uuid, name, settings.buffer);
                }
            }
        }, numBlocks);
    };
})(Updates || (Updates = {}));
export class NewUpdate {
    type = "new";
    #uuid;
    #name;
    #settings;
    constructor(uuid, name, settings) {
        this.#uuid = uuid;
        this.#name = name;
        this.#settings = settings;
    }
    get uuid() { return this.#uuid; }
    get name() { return this.#name; }
    get settings() { return this.#settings; }
    forward(graph) {
        graph.createBox(this.#name, this.#uuid, box => box.read(new ByteArrayInput(this.#settings)));
    }
    inverse(graph) {
        graph.findBox(this.#uuid).unwrap(() => `Could not find ${this.#name}`).unstage();
    }
    write(output) {
        output.writeString(this.type);
        UUID.toDataOutput(output, this.#uuid);
        output.writeString(this.#name);
        output.writeInt(this.#settings.byteLength);
        output.writeBytes(new Int8Array(this.#settings));
    }
    toString() {
        return `{NewUpdate uuid: ${UUID.toString(this.#uuid)}, attachment: ${this.settings.byteLength}b`;
    }
    toDebugString(_graph) { return this.toString(); }
}
export class PrimitiveUpdate {
    type = "primitive";
    #address;
    #serialization;
    #oldValue;
    #newValue;
    constructor(address, serialization, oldValue, newValue) {
        this.#address = address;
        this.#serialization = serialization;
        this.#oldValue = oldValue;
        this.#newValue = newValue;
    }
    get address() { return this.#address; }
    get oldValue() { return this.#oldValue; }
    get newValue() { return this.#newValue; }
    matches(field) { return field.address.equals(this.address); }
    inverse(graph) { this.field(graph).setValue(this.#oldValue); }
    forward(graph) { this.field(graph).setValue(this.#newValue); }
    field(graph) {
        return graph.findVertex(this.#address)
            .unwrap(() => `Could not find PrimitiveField at ${this.#address}`);
    }
    write(output) {
        output.writeString(this.type);
        this.#address.write(output);
        output.writeString(this.#serialization.type);
        this.#serialization.encode(output, this.#oldValue);
        this.#serialization.encode(output, this.#newValue);
    }
    toString() {
        return `{PrimitiveUpdate oldValue: ${this.#oldValue}, newValue: ${this.#newValue}`;
    }
}
export class PointerUpdate {
    type = "pointer";
    #address;
    #oldAddress;
    #newAddress;
    constructor(address, oldAddress, newAddress) {
        this.#address = address;
        this.#oldAddress = oldAddress;
        this.#newAddress = newAddress;
    }
    get address() { return this.#address; }
    get oldAddress() { return this.#oldAddress; }
    get newAddress() { return this.#newAddress; }
    matches(field) { return field.address.equals(this.address); }
    inverse(graph) { this.field(graph).targetAddress = this.#oldAddress; }
    forward(graph) { this.field(graph).targetAddress = this.#newAddress; }
    field(graph) {
        return graph.findVertex(this.#address)
            .unwrap(() => `Could not find PointerField at ${this.#address}`);
    }
    write(output) {
        output.writeString(this.type);
        this.#address.write(output);
        this.#oldAddress.match({
            none: () => output.writeBoolean(false),
            some: address => {
                output.writeBoolean(true);
                address.write(output);
            }
        });
        this.#newAddress.match({
            none: () => output.writeBoolean(false),
            some: address => {
                output.writeBoolean(true);
                address.write(output);
            }
        });
    }
    toString() {
        return `{PointerUpdate oldValue: ${this.#oldAddress.unwrapOrNull()}, newValue: ${this.#newAddress.unwrapOrNull()}`;
    }
}
export class DeleteUpdate {
    type = "delete";
    #uuid;
    #name;
    #settings;
    constructor(uuid, name, settings) {
        this.#uuid = uuid;
        this.#name = name;
        this.#settings = settings;
    }
    get uuid() { return this.#uuid; }
    get name() { return this.#name; }
    get settings() { return this.#settings; }
    forward(graph) {
        graph.findBox(this.#uuid).unwrap(() => `Could not find ${this.#name}`).unstage();
    }
    inverse(graph) {
        graph.createBox(this.#name, this.#uuid, box => box.read(new ByteArrayInput(this.#settings)));
    }
    write(output) {
        output.writeString(this.type);
        UUID.toDataOutput(output, this.#uuid);
        output.writeString(this.#name);
        output.writeInt(this.#settings.byteLength);
        output.writeBytes(new Int8Array(this.#settings));
    }
    toString() {
        return `{DeleteUpdate uuid: ${UUID.toString(this.#uuid)}, attachment: ${this.settings.byteLength}b`;
    }
}
