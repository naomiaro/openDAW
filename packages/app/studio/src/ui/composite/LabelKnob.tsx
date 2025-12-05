import {Lifecycle, unitValue} from "@naomiarotest/lib-std"
import {Knob} from "@/ui/components/Knob.tsx"
import {ParameterLabel} from "@/ui/components/ParameterLabel.tsx"
import {createElement} from "@naomiarotest/lib-jsx"
import {AutomatableParameterFieldAdapter, DeviceBoxAdapter} from "@naomiarotest/studio-adapters"
import {BoxEditing} from "@naomiarotest/lib-box"
import {MIDILearning} from "@naomiarotest/studio-core"

type Construct = {
    lifecycle: Lifecycle
    editing: BoxEditing
    midiDevices: MIDILearning,
    adapter: DeviceBoxAdapter
    parameter: AutomatableParameterFieldAdapter
    anchor: unitValue
}

export const LabelKnob = ({lifecycle, editing, midiDevices, adapter, parameter, anchor}: Construct) => {
    return (
        <div style={{display: "contents"}}>
            <Knob lifecycle={lifecycle} value={parameter} anchor={anchor}/>
            <ParameterLabel lifecycle={lifecycle}
                            editing={editing}
                            midiLearning={midiDevices}
                            adapter={adapter}
                            parameter={parameter}/>
        </div>
    )
}