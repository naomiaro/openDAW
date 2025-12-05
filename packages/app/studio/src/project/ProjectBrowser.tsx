import css from "./ProjectBrowser.sass?inline"
import {StudioService} from "@/service/StudioService"
import {
    DefaultObservableValue,
    Lifecycle,
    Procedure,
    RuntimeNotifier,
    RuntimeSignal,
    StringComparator,
    TimeSpan,
    UUID
} from "@naomiarotest/lib-std"
import {Icon} from "@/ui/components/Icon"
import {IconSymbol} from "@naomiarotest/studio-enums"
import {Dialogs} from "@/ui/components/dialogs"
import {Await, createElement, DomElement, Frag, Group} from "@naomiarotest/lib-jsx"
import {Html} from "@naomiarotest/lib-dom"
import {ProjectMeta, ProjectSignals, ProjectStorage} from "@naomiarotest/studio-core"
import {ContextMenu} from "@/ui/ContextMenu"
import {MenuItem} from "@/ui/model/menu-item"
import {SearchInput} from "@/ui/components/SearchInput"
import {ThreeDots} from "@/ui/spinner/ThreeDots"

const className = Html.adoptStyleSheet(css, "ProjectBrowser")

type Construct = {
    service: StudioService
    lifecycle: Lifecycle
    select: Procedure<[UUID.Bytes, ProjectMeta]>
}

export const ProjectBrowser = ({service, lifecycle, select}: Construct) => {
    const now = new Date().getTime()
    const filter = new DefaultObservableValue("")
    return (
        <div className={className}>
            <Await factory={() => ProjectStorage.listProjects()}
                   loading={() => (<div className="loader"><ThreeDots/></div>)}
                   failure={({reason}) => (
                       <span>{reason instanceof DOMException ? reason.name : String(reason)}</span>
                   )}
                   repeat={exec => lifecycle.own(RuntimeSignal
                       .subscribe(signal => signal === ProjectSignals.StorageUpdated && exec()))}
                   success={projects => (
                       <Frag>
                           <div className="filter">
                               <SearchInput lifecycle={lifecycle} model={filter} style={{gridColumn: "1 / -1"}}/>
                           </div>
                           <div className="content">
                               <header>
                                   <div className="name">Name</div>
                                   <div className="time">Modified</div>
                                   <div/>
                               </header>
                               <div className="list">
                                   {projects
                                       .toSorted((a, b) => -StringComparator(a.meta.modified, b.meta.modified))
                                       .map(({uuid, meta}) => {
                                           const icon: DomElement = <Icon symbol={IconSymbol.Delete}
                                                                          className="delete-icon"/>
                                           const timeString = TimeSpan.millis(new Date(meta.modified).getTime() - now).toUnitString()
                                           const row: HTMLElement = (
                                               <Group onInit={element => filter.catchupAndSubscribe(owner => {
                                                   element.classList.toggle("hidden", !meta.name
                                                       .toLowerCase()
                                                       .includes(owner.getValue().toLowerCase()))
                                               })}>
                                                   <div className="labels"
                                                        onclick={() => select([uuid, meta])}
                                                        onInit={element => lifecycle.own(ContextMenu.subscribe(element,
                                                            collector => collector.addItems(MenuItem.default({
                                                                label: "Show UUID"
                                                            }).setTriggerProcedure(() => RuntimeNotifier.info({
                                                                headline: meta.name,
                                                                message: UUID.toString(uuid)
                                                            })))))}>
                                                       <div className="name">{meta.name}</div>
                                                       <div className="time">{timeString}</div>
                                                   </div>
                                                   {icon}
                                               </Group>
                                           )
                                           icon.onclick = (event) => {
                                               event.stopPropagation()
                                               Dialogs.approve({
                                                   headline: "Delete Project?",
                                                   message: "Are you sure? This cannot be undone."
                                               }).then(approved => {
                                                   if (approved) {
                                                       service.deleteProject(uuid, meta).then(() => row.remove())
                                                   }
                                               })
                                           }
                                           return row
                                       })}
                               </div>
                           </div>
                       </Frag>
                   )}/>
        </div>
    )
}