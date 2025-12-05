import css from "./TracksFooterHeader.sass?inline"
import {Html} from "@naomiarotest/lib-dom"
import {createElement} from "@naomiarotest/lib-jsx"

const className = Html.adoptStyleSheet(css, "TracksFooterHeader")

export const TracksFooterHeader = () => {
    return (<div className={className}/>)
}