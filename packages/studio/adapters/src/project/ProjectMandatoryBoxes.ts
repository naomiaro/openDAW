import {AudioBusBox, AudioUnitBox, RootBox, TimelineBox, UserInterfaceBox} from "@naomiarotest/studio-boxes"

export type ProjectMandatoryBoxes = {
    rootBox: RootBox
    timelineBox: TimelineBox
    primaryAudioBus: AudioBusBox
    primaryAudioOutputUnit: AudioUnitBox
    userInterfaceBoxes: ReadonlyArray<UserInterfaceBox>
}