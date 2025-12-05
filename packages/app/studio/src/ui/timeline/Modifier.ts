import {Dragging} from "@naomiarotest/lib-dom"
import {BoxEditing} from "@naomiarotest/lib-box"

export interface Modifier {
    update(event: Dragging.Event): void
    approve(editing: BoxEditing): void
    cancel(): void
}