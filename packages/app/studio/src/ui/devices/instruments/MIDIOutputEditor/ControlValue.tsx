import css from "./ControlValue.sass?inline"
import {Html} from "@naomiarotest/lib-dom"
import {byte, clamp, EmptyExec, Lifecycle, Strings} from "@naomiarotest/lib-std"
import {createElement} from "@naomiarotest/lib-jsx"
import {AutomatableParameterFieldAdapter, MIDIOutputDeviceBoxAdapter} from "@naomiarotest/studio-adapters"
import {IconSymbol} from "@naomiarotest/studio-enums"
import {ParameterLabel} from "@/ui/components/ParameterLabel"
import {RelativeUnitValueDragging} from "@/ui/wrapper/RelativeUnitValueDragging"
import {Project} from "@naomiarotest/studio-core"
import {Button} from "@/ui/components/Button"
import {Icon} from "@/ui/components/Icon"
import {DblClckTextInput} from "@/ui/wrapper/DblClckTextInput"
import {MIDIOutputParameterBox} from "@naomiarotest/studio-boxes"
import {NumberInput} from "@/ui/components/NumberInput"
import {EditWrapper} from "@/ui/wrapper/EditWrapper"

const className = Html.adoptStyleSheet(css, "ControlValue")

type Construct = {
    lifecycle: Lifecycle
    project: Project
    adapter: MIDIOutputDeviceBoxAdapter
    box: MIDIOutputParameterBox
    parameter: AutomatableParameterFieldAdapter<byte>
}

export const ControlValue = ({lifecycle, project, box, adapter, parameter}: Construct) => {
    const {editing, midiLearning} = project
    return (
        <div className={className}>
            <DblClckTextInput resolversFactory={() => {
                const resolvers = Promise.withResolvers<string>()
                resolvers.promise.then((value: string) =>
                    editing.modify(() => box.label.setValue(value)), EmptyExec)
                return resolvers
            }} provider={() => ({unit: "", value: box.label.getValue()})}>
                <span onInit={element => lifecycle.own(box.label
                    .catchupAndSubscribe(owner =>
                        element.textContent = Strings.nonEmpty(owner.getValue(), "Unnamed")))}/>
            </DblClckTextInput>
            <span>#</span>
            <NumberInput lifecycle={lifecycle}
                         model={EditWrapper.forValue(editing, box.controller)}
                         guard={{guard: (value: number): byte => clamp(value, 0, 127)}}/>
            <RelativeUnitValueDragging lifecycle={lifecycle}
                                       editing={editing}
                                       parameter={parameter}>
                <ParameterLabel lifecycle={lifecycle}
                                editing={editing}
                                midiLearning={midiLearning}
                                adapter={adapter}
                                parameter={parameter}
                                framed standalone/>
            </RelativeUnitValueDragging>
            <div/>
            <Button lifecycle={lifecycle}
                    onClick={() => editing.modify(() => parameter.field.box.delete())}>
                <Icon symbol={IconSymbol.Delete}/>
            </Button>
        </div>
    )
}