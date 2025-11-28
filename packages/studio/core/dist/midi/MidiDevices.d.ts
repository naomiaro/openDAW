import { byte, MutableObservableValue, ObservableOption, Observer, Option, Subscription } from "@opendaw/lib-std";
import { SoftwareMIDIInput } from "./SoftwareMIDIInput";
export declare class MidiDevices {
    #private;
    static canRequestMidiAccess(): boolean;
    static readonly softwareMIDIInput: SoftwareMIDIInput;
    static requestPermission(): Promise<undefined>;
    static get(): ObservableOption<MIDIAccess>;
    static subscribeMessageEvents(observer: Observer<MIDIMessageEvent>, channel?: byte): Subscription;
    static inputDevices(): ReadonlyArray<MIDIInput>;
    static findInputDeviceById(id: string): Option<MIDIInput>;
    static externalInputDevices(): Option<ReadonlyArray<MIDIInput>>;
    static externalOutputDevices(): Option<ReadonlyArray<MIDIOutput>>;
    static panic(): void;
    static available(): MutableObservableValue<boolean>;
}
//# sourceMappingURL=MidiDevices.d.ts.map