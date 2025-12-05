import {AudioUnitBox, TrackBox} from "@naomiarotest/studio-boxes"
import {asInstanceOf, int, UUID} from "@naomiarotest/lib-std"
import {TrackType} from "@naomiarotest/studio-adapters"
import {BoxEditing} from "@naomiarotest/lib-box"

export namespace RecordTrack {
    export const findOrCreate = (editing: BoxEditing, audioUnitBox: AudioUnitBox, type: TrackType): TrackBox => {
        let index: int = 0 | 0
        for (const trackBox of audioUnitBox.tracks.pointerHub.incoming()
            .map(({box}) => asInstanceOf(box, TrackBox))) {
            const hasNoRegions = trackBox.regions.pointerHub.isEmpty()
            const acceptsNotes = trackBox.type.getValue() === type
            if (hasNoRegions && acceptsNotes) {return trackBox}
            index = Math.max(index, trackBox.index.getValue())
        }
        return editing.modify(() => TrackBox.create(audioUnitBox.graph, UUID.generate(), box => {
            box.type.setValue(type)
            box.index.setValue(index + 1)
            box.tracks.refer(audioUnitBox.tracks)
            box.target.refer(audioUnitBox)
        })).unwrap("Could not create TrackBox")
    }
}