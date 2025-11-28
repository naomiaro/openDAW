import { byte, int, Nullable, ObservableValue, unitValue } from "@opendaw/lib-std";
type OnMidiMessage = Nullable<(this: MIDIInput, ev: MIDIMessageEvent) => any>;
type OnStateChange = Nullable<(this: MIDIPort, ev: MIDIConnectionEvent) => any>;
export declare class SoftwareMIDIInput implements MIDIInput {
    #private;
    readonly manufacturer: string | null;
    readonly connection: MIDIPortConnectionState;
    readonly id: string;
    readonly name: string | null;
    readonly state: MIDIPortDeviceState;
    readonly type: MIDIPortType;
    readonly version: string | null;
    onstatechange: OnStateChange;
    constructor();
    get onmidimessage(): OnMidiMessage;
    set onmidimessage(value: OnMidiMessage);
    get countListeners(): ObservableValue<int>;
    sendNoteOn(note: byte, velocity?: unitValue): void;
    sendNoteOff(note: byte): void;
    releaseAllNotes(): void;
    hasActiveNote(note: byte): boolean;
    hasActiveNotes(): boolean;
    get channel(): byte;
    set channel(value: byte);
    open(): Promise<MIDIPort>;
    close(): Promise<MIDIPort>;
    addEventListener<K extends keyof MIDIInputEventMap>(type: K, listener: (this: MIDIInput, ev: MIDIInputEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener<K extends keyof MIDIPortEventMap>(type: K, listener: (this: MIDIPort, ev: MIDIPortEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    dispatchEvent(event: MIDIMessageEvent): boolean;
    removeEventListener<K extends keyof MIDIInputEventMap>(type: K, listener: (this: MIDIInput, ev: MIDIInputEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener<K extends keyof MIDIPortEventMap>(type: K, listener: (this: MIDIPort, ev: MIDIPortEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
}
export {};
//# sourceMappingURL=SoftwareMIDIInput.d.ts.map