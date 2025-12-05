import {Selection} from "@naomiarotest/lib-std"
import {TimelineSelectableLocator} from "@/ui/timeline/TimelineSelectableLocator.ts"
import {BoxEditing} from "@naomiarotest/lib-box"
import {Event} from "@naomiarotest/lib-dsp"
import {Events, Keyboard} from "@naomiarotest/lib-dom"
import {BoxAdapter} from "@naomiarotest/studio-adapters"

export const attachShortcuts = <E extends Event & BoxAdapter>(element: Element,
                                                              editing: BoxEditing,
                                                              selection: Selection<E>,
                                                              locator: TimelineSelectableLocator<E>) =>
    Events.subscribe(element, "keydown", (event: KeyboardEvent) => {
        if (Keyboard.GlobalShortcut.isSelectAll(event)) {
            selection.select(...locator.selectable())
        } else if (Keyboard.GlobalShortcut.isDelete(event)) {
            editing.modify(() => selection.selected()
                .forEach(event => event.box.delete()))
        }
    })