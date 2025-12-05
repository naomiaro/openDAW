import css from "./Dashboard.sass?inline"
import {DefaultObservableValue, Lifecycle, Terminator} from "@naomiarotest/lib-std"
import {createElement, HTML, replaceChildren} from "@naomiarotest/lib-jsx"
import {StudioService} from "@/service/StudioService.ts"
import {Html} from "@naomiarotest/lib-dom"
import {ProjectBrowser} from "@/project/ProjectBrowser"
import {Dialogs} from "@/ui/components/dialogs"
import {Colors} from "@naomiarotest/studio-enums"
import {RadioGroup} from "@/ui/components/RadioGroup"
import {SampleBrowser} from "@/ui/browse/SampleBrowser"
import {SoundfontBrowser} from "@/ui/browse/SoundfontBrowser"

const className = Html.adoptStyleSheet(css, "Dashboard")

type Construct = {
    lifecycle: Lifecycle
    service: StudioService
}

export const Dashboard = ({lifecycle, service}: Construct) => {
    const scope = new DefaultObservableValue(0)
    return (
        <div className={className}>
            <article>
                <h1>Welcome to openDAW</h1>
                <h2>A new holistic exploration of music creation inside your browser</h2>
                <p style={{margin: "1em 0 0 0"}}>
                    This is an <span className="highlight">early prototype</span> giving you an early glimpse of the
                    development
                    state.
                </p>
                <div className="columns">
                    <div>
                        <h3 style={{color: Colors.orange.toString()}}>Templates</h3>
                        <div className="starters">
                            {[
                                {name: "New", click: () => service.newProject()},
                                {name: "Sunset", click: () => service.loadTemplate("Sunset")},
                                {name: "Breeze", click: () => service.loadTemplate("Breeze")},
                                {name: "Shafted", click: () => service.loadTemplate("Shafted")},
                                {name: "Seek Deeper", click: () => service.loadTemplate("SeekDeeper")},
                                {name: "Fatso", click: () => service.loadTemplate("Fatso")},
                                {name: "Bury Me", click: () => service.loadTemplate("BuryMe")},
                                {
                                    name: "Bury Me (BMX Remix)",
                                    click: () => service.loadTemplate("BMX_Skyence_buryme_Remix")
                                },
                                {name: "Ben", click: () => service.loadTemplate("Ben")},
                                {name: "Liquid", click: () => service.loadTemplate("BMX_LiquidDrums")},
                                {name: "Release", click: () => service.loadTemplate("Release")},
                                {name: "Dub Techno", click: () => service.loadTemplate("Dub-Techno")}
                            ].map(({name, click}, index) => {
                                const svgSource = `viscious-speed/${String(index + 1).padStart(2, "0")}.svg`
                                return (
                                    <div onclick={click}>
                                        <HTML src={fetch(svgSource)} className="icon"/>
                                        <label>{name}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="resources">
                        <RadioGroup lifecycle={lifecycle}
                                    style={{columnGap: "1em"}}
                                    appearance={{activeColor: Colors.orange}}
                                    model={scope}
                                    elements={[
                                        {value: 0, element: (<h3>Projects</h3>)},
                                        {value: 1, element: (<h3>Samples</h3>)},
                                        {value: 2, element: (<h3>Soundfonts</h3>)}
                                    ]}/>
                        <div style={{display: "contents"}} onInit={element => {
                            const scopeLifeCycle = lifecycle.own(new Terminator())
                            lifecycle.own(scope.catchupAndSubscribe(owner => {
                                replaceChildren(element)
                                scopeLifeCycle.terminate()
                                switch (owner.getValue()) {
                                    case 0:
                                        replaceChildren(element, (
                                            <ProjectBrowser service={service}
                                                            lifecycle={scopeLifeCycle}
                                                            select={async ([uuid, meta]) => {
                                                                const handler = Dialogs.processMonolog("Loading...")
                                                                await service.projectProfileService.load(uuid, meta)
                                                                handler.close()
                                                            }}/>
                                        ))
                                        break
                                    case 1:
                                        replaceChildren(element, (
                                            <SampleBrowser lifecycle={scopeLifeCycle} service={service}/>
                                        ))
                                        break
                                    case 2:
                                        replaceChildren(element, (
                                            <SoundfontBrowser lifecycle={scopeLifeCycle} service={service}/>
                                        ))
                                        break
                                }
                            }))
                        }}>
                        </div>
                    </div>
                </div>
                <p style={{marginTop: "2em", fontSize: "12px", textAlign: "center"}}>
                    Join our <a href="https://discord.opendaw.studio" target="discord" style={{color: Colors.blue}}>discord
                    community</a> to stay updated! · source-code available at <a
                    href="https://github.com/andremichelle/opendaw"
                    target="github"
                    style={{color: Colors.blue}}>github</a> · Built with ❤️
                </p>
            </article>
        </div>
    )
}