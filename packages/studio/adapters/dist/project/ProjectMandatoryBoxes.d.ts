import { AudioBusBox, AudioUnitBox, RootBox, TimelineBox, UserInterfaceBox } from "@opendaw/studio-boxes";
export type ProjectMandatoryBoxes = {
    rootBox: RootBox;
    timelineBox: TimelineBox;
    primaryAudioBus: AudioBusBox;
    primaryAudioOutputUnit: AudioUnitBox;
    userInterfaceBoxes: ReadonlyArray<UserInterfaceBox>;
};
//# sourceMappingURL=ProjectMandatoryBoxes.d.ts.map