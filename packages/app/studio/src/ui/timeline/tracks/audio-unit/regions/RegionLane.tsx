import css from "./RegionLane.sass?inline"
import {Html} from "@naomiarotest/lib-dom"
import {Lifecycle} from "@naomiarotest/lib-std"
import {createElement} from "@naomiarotest/lib-jsx"
import {CanvasPainter} from "@/ui/canvas/painter.ts"
import {renderRegions} from "@/ui/timeline/tracks/audio-unit/regions/RegionRenderer.ts"
import {TrackBoxAdapter, TrackType} from "@naomiarotest/studio-adapters"
import {TracksManager} from "@/ui/timeline/tracks/audio-unit/TracksManager.ts"
import {TimelineRange} from "@naomiarotest/studio-core"

const className = Html.adoptStyleSheet(css, "RegionLane")

type Construct = {
    lifecycle: Lifecycle
    trackManager: TracksManager
    range: TimelineRange
    adapter: TrackBoxAdapter
}

export const RegionLane = ({lifecycle, trackManager, range, adapter}: Construct) => {
    if (adapter.type === TrackType.Undefined) {
        return <div className={Html.buildClassList(className, "deactive")}/>
    }
    let updated = false
    let visible = false
    const canvas: HTMLCanvasElement = <canvas/>
    const element: Element = (<div className={className}>{canvas}</div>)
    const painter = lifecycle.own(new CanvasPainter(canvas, ({context}) => {
        if (visible) {
            renderRegions(context, trackManager, range, adapter.listIndex)
            updated = true
        }
    }))
    const requestUpdate = () => {
        updated = false
        painter.requestUpdate()
    }
    lifecycle.ownAll(
        range.subscribe(requestUpdate),
        adapter.regions.subscribeChanges(requestUpdate),
        trackManager.service.project.timelineBox.signature.subscribe(requestUpdate),
        Html.watchIntersection(element, entries => entries
                .forEach(({isIntersecting}) => {
                    visible = isIntersecting
                    if (!updated) {
                        painter.requestUpdate()
                    }
                }),
            {root: trackManager.scrollableContainer})
    )
    return element
}