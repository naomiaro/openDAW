import {DefaultObservableValue, isDefined, Lifecycle, Nullable, Terminator} from "@naomiarotest/lib-std"
import {createElement, Group} from "@naomiarotest/lib-jsx"
import {AnyClipBoxAdapter} from "@naomiarotest/studio-adapters"
import {Clip} from "@/ui/timeline/tracks/audio-unit/clips/Clip.tsx"
import {Html} from "@naomiarotest/lib-dom"
import {Project} from "@naomiarotest/studio-core"

type Construct = {
    lifecycle: Lifecycle
    project: Project
    adapter: DefaultObservableValue<Nullable<AnyClipBoxAdapter>>
    gridColumn: string
}

export const ClipPlaceholder = ({lifecycle, project, adapter, gridColumn}: Construct) => {
    const element: HTMLElement = <Group/>
    const terminator = lifecycle.own(new Terminator())
    lifecycle.own(
        adapter.catchupAndSubscribe(owner => {
            Html.empty(element)
            terminator.terminate()
            const adapter = owner.getValue()
            if (isDefined(adapter)) {
                element.appendChild(<Clip lifecycle={terminator} project={project} adapter={adapter}
                                          gridColumn={gridColumn}/>)
            } else {
                element.appendChild(<div className="placeholder" style={{gridColumn}}/>)
            }
        }))
    return element
}