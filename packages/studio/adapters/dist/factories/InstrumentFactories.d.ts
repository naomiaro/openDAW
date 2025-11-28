import { AudioFileBox, MIDIOutputDeviceBox, NanoDeviceBox, PlayfieldDeviceBox, SoundfontDeviceBox, TapeDeviceBox, VaporisateurDeviceBox } from "@opendaw/studio-boxes";
import { byte, UUID } from "@opendaw/lib-std";
import { InstrumentFactory } from "./InstrumentFactory";
export declare namespace InstrumentFactories {
    const Tape: InstrumentFactory<void, TapeDeviceBox>;
    const Nano: InstrumentFactory<AudioFileBox, NanoDeviceBox>;
    type PlayfieldAttachment = ReadonlyArray<{
        note: byte;
        uuid: UUID.Bytes;
        name: string;
        durationInSeconds: number;
        exclude: boolean;
    }>;
    const Playfield: InstrumentFactory<PlayfieldAttachment, PlayfieldDeviceBox>;
    const Vaporisateur: InstrumentFactory<void, VaporisateurDeviceBox>;
    const MIDIOutput: InstrumentFactory<void, MIDIOutputDeviceBox>;
    const Soundfont: InstrumentFactory<{
        uuid: UUID.String;
        name: string;
    }, SoundfontDeviceBox>;
    const Named: {
        Vaporisateur: InstrumentFactory<void, VaporisateurDeviceBox>;
        Playfield: InstrumentFactory<PlayfieldAttachment, PlayfieldDeviceBox>;
        Nano: InstrumentFactory<AudioFileBox, NanoDeviceBox>;
        Tape: InstrumentFactory<void, TapeDeviceBox>;
        Soundfont: InstrumentFactory<{
            uuid: UUID.String;
            name: string;
        }, SoundfontDeviceBox>;
        MIDIOutput: InstrumentFactory<void, MIDIOutputDeviceBox>;
    };
    type Keys = keyof typeof Named;
}
//# sourceMappingURL=InstrumentFactories.d.ts.map