import { assert, ByteArrayOutput, Hash } from "@opendaw/lib-std";
export var CommitType;
(function (CommitType) {
    CommitType[CommitType["Init"] = 0] = "Init";
    CommitType[CommitType["Open"] = 1] = "Open";
    CommitType[CommitType["Updates"] = 2] = "Updates";
    CommitType[CommitType["NewVersion"] = 3] = "NewVersion";
})(CommitType || (CommitType = {}));
export class Commit {
    type;
    prevHash;
    thisHash;
    payload;
    date;
    static VERSION = 1; // For devs: walk your way to dynamic versioning from here
    static #NO_PAYLOAD = new Uint8Array(1).buffer;
    static #EMPTY_HASH = new Uint8Array(32).buffer;
    static createFirst(project) {
        const payload = project.toArrayBuffer();
        return this.#create(CommitType.Init, Commit.#EMPTY_HASH, payload);
    }
    static createOpen(prevHash) {
        return this.#create(CommitType.Open, prevHash, Commit.#NO_PAYLOAD);
    }
    static async createUpdate(prevHash, updates) {
        const output = ByteArrayOutput.create();
        output.writeInt(updates.length);
        updates.forEach(update => update.write(output));
        return this.#create(CommitType.Updates, prevHash, output.toArrayBuffer());
    }
    static async #create(type, prevHash, payload) {
        const date = Date.now();
        const output = ByteArrayOutput.create();
        const data = output.toArrayBuffer();
        const thisHash = await Hash.fromBuffers(data, prevHash, new Float64Array([date]).buffer);
        return new Commit(type, prevHash, thisHash, payload, date);
    }
    static deserialize(input) {
        const type = input.readInt();
        assert(type === CommitType.Init
            || type === CommitType.Open
            || type === CommitType.Updates
            || type === CommitType.NewVersion, `Unknown commit type "${type}"`);
        const version = input.readInt();
        assert(version === Commit.VERSION, "version mismatch");
        const prevHash = new Int8Array(32);
        input.readBytes(prevHash);
        const thisHash = new Int8Array(32);
        input.readBytes(thisHash);
        const data = new Int8Array(input.readInt());
        input.readBytes(data);
        const date = input.readDouble();
        return new Commit(type, prevHash.buffer, thisHash.buffer, data.buffer, date);
    }
    constructor(type, prevHash, thisHash, payload, date) {
        this.type = type;
        this.prevHash = prevHash;
        this.thisHash = thisHash;
        this.payload = payload;
        this.date = date;
    }
    serialize() {
        const output = ByteArrayOutput.create();
        output.writeInt(this.type);
        output.writeInt(Commit.VERSION);
        output.writeBytes(new Int8Array(this.prevHash));
        output.writeBytes(new Int8Array(this.thisHash));
        output.writeInt(this.payload.byteLength);
        output.writeBytes(new Int8Array(this.payload));
        output.writeDouble(this.date);
        return output.toArrayBuffer();
    }
    toString() {
        return `{prevHash: ${Hash.toString(this.prevHash)}, thisHash: ${Hash.toString(this.thisHash)}, payload: ${this.payload.byteLength}bytes}`;
    }
}
