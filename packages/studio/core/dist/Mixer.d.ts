import { Terminable } from "@opendaw/lib-std";
import { Pointers } from "@opendaw/studio-enums";
import { AudioUnitBoxAdapter, IndexedBoxAdapterCollection } from "@opendaw/studio-adapters";
export interface ChannelStripView {
    silent(value: boolean): void;
}
export declare class Mixer implements Terminable {
    #private;
    constructor(audioUnits: IndexedBoxAdapterCollection<AudioUnitBoxAdapter, Pointers.AudioUnits>);
    registerChannelStrip({ uuid }: AudioUnitBoxAdapter, view: ChannelStripView): Terminable;
    terminate(): void;
}
//# sourceMappingURL=Mixer.d.ts.map