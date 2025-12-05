import css from "./NoAudioUnitSelectedPlaceholder.sass?inline"
import {Html} from "@naomiarotest/lib-dom"
import {Lifecycle} from "@naomiarotest/lib-std"
import {createElement} from "@naomiarotest/lib-jsx"
import {StudioService} from "@/service/StudioService.ts"
import {TextButton} from "@/ui/components/TextButton"

const className = Html.adoptStyleSheet(css, "NoAudioUnitSelectedPlaceholder")

type Construct = {
    lifecycle: Lifecycle
    service: StudioService
}

export const NoAudioUnitSelectedPlaceholder = ({service}: Construct) => {
    return (
        <div className={className}>
            Empty Device Chain (Click track in
            <TextButton onClick={() => service.switchScreen("default")}>timeline</TextButton>
            or channel-strip in
            <TextButton onClick={() => service.switchScreen("mixer")}>mixer</TextButton>
            to show device chain)
        </div>
    )
}