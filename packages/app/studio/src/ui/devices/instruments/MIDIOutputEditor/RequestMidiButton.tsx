import css from "./RequestMidiButton.sass?inline"
import {Html} from "@naomiarotest/lib-dom"
import {createElement} from "@naomiarotest/lib-jsx"
import {MidiDevices} from "@naomiarotest/studio-core"
import {Icon} from "@/ui/components/Icon"
import {IconSymbol} from "@naomiarotest/studio-enums"

const className = Html.adoptStyleSheet(css, "RequestMidiButton")

export const RequestMidiButton = () => (
    <div className={className} onclick={() => MidiDevices.requestPermission()}>
        <span>Request </span><Icon symbol={IconSymbol.Midi}/>
    </div>
)