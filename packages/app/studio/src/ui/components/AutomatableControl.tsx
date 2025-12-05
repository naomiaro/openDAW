import css from "./AutomatableControl.sass?inline"
import {ControlSource, Lifecycle} from "@naomiarotest/lib-std"
import {createElement} from "@naomiarotest/lib-jsx"
import {attachParameterContextMenu} from "@/ui/menu/automation.ts"
import {AutomatableParameterFieldAdapter, DeviceBoxAdapter} from "@naomiarotest/studio-adapters"
import {BoxEditing} from "@naomiarotest/lib-box"
import {Html} from "@naomiarotest/lib-dom"
import {MIDILearning} from "@naomiarotest/studio-core"

const className = Html.adoptStyleSheet(css, "AutomatableControl")

type Construct = {
    lifecycle: Lifecycle
    editing: BoxEditing
    midiLearning: MIDILearning
    adapter: DeviceBoxAdapter
    parameter: AutomatableParameterFieldAdapter
}

export const AutomatableControl = (
    {lifecycle, editing, midiLearning, adapter, parameter}: Construct): HTMLLabelElement => (
    <div className={className}
         onInit={element => {
             lifecycle.ownAll(
                 attachParameterContextMenu(editing, midiLearning,
                     adapter.deviceHost().audioUnitBoxAdapter().tracks, parameter, element),
                 parameter.catchupAndSubscribeControlSources({
                     onControlSourceAdd: (source: ControlSource) => element.classList.add(source),
                     onControlSourceRemove: (source: ControlSource) => element.classList.remove(source)
                 })
             )
         }}/>)