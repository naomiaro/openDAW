import { Arrays, assert, ByteArrayInput, isDefined, Option, panic, Terminable } from "@opendaw/lib-std";
import { Address } from "@opendaw/lib-box";
import { AnimationFrame } from "@opendaw/lib-dom";
import { Communicator } from "@opendaw/lib-runtime";
import { PackageType } from "./PackageType";
import { Subscribers } from "./Subscribers";
import { Lock } from "./Lock";
import { Flags } from "./Flags";
class FloatPackage {
    subscribers = new Subscribers();
    dispatch(address, input) {
        const value = input.readFloat();
        this.subscribers.getOrNull(address)?.forEach(procedure => procedure(value));
    }
    subscribe(address, procedure) {
        return this.subscribers.subscribe(address, procedure);
    }
    terminate() { this.subscribers.terminate(); }
}
class IntegerPackage {
    subscribers = new Subscribers();
    dispatch(address, input) {
        const value = input.readInt();
        this.subscribers.getOrNull(address)?.forEach(procedure => procedure(value));
    }
    subscribe(address, procedure) {
        return this.subscribers.subscribe(address, procedure);
    }
    terminate() { this.subscribers.terminate(); }
}
class ArrayPackage {
    subscribers = new Subscribers();
    #arrays = Address.newSet(entry => entry.address);
    dispatch(address, input) {
        const length = input.readInt();
        const entry = this.#arrays.getOrNull(address);
        let array;
        if (isDefined(entry)) {
            array = entry.array;
        }
        else {
            array = this.create(length);
            this.#arrays.add({ address, array });
        }
        this.read(input, array, length);
        this.subscribers.getOrNull(address)?.forEach(procedure => procedure(array));
    }
    subscribe(address, procedure) {
        const subscription = this.subscribers.subscribe(address, procedure);
        return {
            terminate: () => {
                subscription.terminate();
                if (this.subscribers.isEmpty(address) && this.#arrays.hasKey(address)) {
                    this.#arrays.removeByKey(address);
                }
            }
        };
    }
    terminate() { this.subscribers.terminate(); }
}
class FloatArrayPackage extends ArrayPackage {
    create(length) { return new Float32Array(length); }
    read(input, array, length) {
        for (let i = 0; i < length; i++) {
            array[i] = input.readFloat();
        }
    }
}
class IntegerArrayPackage extends ArrayPackage {
    create(length) { return new Int32Array(length); }
    read(input, array, length) {
        for (let i = 0; i < length; i++) {
            array[i] = input.readInt();
        }
    }
}
class ByteArrayPackage extends ArrayPackage {
    create(length) { return new Int8Array(length); }
    read(input, array, _length) {
        input.readBytes(array);
    }
}
export class LiveStreamReceiver {
    static ID = 0 | 0;
    #float = new FloatPackage();
    #integer = new IntegerPackage();
    #floats = new FloatArrayPackage();
    #integers = new IntegerArrayPackage();
    #bytes = new ByteArrayPackage();
    #packages = [];
    #procedures = [];
    #id;
    #optLock = Option.None;
    #memory = Option.None;
    #structureVersion = -1;
    #connected = false;
    constructor() {
        this.#id = LiveStreamReceiver.ID++;
        this.#packages[PackageType.Float] = this.#float;
        this.#packages[PackageType.FloatArray] = this.#floats;
        this.#packages[PackageType.Integer] = this.#integer;
        this.#packages[PackageType.IntegerArray] = this.#integers;
        this.#packages[PackageType.ByteArray] = this.#bytes;
    }
    connect(messenger) {
        assert(!this.#connected, "Already connected");
        this.#connected = true;
        return Terminable.many({ terminate: () => { this.#disconnect(); } }, Communicator.executor(messenger, {
            sendShareLock: (lock) => this.#optLock = Option.wrap(new Int8Array(lock)),
            sendUpdateData: (data) => this.#memory = Option.wrap(new ByteArrayInput(data)),
            sendUpdateStructure: (structure) => this.#updateStructure(new ByteArrayInput(structure))
        }), AnimationFrame.add(() => this.#dispatch()));
    }
    #disconnect() {
        this.#memory = Option.None;
        this.#optLock = Option.None;
        this.#structureVersion = -1;
        this.#connected = false;
        Arrays.clear(this.#procedures);
        this.#float.terminate();
        this.#floats.terminate();
        this.#integer.terminate();
        this.#integers.terminate();
        this.#bytes.terminate();
    }
    subscribeFloat(address, procedure) {
        return this.#float.subscribe(address, procedure);
    }
    subscribeInteger(address, procedure) {
        return this.#integer.subscribe(address, procedure);
    }
    subscribeFloats(address, procedure) {
        return this.#floats.subscribe(address, procedure);
    }
    subscribeIntegers(address, procedure) {
        return this.#integers.subscribe(address, procedure);
    }
    subscribeByteArray(address, procedure) {
        return this.#bytes.subscribe(address, procedure);
    }
    terminate() { this.#disconnect(); }
    #dispatch() {
        if (this.#optLock.isEmpty() || this.#memory.isEmpty()) {
            return;
        }
        const lock = this.#optLock.unwrap();
        if (Atomics.load(lock, 0) === Lock.READ) {
            const byteArrayInput = this.#memory.unwrap();
            this.#dispatchData(byteArrayInput);
            byteArrayInput.position = 0;
            Atomics.store(lock, 0, Lock.WRITE);
        }
    }
    #updateStructure(input) {
        Arrays.clear(this.#procedures);
        this.#parseStructure(input);
    }
    #dispatchData(input) {
        let version = input.readInt();
        if (version !== this.#structureVersion) {
            // we simply skip and await the latest version soon enough
            return false;
        }
        if (input.readInt() !== Flags.START) {
            throw new Error("stream is broken (no start flag)");
        }
        for (const procedure of this.#procedures) {
            procedure(input);
        }
        if (input.readInt() !== Flags.END) {
            throw new Error("stream is broken (no end flag)");
        }
        return true;
    }
    #parseStructure(input) {
        if (input.readInt() !== Flags.ID) {
            throw new Error("no valid id");
        }
        const version = input.readInt();
        if (version <= this.#structureVersion) {
            return panic("Invalid version. new: " + version + `, was: ${this.#structureVersion}, id: ${this.#id}`);
        }
        this.#structureVersion = version;
        const n = input.readInt();
        for (let i = 0; i < n; i++) {
            const address = Address.read(input);
            const chunk = this.#packages[input.readByte()];
            this.#procedures.push(input => chunk.dispatch(address, input));
        }
    }
}
