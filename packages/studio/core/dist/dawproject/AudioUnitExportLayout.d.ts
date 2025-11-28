import { AudioUnitBox } from "@opendaw/studio-boxes";
export declare namespace AudioUnitExportLayout {
    interface Track {
        audioUnit: AudioUnitBox;
        children: Array<Track>;
    }
    const layout: (audioUnits: ReadonlyArray<AudioUnitBox>) => Array<Track>;
    const printTrackStructure: (tracks: ReadonlyArray<Track>, indent?: number) => void;
}
//# sourceMappingURL=AudioUnitExportLayout.d.ts.map