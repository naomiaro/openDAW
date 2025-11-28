import { MIDIOutputBox, RootBox } from "@opendaw/studio-boxes";
import { Address } from "@opendaw/lib-box";
import { UUID } from "@opendaw/lib-std";
import { AudioBusBoxAdapter } from "./audio-unit/AudioBusBoxAdapter";
import { Pointers } from "@opendaw/studio-enums";
import { IndexedBoxAdapterCollection } from "./IndexedBoxAdapterCollection";
import { AudioUnitBoxAdapter } from "./audio-unit/AudioUnitBoxAdapter";
import { AnyClipBoxAdapter } from "./UnionAdapterTypes";
import { BoxAdapterCollection } from "./BoxAdapterCollection";
import { BoxAdaptersContext } from "./BoxAdaptersContext";
import { BoxAdapter } from "./BoxAdapter";
import { TimelineBoxAdapter } from "./timeline/TimelineBoxAdapter";
import { GrooveShuffleBoxAdapter } from "./grooves/GrooveShuffleBoxAdapter";
import { PianoModeAdapter } from "./PianoModeAdapter";
export declare class RootBoxAdapter implements BoxAdapter {
    #private;
    constructor(context: BoxAdaptersContext, box: RootBox);
    get uuid(): UUID.Bytes;
    get address(): Address;
    get box(): RootBox;
    get audioBusses(): BoxAdapterCollection<AudioBusBoxAdapter>;
    get audioUnits(): IndexedBoxAdapterCollection<AudioUnitBoxAdapter, Pointers.AudioUnits>;
    get clips(): ReadonlyArray<AnyClipBoxAdapter>;
    get groove(): GrooveShuffleBoxAdapter;
    get timeline(): TimelineBoxAdapter;
    get pianoMode(): PianoModeAdapter;
    get created(): Date;
    get midiOutputDevices(): ReadonlyArray<MIDIOutputBox>;
    terminate(): void;
}
//# sourceMappingURL=RootBoxAdapter.d.ts.map