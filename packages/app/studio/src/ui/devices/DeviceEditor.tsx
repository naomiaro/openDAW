import css from "./DeviceEditor.sass?inline"
import {Lifecycle, ObservableValue, Procedure, Provider} from "@naomiarotest/lib-std"
import {createElement, Group, JsxValue} from "@naomiarotest/lib-jsx"
import {Icon} from "@/ui/components/Icon.tsx"
import {MenuButton} from "@/ui/components/MenuButton.tsx"
import {MenuItem} from "@/ui/model/menu-item"
import {DeviceBoxAdapter, DeviceType, EffectDeviceBoxAdapter} from "@naomiarotest/studio-adapters"
import {DebugMenus} from "@/ui/menu/debug.ts"
import {DragDevice} from "@/ui/AnyDragData"
import {DragAndDrop} from "@/ui/DragAndDrop"
import {Events, Html} from "@naomiarotest/lib-dom"
import {TextScroller} from "@/ui/TextScroller"
import {StringField} from "@naomiarotest/lib-box"
import {Project} from "@naomiarotest/studio-core"
import {Colors, IconSymbol} from "@naomiarotest/studio-enums"

const className = Html.adoptStyleSheet(css, "DeviceEditor")

const getColorFor = (type: DeviceType) => {
    switch (type) {
        case "midi-effect":
            return Colors.orange
        case "bus":
        case "instrument":
            return Colors.green
        case "audio-effect":
            return Colors.blue
    }
}

type Construct = {
    lifecycle: Lifecycle
    project: Project
    adapter: DeviceBoxAdapter
    populateMenu: Procedure<MenuItem>
    populateControls: Provider<JsxValue>
    populateMeter: Provider<JsxValue>
    createLabel?: Provider<HTMLElement>
    icon: IconSymbol
}

const defaultLabelFactory = (lifecycle: Lifecycle, labelField: StringField): Provider<JsxValue> =>
    () => {
        const label: HTMLElement = <h1/>
        lifecycle.ownAll(
            TextScroller.install(label),
            labelField.catchupAndSubscribe(owner => label.textContent = owner.getValue())
        )
        return label
    }

export const DeviceEditor =
    ({lifecycle, project, adapter, populateMenu, populateControls, populateMeter, createLabel, icon}: Construct) => {
        const {editing} = project
        const {box, type, enabledField, minimizedField, labelField} = adapter
        const color = getColorFor(type)
        return (
            <div className={Html.buildClassList(className, minimizedField.getValue() && "minimized")}
                 tabIndex={0}
                 onInit={element => {
                     lifecycle.ownAll(
                         enabledField.catchupAndSubscribe((owner: ObservableValue<boolean>) =>
                             element.classList.toggle("enabled", owner.getValue()))
                     )
                 }} data-drag>
                <header onInit={element => {
                    lifecycle.own(Events.subscribeDblDwn(element, () =>
                        editing.modify(() => minimizedField.toggle())))
                    if (type === "midi-effect" || type === "audio-effect") {
                        const effect = adapter as EffectDeviceBoxAdapter
                        lifecycle.own(DragAndDrop.installSource(element, () => ({
                            type: effect.type,
                            start_index: effect.indexField.getValue()
                        } satisfies DragDevice), element))
                    }
                }} style={{color: color.toString()}}>
                    <div className="icon">
                        <Icon symbol={icon}/>
                    </div>
                    {(createLabel ?? defaultLabelFactory(lifecycle, labelField))()}
                </header>
                <MenuButton root={MenuItem.root()
                    .setRuntimeChildrenProcedure(parent => {
                        populateMenu(parent)
                        parent.addMenuItem(DebugMenus.debugBox(box))
                    })} style={{minWidth: "0", fontSize: "0.75em"}} appearance={{color, activeColor: Colors.bright}}>
                    <Icon symbol={IconSymbol.Menu}/>
                </MenuButton>
                <Group>{minimizedField.getValue() ? false : populateControls()}</Group>
                <Group>{populateMeter()}</Group>
                <div/>
            </div>
        )
    }