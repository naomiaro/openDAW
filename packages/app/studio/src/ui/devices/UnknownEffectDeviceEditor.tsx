import css from "./UnknownEffectDeviceEditor.sass?inline"
import {
    DeviceHost,
    UnknownAudioEffectDeviceBoxAdapter,
    UnknownMidiEffectDeviceBoxAdapter
} from "@naomiarotest/studio-adapters"
import {Lifecycle} from "@naomiarotest/lib-std"
import {DeviceEditor} from "@/ui/devices/DeviceEditor.tsx"
import {MenuItems} from "@/ui/devices/menu-items.ts"
import {createElement} from "@naomiarotest/lib-jsx"
import {DeviceMidiMeter} from "@/ui/devices/panel/DeviceMidiMeter.tsx"
import {Html} from "@naomiarotest/lib-dom"
import {StudioService} from "@/service/StudioService"
import {IconSymbol} from "@naomiarotest/studio-enums"

const className = Html.adoptStyleSheet(css, "UnknownAudioEffectDeviceEditor")

type Construct = {
    lifecycle: Lifecycle
    service: StudioService
    adapter: UnknownMidiEffectDeviceBoxAdapter | UnknownAudioEffectDeviceBoxAdapter
    deviceHost: DeviceHost
}

export const UnknownEffectDeviceEditor = ({lifecycle, service, adapter, deviceHost}: Construct) => {
    const {project} = service
    return (
        <DeviceEditor lifecycle={lifecycle}
                      project={project}
                      adapter={adapter}
                      populateMenu={parent => MenuItems.forEffectDevice(parent, service, deviceHost, adapter)}
                      populateControls={() => (
                          <div className={className}>{adapter.commentField.getValue()}</div>
                      )}
                      populateMeter={() => (
                          <DeviceMidiMeter lifecycle={lifecycle}
                                           receiver={project.liveStreamReceiver}
                                           address={adapter.address}/>
                      )}
                      icon={IconSymbol.Effects}/>
    )
}