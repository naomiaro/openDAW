import {asDefined, RuntimeNotifier, UUID} from "@naomiarotest/lib-std"
import {PPQN} from "@naomiarotest/lib-dsp"
import {AudioFileBox, AudioRegionBox, ValueEventCollectionBox} from "@naomiarotest/studio-boxes"
import {ColorCodes, InstrumentFactories, Sample} from "@naomiarotest/studio-adapters"
import {OpenSampleAPI, ProjectStorage, SampleStorage} from "@naomiarotest/studio-core"
import {HTMLSelection} from "@/ui/HTMLSelection"
import {StudioService} from "@/service/StudioService"
import {Dialogs} from "../components/dialogs"

export class SampleSelection {
    readonly #service: StudioService
    readonly #selection: HTMLSelection

    constructor(service: StudioService, selection: HTMLSelection) {
        this.#service = service
        this.#selection = selection
    }

    requestDevice(): void {
        if (!this.#service.hasProfile) {return}
        const project = this.#service.project
        const {editing, boxGraph} = project
        editing.modify(() => {
            const samples = this.#selected()
            samples.forEach(({uuid: uuidAsString, name, bpm, duration: durationInSeconds}) => {
                const uuid = UUID.parse(uuidAsString)
                const {trackBox} = project.api.createInstrument(InstrumentFactories.Tape)
                const audioFileBox = boxGraph.findBox<AudioFileBox>(uuid)
                    .unwrapOrElse(() => AudioFileBox.create(boxGraph, uuid, box => {
                        box.fileName.setValue(name)
                        box.startInSeconds.setValue(0)
                        box.endInSeconds.setValue(durationInSeconds)
                    }))
                const duration = Math.round(PPQN.secondsToPulses(durationInSeconds, bpm))
                const collectionBox = ValueEventCollectionBox.create(boxGraph, UUID.generate())
                AudioRegionBox.create(boxGraph, UUID.generate(), box => {
                    box.position.setValue(0)
                    box.duration.setValue(duration)
                    box.loopDuration.setValue(duration)
                    box.regions.refer(trackBox.regions)
                    box.hue.setValue(ColorCodes.forTrackType(trackBox.type.getValue()))
                    box.label.setValue(name)
                    box.file.refer(audioFileBox)
                    box.events.refer(collectionBox.owners)
                })
            })
        })
    }

    async deleteSelected() {return this.deleteSamples(...this.#selected())}

    async deleteSamples(...samples: ReadonlyArray<Sample>) {
        const dialog = RuntimeNotifier.progress({headline: "Checking Sample Usages"})
        const used = await ProjectStorage.listUsedAssets(AudioFileBox)
        const online = new Set<string>((await OpenSampleAPI.get().all()).map(({uuid}) => uuid))
        dialog.terminate()
        const approved = await Dialogs.approve({
            headline: "Remove Sample(s)?",
            message: "This cannot be undone!",
            approveText: "Remove"
        })
        if (!approved) {return}
        for (const {uuid, name} of samples) {
            const isUsed = used.has(uuid)
            const isOnline = online.has(uuid)
            if (isUsed && !isOnline) {
                await Dialogs.info({headline: "Cannot Delete Sample", message: `${name} is used by a project.`})
            } else {
                await SampleStorage.get().deleteItem(UUID.parse(uuid))
            }
        }
    }

    #selected(): ReadonlyArray<Sample> {
        const selected = this.#selection.getSelected()
        return selected.map(element => JSON.parse(asDefined(element.getAttribute("data-selection"))) as Sample)
    }
}