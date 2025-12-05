import {AutomatableParameterFieldAdapter, DeviceBoxAdapter} from "@naomiarotest/studio-adapters"
import {Column} from "@/ui/devices/Column.tsx"
import {createElement} from "@naomiarotest/lib-jsx"
import {LKR} from "@/ui/devices/constants.ts"
import {ParameterLabelKnob} from "@/ui/devices/ParameterLabelKnob.tsx"
import {Color, TerminableOwner, ValueGuide} from "@naomiarotest/lib-std"
import {BoxEditing, PrimitiveValues} from "@naomiarotest/lib-box"
import {MIDILearning} from "@naomiarotest/studio-core"
import {Colors} from "@naomiarotest/studio-enums"

type Creation<T extends PrimitiveValues> = {
    lifecycle: TerminableOwner
    editing: BoxEditing
    midiLearning: MIDILearning
    adapter: DeviceBoxAdapter
    parameter: AutomatableParameterFieldAdapter<T>
    options?: ValueGuide.Options
    anchor?: number
    color?: Color
    style?: Partial<CSSStyleDeclaration>
}

export namespace ControlBuilder {
    export const createKnob = <T extends PrimitiveValues, >
    ({lifecycle, editing, midiLearning, adapter, parameter, options, anchor, color, style}: Creation<T>) => {
        return (
            <Column ems={LKR} color={color ?? Colors.cream} style={style}>
                <h5>{parameter.name}</h5>
                <ParameterLabelKnob lifecycle={lifecycle}
                                    editing={editing}
                                    midiLearning={midiLearning}
                                    adapter={adapter}
                                    parameter={parameter}
                                    options={options}
                                    anchor={anchor}/>
            </Column>
        )
    }
}