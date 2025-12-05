import css from "./NoMidiSupport.sass?inline"
import {Html} from "@naomiarotest/lib-dom"
import {createElement} from "@naomiarotest/lib-jsx"

const className = Html.adoptStyleSheet(css, "NoMidiSupport")

export const NoMidiSupport = () => (
    <div className={className}>
        <div>You browser does not support MIDI</div>
        <div>Tip: Chrome and Firefox do</div>
    </div>
)