import {UUID} from "@naomiarotest/lib-std"
import {AudioRegionBox, AudioUnitBox, TrackBox, ValueEventCollectionBox} from "@naomiarotest/studio-boxes"
import {TrackType} from "@naomiarotest/studio-adapters"
import {BoxGraph} from "@naomiarotest/lib-box"
import {IndexRef} from "./IndexRef"
import {AudioTrackImpl} from "./impl/AudioTrackImpl"
import {AudioRegionImpl} from "./impl/AudioRegionImpl"
import {AudioPlayback} from "@naomiarotest/studio-enums"
import {TimeBase} from "@naomiarotest/lib-dsp"
import {AudioFileBoxfactory} from "./AudioFileBoxfactory"

export namespace AudioTrackWriter {
    export const write = (boxGraph: BoxGraph,
                          audioUnitBox: AudioUnitBox,
                          audioTracks: ReadonlyArray<AudioTrackImpl>,
                          indexRef: IndexRef): void => {
        audioTracks.forEach(({enabled, regions}: AudioTrackImpl) => {
            const trackBox = TrackBox.create(boxGraph, UUID.generate(), box => {
                box.type.setValue(TrackType.Audio)
                box.enabled.setValue(enabled)
                box.index.setValue(indexRef.index++)
                box.target.refer(audioUnitBox)
                box.tracks.refer(audioUnitBox.tracks)
            })
            regions.forEach((region: AudioRegionImpl) => {
                const {
                    position, duration, loopDuration, loopOffset, hue, label, mute, sample
                } = region
                const fileBox = AudioFileBoxfactory.create(boxGraph, sample)
                const collectionBox = ValueEventCollectionBox.create(boxGraph, UUID.generate())
                AudioRegionBox.create(boxGraph, UUID.generate(), box => {
                    box.position.setValue(position)
                    box.duration.setValue(duration)
                    box.loopDuration.setValue(loopDuration)
                    box.loopOffset.setValue(loopOffset)
                    box.hue.setValue(hue)
                    box.label.setValue(label)
                    box.mute.setValue(mute)
                    box.regions.refer(trackBox.regions)
                    box.file.refer(fileBox)
                    box.events.refer(collectionBox.owners)
                    box.playback.setValue(region.playback)
                    box.timeBase.setValue(region.playback === AudioPlayback.NoSync
                        ? TimeBase.Seconds
                        : TimeBase.Musical)
                })
            })
        })
    }
}