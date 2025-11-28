export class MIDIReceiver {
    static create(context, callback) {
        const MIDI_RING_SIZE = 2048;
        const sab = new SharedArrayBuffer(MIDI_RING_SIZE * 2 * 4 + 8);
        const channel = new MessageChannel();
        const hasOutputLatency = context instanceof AudioContext;
        return new MIDIReceiver(sab, channel, (deviceId, data, relativeTimeInMs) => {
            let delay = 20.0; // default 20ms
            if (hasOutputLatency) {
                delay = context.outputLatency / 1000.0;
            }
            callback(deviceId, data, relativeTimeInMs + delay);
        });
    }
    #sab;
    #channel;
    #indices;
    #ring;
    #messageMask;
    #onMessage;
    #deviceIds = new Map();
    constructor(sab, channel, onMessage) {
        this.#sab = sab;
        this.#channel = channel;
        this.#indices = new Uint32Array(sab, 0, 2);
        this.#ring = new Uint32Array(sab, 8);
        this.#messageMask = (this.#ring.length >> 1) - 1;
        this.#onMessage = onMessage;
        this.#channel.port1.onmessage = (event) => {
            if (event.data?.registerDevice) {
                this.#deviceIds.set(event.data.id, event.data.registerDevice);
            }
            this.#read();
        };
    }
    get sab() { return this.#sab; }
    get port() { return this.#channel.port2; }
    terminate() { this.#channel.port1.close(); }
    #read() {
        let readIdx = Atomics.load(this.#indices, 1);
        const writeIdx = Atomics.load(this.#indices, 0);
        while (readIdx !== writeIdx) {
            const offset = readIdx << 1;
            const packed1 = this.#ring[offset];
            const packed2 = this.#ring[offset + 1];
            const length = packed1 >>> 30;
            const deviceIdNum = (packed1 >>> 24) & 0x3F;
            const status = (packed1 >>> 16) & 0xFF;
            const data1 = (packed1 >>> 8) & 0xFF;
            const data2 = packed1 & 0xFF;
            const deviceId = this.#deviceIds.get(deviceIdNum) ?? "";
            const data = new Uint8Array(length);
            data[0] = status;
            if (length > 1) {
                data[1] = data1;
            }
            if (length > 2) {
                data[2] = data2;
            }
            this.#onMessage(deviceId, data, packed2);
            readIdx = (readIdx + 1) & this.#messageMask;
        }
        Atomics.store(this.#indices, 1, readIdx);
    }
}
