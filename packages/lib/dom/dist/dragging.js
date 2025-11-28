import { EmptyExec, isDefined, safeRead, Terminable, Terminator } from "@opendaw/lib-std";
import { Browser } from "./browser";
import { AnimationFrame } from "./frames";
import { Events } from "./events";
import { Keyboard } from "./keyboard";
export var Dragging;
(function (Dragging) {
    Dragging.usePointerLock = false;
    Dragging.attach = (target, factory, options) => {
        const processCycle = new Terminator();
        return Terminable.many(processCycle, Events.subscribe(target, "pointerdown", (event) => {
            if (options?.multiTouch !== true && !event.isPrimary) {
                return;
            }
            if (event.buttons !== 1 || (Browser.isMacOS() && event.ctrlKey)) {
                return;
            }
            const option = factory(event);
            if (option.isEmpty()) {
                return;
            }
            const process = option.unwrap();
            const pointerId = event.pointerId;
            event.stopPropagation();
            event.stopImmediatePropagation();
            target.setPointerCapture(pointerId);
            // Pointer lock configuration
            const usePointerLock = options?.pointerLock !== false && Dragging.usePointerLock;
            const threshold = options?.pointerLockThreshold ?? 16;
            const targetElement = target instanceof Element ? target : null;
            let pointerLockActive = false;
            const requestPointerLockIfNeeded = (clientX, clientY) => {
                if (!usePointerLock || targetElement === null || pointerLockActive) {
                    return;
                }
                // Check if the pointer is near window edges
                const nearLeft = clientX < threshold;
                const nearRight = clientX > window.innerWidth - threshold;
                const nearTop = clientY < threshold;
                const nearBottom = clientY > window.innerHeight - threshold;
                if (nearLeft || nearRight || nearTop || nearBottom) {
                    targetElement.requestPointerLock().then(() => pointerLockActive = true, EmptyExec);
                }
            };
            const moveEvent = {
                clientX: event.clientX,
                clientY: event.clientY,
                altKey: event.altKey,
                shiftKey: event.shiftKey,
                ctrlKey: Keyboard.isControlKey(event)
            };
            if (options?.immediate === true) {
                process.update(moveEvent);
            }
            if (options?.permanentUpdates === true) {
                processCycle.own(AnimationFrame.add(() => process.update(moveEvent)));
                processCycle.own(Events.subscribe(target, "pointermove", (event) => {
                    if (event.pointerId === pointerId) {
                        // Accumulate movement deltas into clientX/Y when the pointer is locked
                        if (targetElement !== null && document.pointerLockElement === targetElement) {
                            moveEvent.clientX += event.movementX;
                            moveEvent.clientY += event.movementY;
                        }
                        else {
                            moveEvent.clientX = event.clientX;
                            moveEvent.clientY = event.clientY;
                            requestPointerLockIfNeeded(event.clientX, event.clientY);
                        }
                        moveEvent.altKey = event.altKey;
                        moveEvent.shiftKey = event.shiftKey;
                        moveEvent.ctrlKey = Keyboard.isControlKey(event);
                    }
                }));
            }
            else {
                processCycle.own(Events.subscribe(target, "pointermove", (event) => {
                    if (event.pointerId === pointerId) {
                        // Accumulate movement deltas into clientX/Y when the pointer is locked
                        if (targetElement !== null && document.pointerLockElement === targetElement) {
                            moveEvent.clientX += event.movementX;
                            moveEvent.clientY += event.movementY;
                        }
                        else {
                            moveEvent.clientX = event.clientX;
                            moveEvent.clientY = event.clientY;
                            requestPointerLockIfNeeded(event.clientX, event.clientY);
                        }
                        moveEvent.altKey = event.altKey;
                        moveEvent.shiftKey = event.shiftKey;
                        moveEvent.ctrlKey = Keyboard.isControlKey(event);
                        process.update(moveEvent);
                    }
                }));
            }
            const cancel = () => {
                if (pointerLockActive && targetElement !== null && document.pointerLockElement === targetElement) {
                    document.exitPointerLock();
                }
                process.cancel?.call(process);
                process.finally?.call(process);
                processCycle.terminate();
            };
            const owner = safeRead(target, "ownerDocument", "defaultView") ?? self;
            processCycle.ownAll(Events.subscribe(target, "pointerup", (event) => {
                if (event.pointerId === pointerId) {
                    if (pointerLockActive && targetElement !== null && document.pointerLockElement === targetElement) {
                        document.exitPointerLock();
                    }
                    process.approve?.call(process);
                    process.finally?.call(process);
                    processCycle.terminate();
                }
            }, { capture: true }), Events.subscribe(target, "pointercancel", (event) => {
                console.debug(event.type);
                if (event.pointerId === pointerId) {
                    target.releasePointerCapture(pointerId);
                    cancel();
                }
            }, { capture: true }), Events.subscribe(owner, "beforeunload", (_event) => {
                // Workaround for Chrome (does not release or cancel the pointer)
                target.releasePointerCapture(pointerId);
                cancel();
            }, { capture: true }), Events.subscribe(owner, "keydown", (event) => {
                moveEvent.altKey = event.altKey;
                moveEvent.shiftKey = event.shiftKey;
                moveEvent.ctrlKey = Keyboard.isControlKey(event);
                if (event.key === "Escape") {
                    cancel();
                }
                else {
                    process.update(moveEvent);
                }
            }), Events.subscribe(owner, "keyup", (event) => {
                moveEvent.altKey = event.altKey;
                moveEvent.shiftKey = event.shiftKey;
                moveEvent.ctrlKey = Keyboard.isControlKey(event);
                process.update(moveEvent);
            }));
            if (isDefined(process.abortSignal)) {
                processCycle.own(Events.subscribe(process.abortSignal, "abort", () => {
                    target.releasePointerCapture(pointerId);
                    cancel();
                }));
            }
        }));
    };
})(Dragging || (Dragging = {}));
