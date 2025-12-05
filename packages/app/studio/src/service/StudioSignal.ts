import {Sample, Soundfont} from "@naomiarotest/studio-adapters"
import {ProjectMeta} from "@naomiarotest/studio-core"

export type StudioSignal =
    | { type: "reset-peaks" }
    | { type: "import-sample", sample: Sample }
    | { type: "import-soundfont", soundfont: Soundfont }
    | { type: "delete-project", meta: ProjectMeta }