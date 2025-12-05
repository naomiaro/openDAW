import css from "./AddParameterButton.sass?inline"
import {Html} from "@naomiarotest/lib-dom"
import {UUID} from "@naomiarotest/lib-std"
import {createElement} from "@naomiarotest/lib-jsx"
import {MIDIOutputParameterBox, TrackBox} from "@naomiarotest/studio-boxes"
import {IconSymbol} from "@naomiarotest/studio-enums"
import {MIDIOutputDeviceBoxAdapter, TrackType} from "@naomiarotest/studio-adapters"
import {Project} from "@naomiarotest/studio-core"
import {Icon} from "@/ui/components/Icon"

const className = Html.adoptStyleSheet(css, "AddParameterButton")

type Construct = {
    project: Project
    adapter: MIDIOutputDeviceBoxAdapter
}

export const AddParameterButton = ({project: {boxGraph, editing}, adapter}: Construct) => {
    return (
        <div className={className}
             onclick={() => editing.modify(() => {
                 const tracks = adapter.audioUnitBoxAdapter().box.tracks
                 const index = tracks.pointerHub.incoming().length
                 const parameter = MIDIOutputParameterBox.create(
                     boxGraph, UUID.generate(), box => {
                         box.label.setValue("CC")
                         box.owner.refer(adapter.box.parameters)
                     })
                 TrackBox.create(boxGraph, UUID.generate(), box => {
                     box.index.setValue(index)
                     box.target.refer(parameter.value)
                     box.type.setValue(TrackType.Value)
                     box.tracks.refer(tracks)
                 })
             })}><Icon symbol={IconSymbol.Add}/> <span>CC</span></div>
    )
}