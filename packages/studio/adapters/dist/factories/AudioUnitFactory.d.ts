import { AudioUnitType } from "@opendaw/studio-enums";
import { int, Option } from "@opendaw/lib-std";
import { BoxGraph } from "@opendaw/lib-box";
import { AudioUnitBox, RootBox } from "@opendaw/studio-boxes";
import { CaptureBox } from "../CaptureBox";
import { ProjectSkeleton } from "../project/ProjectSkeleton";
import { TrackType } from "../timeline/TrackType";
export declare namespace AudioUnitFactory {
    const create: ({ boxGraph, mandatoryBoxes: { rootBox, primaryAudioBus } }: ProjectSkeleton, type: AudioUnitType, capture: Option<CaptureBox>, index?: int) => AudioUnitBox;
    const orderAndGetIndex: (rootBox: RootBox, type: AudioUnitType) => int;
    const trackTypeToCapture: (boxGraph: BoxGraph, trackType: TrackType) => Option<CaptureBox>;
}
//# sourceMappingURL=AudioUnitFactory.d.ts.map