import { Arrays, assert, ByteArrayOutput, nextPowOf2, Option, safeExecute } from "@opendaw/lib-std";
import { Communicator } from "@opendaw/lib-runtime";
import { Lock } from "./Lock";
import { PackageType } from "./PackageType";
import { Flags } from "./Flags";
export class LiveStreamBroadcaster {
    static create(messenger, name) {
        return new LiveStreamBroadcaster(messenger.channel(name));
    }
    #packages = [];
    #lock = new SharedArrayBuffer(1);
    #lockArray = new Int8Array(this.#lock);
    #sender;
    #output = ByteArrayOutput.create(0);
    #sabOption = Option.None;
    #availableUpdate = Option.None;
    #version = -1;
    #capacity = -1;
    #invalid = false;
    #lockShared = false;
    constructor(messenger) {
        this.#sender = Communicator.sender(messenger, ({ dispatchAndForget }) => new class {
            sendShareLock(lock) { dispatchAndForget(this.sendShareLock, lock); }
            sendUpdateData(buffer) { dispatchAndForget(this.sendUpdateData, buffer); }
            sendUpdateStructure(buffer) { dispatchAndForget(this.sendUpdateStructure, buffer); }
        });
    }
    flush() {
        const update = this.#updateAvailable();
        if (update.nonEmpty()) {
            if (!this.#lockShared) {
                this.#sender.sendShareLock(this.#lock);
                this.#lockShared = true;
            }
            this.#sender.sendUpdateStructure(update.unwrap());
            let capacity = this.#computeCapacity();
            if (this.#output.remaining < capacity) {
                const size = nextPowOf2(capacity);
                const data = new SharedArrayBuffer(size);
                this.#output = ByteArrayOutput.use(data);
                this.#sabOption = Option.wrap(data);
                this.#sender.sendUpdateData(data);
            }
        }
        if (this.#sabOption.isEmpty()) {
            return;
        }
        // If main-thread is not interested, no data will ever be sent again, since it will not set the lock to CAN_WRITE.
        // No lock is necessary since the other side skips reading until we set the lock to CAN_READ.
        if (Atomics.load(this.#lockArray, 0) === Lock.WRITE) {
            this.#flushData(this.#output);
            this.#output.position = 0;
            Atomics.store(this.#lockArray, 0, Lock.READ);
        }
    }
    broadcastFloat(address, provider) {
        return this.#storeChunk(new class {
            type = PackageType.Float;
            address = address;
            capacity = 8;
            put(output) { output.writeFloat(provider()); }
        });
    }
    broadcastInteger(address, provider) {
        return this.#storeChunk(new class {
            type = PackageType.Integer;
            address = address;
            capacity = 8;
            put(output) { output.writeInt(provider()); }
        });
    }
    broadcastFloats(address, values, before, after) {
        return this.#storeChunk(new class {
            type = PackageType.FloatArray;
            address = address;
            capacity = 4 + (values.byteLength << 2);
            put(output) {
                safeExecute(before);
                output.writeInt(values.length);
                for (const value of values) {
                    output.writeFloat(value);
                }
                safeExecute(after);
            }
        });
    }
    broadcastIntegers(address, values, update) {
        return this.#storeChunk(new class {
            type = PackageType.IntegerArray;
            address = address;
            capacity = 4 + (values.byteLength << 2);
            put(output) {
                update();
                output.writeInt(values.length);
                values.forEach(value => output.writeInt(value));
            }
        });
    }
    broadcastByteArray(address, values, update) {
        return this.#storeChunk(new class {
            type = PackageType.ByteArray;
            address = address;
            capacity = 4 + values.byteLength;
            put(output) {
                update();
                output.writeInt(values.byteLength);
                output.writeBytes(values);
            }
        });
    }
    #updateAvailable() {
        if (this.#invalid) {
            try {
                this.#availableUpdate = Option.wrap(this.#compileStructure());
            }
            catch (reason) {
                throw reason;
            }
            this.#invalid = false;
        }
        if (this.#availableUpdate.nonEmpty()) {
            const option = this.#availableUpdate;
            this.#availableUpdate = Option.None;
            return option;
        }
        return Option.None;
    }
    #computeCapacity() {
        if (-1 === this.#capacity) {
            this.#capacity = this.#sumRequiredCapacity() + 12;
        }
        return this.#capacity;
    }
    terminate() {
        Arrays.clear(this.#packages);
        this.#availableUpdate = Option.None;
        this.#invalid = false;
        this.#capacity = 0;
    }
    #flushData(output) {
        assert(!this.#invalid && this.#availableUpdate.isEmpty(), "Cannot flush while update is available");
        let requiredCapacity = this.#computeCapacity();
        assert(output.remaining >= requiredCapacity, "Insufficient data");
        output.writeInt(this.#version);
        output.writeInt(Flags.START);
        for (const pack of this.#packages) {
            pack.put(output);
        }
        output.writeInt(Flags.END);
    }
    #sumRequiredCapacity() {
        return this.#packages.reduce((sum, pack) => sum + pack.capacity, 0);
    }
    #storeChunk(pack) {
        this.#packages.push(pack);
        this.#invalidate();
        return {
            terminate: () => {
                Arrays.removeOpt(this.#packages, pack);
                this.#invalidate();
            }
        };
    }
    #invalidate() {
        this.#capacity = -1;
        this.#invalid = true;
    }
    #compileStructure() {
        const output = ByteArrayOutput.create();
        output.writeInt(Flags.ID);
        output.writeInt(++this.#version);
        output.writeInt(this.#packages.length);
        for (const { address, type } of this.#packages) {
            address.write(output);
            output.writeByte(type);
        }
        return output.toArrayBuffer();
    }
}
