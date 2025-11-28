import { Browser } from "./browser";
import { Events } from "./events";
export var Keyboard;
(function (Keyboard) {
    Keyboard.isControlKey = ({ ctrlKey, metaKey }) => Browser.isMacOS() ? metaKey : ctrlKey;
    Keyboard.isCopyKey = ({ altKey }) => altKey;
    Keyboard.GlobalShortcut = Object.freeze({
        isDelete: (event) => !Events.isTextInput(event.target) && (event.code === "Delete" || event.code === "Backspace"),
        isSelectAll: (event) => Keyboard.isControlKey(event) && !event.shiftKey && event.code === "KeyA",
        isDeselectAll: (event) => Keyboard.isControlKey(event) && event.shiftKey && event.code === "KeyA"
    });
})(Keyboard || (Keyboard = {}));
