import css from "./DevicesBrowser.sass?inline"
import {isDefined, isInstanceOf, Lifecycle, Objects, panic, UUID} from "@naomiarotest/lib-std"
import {Html} from "@naomiarotest/lib-dom"
import {createElement, RouteLocation} from "@naomiarotest/lib-jsx"
import {ModularBox} from "@naomiarotest/studio-boxes"
import {DeviceHost, Devices, InstrumentFactories} from "@naomiarotest/studio-adapters"
import {EffectFactories, EffectFactory, Project} from "@naomiarotest/studio-core"
import {StudioService} from "@/service/StudioService.ts"
import {DragAndDrop} from "@/ui/DragAndDrop"
import {DragDevice} from "@/ui/AnyDragData"
import {TextTooltip} from "@/ui/surface/TextTooltip"
import {ContextMenu} from "@/ui/ContextMenu"
import {MenuItem} from "@/ui/model/menu-item"
import {Icon} from "../components/Icon"

const className = Html.adoptStyleSheet(css, "DevicesBrowser")

type Construct = {
    lifecycle: Lifecycle
    service: StudioService
}

export const DevicesBrowser = ({lifecycle, service}: Construct) => {
    const {project} = service
    return (
        <div className={className}>
            <div className="resources">
                <section className="instrument">
                    <h1>Instruments</h1>
                    {createInstrumentList(lifecycle, project)}
                </section>
                <section className="audio">
                    <h1>Audio Effects</h1>
                    {createEffectList(lifecycle, service, project, Objects.exclude(EffectFactories.AudioNamed, "Modular"), "audio-effect")}
                </section>
                <section className="midi">
                    <h1>Midi Effects</h1>
                    {createEffectList(lifecycle, service, project, EffectFactories.MidiNamed, "midi-effect")}
                </section>
            </div>
            <div className="manual help-section">
                <section>
                    <h1>Creating an Instrument</h1>
                    <p>
                        To start making sound, click on an instrument from the list. This will create a new instance in
                        your
                        project.
                    </p>
                </section>
                <section>
                    <h1>Adding EffectFactories</h1>
                    <p>
                        Once an instrument is created, you can add effects. To do this, simply drag an effect
                        from the list and drop it into the instrument’s device chain.
                    </p>
                </section>
            </div>
        </div>
    )
}

const createInstrumentList = (lifecycle: Lifecycle, project: Project) => (
    <ul>{Object.entries(InstrumentFactories.Named).map(([key, factory]) => {
        const element = (
            <li onclick={() => project.editing.modify(() => {
                if (factory === InstrumentFactories.Playfield) {
                    project.api.createInstrument(InstrumentFactories.Playfield, {attachment: DefaultPlayfieldAttachment})
                } else {
                    project.api.createAnyInstrument(factory)
                }
            })}>
                <div className="icon">
                    <Icon symbol={factory.defaultIcon}/>
                </div>
                {factory.defaultName}
            </li>
        )
        lifecycle.ownAll(
            DragAndDrop.installSource(element, () => ({
                type: "instrument",
                device: key as InstrumentFactories.Keys,
                copy: true
            } satisfies DragDevice)),
            TextTooltip.simple(element, () => {
                const {bottom, left} = element.getBoundingClientRect()
                return {clientX: left, clientY: bottom + 12, text: factory.description}
            })
        )
        return element
    })
    }</ul>
)

