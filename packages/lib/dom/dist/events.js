import { isDefined } from "@opendaw/lib-std";
export class Events {
    static subscribe(eventTarget, type, listener, options) {
        eventTarget.addEventListener(type, listener, options);
        return { terminate: () => eventTarget.removeEventListener(type, listener, options) };
    }
    static subscribeAny(eventTarget, type, listener, options) {
        eventTarget.addEventListener(type, listener, options);
        return { terminate: () => eventTarget.removeEventListener(type, listener, options) };
    }
    static DOUBLE_DOWN_THRESHOLD = 200;
    static subscribeDblDwn = (eventTarget, listener) => {
        let lastDownTime = 0.0;
        return this.subscribe(eventTarget, "pointerdown", event => {
            const now = performance.now();
            if (now - lastDownTime < this.DOUBLE_DOWN_THRESHOLD) {
                event.preventDefault();
                event.stopImmediatePropagation();
                listener(event);
            }
            lastDownTime = now;
        }, { capture: true });
    };
    static PreventDefault = event => event.preventDefault();
    static isTextInput = (target) => target instanceof HTMLInputElement
        || target instanceof HTMLTextAreaElement
        || (target instanceof HTMLElement && isDefined(target.getAttribute("contenteditable")));
}
