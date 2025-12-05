import {TimelineCoordinates, TimelineSelectableLocator} from "@/ui/timeline/TimelineSelectableLocator.ts"
import {ValueEventBoxAdapter} from "@naomiarotest/studio-adapters"
import {Iterables, ValueAxis} from "@naomiarotest/lib-std"
import {ValueEvent} from "@naomiarotest/lib-dsp"
import {ElementCapturing} from "@/ui/canvas/capturing.ts"
import {ValueCaptureTarget} from "@/ui/timeline/editors/value/ValueEventCapturing.ts"
import {ValueEventOwnerReader} from "@/ui/timeline/editors/EventOwnerReader.ts"
import {TimelineRange} from "@naomiarotest/studio-core"

export const createValueSelectionLocator = (reader: ValueEventOwnerReader,
                                            range: TimelineRange,
                                            valueAxis: ValueAxis,
                                            capturing: ElementCapturing<ValueCaptureTarget>)
    : TimelineSelectableLocator<ValueEventBoxAdapter> => ({
    selectable: (): Iterable<ValueEventBoxAdapter> => reader.hasContent
        ? reader.content.events.asArray()
        : Iterables.empty(),
    selectableAt: (coordinates: TimelineCoordinates): Iterable<ValueEventBoxAdapter> => {
        const x = range.unitToX(coordinates.u)
        const y = valueAxis.valueToAxis(coordinates.v)
        const capture = capturing.captureLocalPoint(x, y)
        return capture === null || capture.type === "loop-duration" ? Iterables.empty() : [capture.event]
    },
    selectablesBetween: (begin: TimelineCoordinates, end: TimelineCoordinates): Iterable<ValueEventBoxAdapter> => {
        const {offset} = reader
        const from = Math.floor(begin.u) - offset
        const to = Math.floor(end.u) - offset
        const includesValue = ({value}: ValueEvent) => begin.v <= value && value <= end.v
        return reader.content.events.iterateRange(from, to, includesValue)
    }
})