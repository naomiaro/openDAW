import css from "./MarkerTrackHeader.sass?inline"
import {Html} from "@naomiarotest/lib-dom"
import {createElement} from "@naomiarotest/lib-jsx"

const className = Html.adoptStyleSheet(css, "MarkerTrackHeader")

export const MarkerTrackHeader = () => {
    return (<div className={className}>Markers</div>)
}