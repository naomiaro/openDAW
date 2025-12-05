import css from "./AudioEditorHeader.sass?inline"
import {Lifecycle} from "@naomiarotest/lib-std"
import {StudioService} from "@/service/StudioService.ts"
import {createElement} from "@naomiarotest/lib-jsx"
import {Html} from "@naomiarotest/lib-dom"

const className = Html.adoptStyleSheet(css, "AudioEditorHeader")

type Construct = {
    lifecycle: Lifecycle
    service: StudioService
}

export const AudioEditorHeader = ({}: Construct) => (
    <div className={className}>
        <p className="help-section">
            Navigatable but otherwise non-functional yet
        </p>
    </div>
)