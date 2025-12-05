import {Lifecycle} from "@naomiarotest/lib-std"
import {AutomatableParameterFieldAdapter} from "@naomiarotest/studio-adapters"
import {createElement, Group, JsxValue} from "@naomiarotest/lib-jsx"

type Construct = {
    lifecycle: Lifecycle
    parameter: AutomatableParameterFieldAdapter
}

export const ControlIndicator = ({lifecycle, parameter}: Construct, children: JsxValue) => {
    const element: HTMLElement = <Group>{children}</Group>
    lifecycle.own(parameter.catchupAndSubscribeControlSources({
        onControlSourceAdd: () => element.classList.add("automated"),
        onControlSourceRemove: () => element.classList.remove("automated")
    }))
    return element
}