const createEffectList = <
    R extends Record<string, EffectFactory>,
    T extends DragDevice["type"]>(lifecycle: Lifecycle, service: StudioService, project: Project, records: R, type: T): HTMLUListElement => (
    <ul>{
        Object.entries(records).map(([key, entry]) => {
            const element = (
                <li onInit={element => {
                    lifecycle.own(ContextMenu.subscribe(element, collector => collector.addItems(MenuItem.default({
                        label: `Visit Manual Page for ${entry.defaultName}`, selectable: isDefined(entry.manualPage)
                    }).setTriggerProcedure(() => RouteLocation.get().navigateTo(entry.manualPage ?? "/")))))
                    element.onclick = () => {
                        const {boxAdapters, editing, userEditingManager} = project
                        userEditingManager.audioUnit.get().ifSome(vertex => {
                            const deviceHost: DeviceHost = boxAdapters.adapterFor(vertex.box, Devices.isHost)
                            if (type === "midi-effect" && deviceHost.inputAdapter.mapOr(input => input.accepts !== "midi", true)) {
                                return
                            }
                            const effectField =
                                type === "audio-effect" ? deviceHost.audioEffects.field()
                                    : type === "midi-effect" ? deviceHost.midiEffects.field()
                                        : panic(`Unknown ${type}`)
                            editing.modify(() => {
                                const box = entry.create(project, effectField, effectField.pointerHub.incoming().length)
                                if (isInstanceOf(box, ModularBox)) {
                                    service.switchScreen("modular")
                                }
                                return box
                            })
                        })
                    }
                }}>
                    <div className="icon">
                        <Icon symbol={entry.defaultIcon}/>
                    </div>
                    {entry.defaultName}
                </li>
            )
            lifecycle.ownAll(
                DragAndDrop.installSource(element, () => ({
                    type: type as any,
                    start_index: null,
                    device: key as keyof typeof EffectFactories.MergedNamed
                } satisfies DragDevice)),
                TextTooltip.simple(element, () => {
                    const {bottom, left} = element.getBoundingClientRect()
                    return {clientX: left, clientY: bottom + 12, text: entry.description}
                })
            )
            return element
        })
    }</ul>
)

const DefaultPlayfieldAttachment: InstrumentFactories.PlayfieldAttachment = [
    {
        note: 60,
        uuid: UUID.parse("8bb2c6e8-9a6d-4d32-b7ec-1263594ef367"),
        name: "909 Bassdrum",
        durationInSeconds: 0.509,
        exclude: false
    },
    {
        note: 61,
        uuid: UUID.parse("0017fa18-a5eb-4d9d-b6f2-e2ddd30a3010"),
        name: "909 Snare",
        durationInSeconds: 0.235,
        exclude: false
    },
    {
        note: 62,
        uuid: UUID.parse("28d14cb9-1dc6-4193-9dd7-4e881f25f520"),
        name: "909 Low Tom",
        durationInSeconds: 0.509,
        exclude: false
    },
    {
        note: 63,
        uuid: UUID.parse("21f92306-d6e7-446c-a34b-b79620acfefc"),
        name: "909 Mid Tom",
        durationInSeconds: 0.385,
        exclude: false
    },
    {
        note: 64,
        uuid: UUID.parse("ad503883-8a72-46ab-a05b-a84149953e17"),
        name: "909 High Tom",
        durationInSeconds: 0.511,
        exclude: false
    },
    {
        note: 65,
        uuid: UUID.parse("cfee850b-7658-4d08-9e3b-79d196188504"),
        name: "909 Rimshot",
        durationInSeconds: 0.150,
        exclude: false
    },
    {
        note: 66,
        uuid: UUID.parse("32a6f36f-06eb-4b84-bb57-5f51103eb9e6"),
        name: "909 Clap",
        durationInSeconds: 0.507,
        exclude: false
    },
    {
        note: 67,
        uuid: UUID.parse("e0ac4b39-23fb-4a56-841d-c9e0ff440cab"),
        name: "909 Closed Hat",
        durationInSeconds: 0.154,
        exclude: true
    },
    {
        note: 68,
        uuid: UUID.parse("51c5eea4-391c-4743-896a-859692ec1105"),
        name: "909 Open Hat",
        durationInSeconds: 0.502,
        exclude: true
    },
    {
        note: 69,
        uuid: UUID.parse("42a56ff6-89b6-4f2e-8a66-5a41d316f4cb"),
        name: "909 Crash",
        durationInSeconds: 1.055,
        exclude: false
    },
    {
        note: 70,
        uuid: UUID.parse("87cde966-b799-4efc-a994-069e703478d3"),
        name: "909 Ride",
        durationInSeconds: 1.720,
        exclude: false
    }
]