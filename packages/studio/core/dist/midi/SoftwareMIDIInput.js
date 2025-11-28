import { assert, clamp, DefaultObservableValue, isNull, safeExecute } from "@opendaw/lib-std";
import { MidiData } from "@opendaw/lib-midi";
export class SoftwareMIDIInput {
    manufacturer = "openDAW";
    connection = "open";
    id = "software-midi-input";
    name = "Software Keyboard";
    state = "connected";
    type = "input";
    version = "1.0.0";
    #dispatcher;
    #countListeners;
    #activeNotes;
    onstatechange = null; // has no effect. this device is always connected.
    #onmidimessage = null;
    #channel = 0; // 0...15
    constructor() {
        this.#dispatcher = new EventTarget();
        this.#countListeners = new DefaultObservableValue(0);
        this.#activeNotes = new Uint8Array(128);
    }
    get onmidimessage() { return this.#onmidimessage; }
    set onmidimessage(value) {
        this.#onmidimessage = value;
        if (isNull(value)) {
            this.#changeListenerCount(-1);
        }
        else {
            this.#changeListenerCount(1);
        }
    }
    get countListeners() { return this.#countListeners; }
    sendNoteOn(note, velocity = 1.0) {
        assert(note >= 0 && note <= 127, `Note must be between 0 and 127, but was ${note}`);
        this.#activeNotes[note]++;
        const velocityByte = Math.round(clamp(velocity, 0.0, 1.0) * 127.0);
        this.#sendMIDIMessageData(MidiData.noteOn(this.#channel, note, velocityByte));
    }
    sendNoteOff(note) {
        assert(note >= 0 && note <= 127, `Note must be between 0 and 127, but was ${note}`);
        this.#activeNotes[note]--;
        this.#sendMIDIMessageData(MidiData.noteOff(this.#channel, note));
        assert(this.#activeNotes[note] >= 0, "Negative count of active notes");
    }
    releaseAllNotes() {
        this.#activeNotes.forEach((count, note) => {
            for (let i = 0; i < count; i++) {
                this.#sendMIDIMessageData(MidiData.noteOff(this.#channel, note));
            }
        });
        this.#activeNotes.fill(0);
    }
    hasActiveNote(note) { return this.#activeNotes[note] > 0; }
    hasActiveNotes() { return this.#activeNotes.some(count => count > 0); }
    get channel() { return this.#channel; }
    set channel(value) {
        if (this.#channel === value) {
            return;
        }
        this.releaseAllNotes();
        this.#channel = value;
    }
    open() { return Promise.resolve(this); }
    close() { return Promise.resolve(this); }
    addEventListener(type, listener, options) {
        this.#dispatcher.addEventListener(type, listener, options);
        this.#changeListenerCount(1);
    }
    dispatchEvent(event) {
        safeExecute(this.#onmidimessage, event);
        return this.#dispatcher.dispatchEvent(event);
    }
    removeEventListener(type, listener, options) {
        this.#dispatcher.removeEventListener(type, listener, options);
        this.#changeListenerCount(-1);
    }
    #sendMIDIMessageData(data) {
        const eventInit = { data };
        this.dispatchEvent(new MessageEvent("midimessage", eventInit));
    }
    #changeListenerCount(delta) {
        this.#countListeners.setValue(this.#countListeners.getValue() + delta);
    }
}
