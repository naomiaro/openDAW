import {UUID} from "@naomiarotest/lib-std"
import {PPQN} from "@naomiarotest/lib-dsp"
import {AudioRegionBox, ValueEventCollectionBox} from "@naomiarotest/studio-boxes"
import {ColorCodes} from "@naomiarotest/studio-adapters"
import {RegionCaptureTarget} from "@/ui/timeline/tracks/audio-unit/regions/RegionCapturing.ts"
import {ElementCapturing} from "@/ui/canvas/capturing.ts"
import {RegionClipResolver} from "@naomiarotest/studio-core"
import {CreateParameters, TimelineDragAndDrop} from "@/ui/timeline/tracks/audio-unit/TimelineDragAndDrop"
import {Snapping} from "@/ui/timeline/Snapping"
import {StudioService} from "@/service/StudioService"

export class RegionSampleDragAndDrop extends TimelineDragAndDrop<RegionCaptureTarget> {
    readonly #snapping: Snapping

    constructor(service: StudioService, capturing: ElementCapturing<RegionCaptureTarget>, snapping: Snapping) {
        super(service, capturing)

        this.#snapping = snapping
    }

    handleSample({
                     event, trackBoxAdapter, audioFileBox, sample: {name, duration: durationInSeconds, bpm}
                 }: CreateParameters): void {
        const pointerX = event.clientX - this.capturing.element.getBoundingClientRect().left
        const pointerPulse = Math.max(this.#snapping.xToUnitFloor(pointerX), 0)
        const duration = Math.round(PPQN.secondsToPulses(durationInSeconds, bpm))
        const solver = RegionClipResolver.fromRange(trackBoxAdapter, pointerPulse, pointerPulse + duration)
        const collectionBox = ValueEventCollectionBox.create(this.project.boxGraph, UUID.generate())
        AudioRegionBox.create(this.project.boxGraph, UUID.generate(), box => {
            box.position.setValue(pointerPulse)
            box.duration.setValue(duration)
            box.loopDuration.setValue(duration)
            box.regions.refer(trackBoxAdapter.box.regions)
            box.hue.setValue(ColorCodes.forTrackType(trackBoxAdapter.type))
            box.label.setValue(name)
            box.file.refer(audioFileBox)
            box.events.refer(collectionBox.owners)
        })
        solver()
    }
}