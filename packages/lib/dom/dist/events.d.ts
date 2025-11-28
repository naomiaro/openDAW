import { Nullable, Procedure, Subscription } from "@opendaw/lib-std";
type KnownEventMap = WindowEventMap & MIDIInputEventMap & MIDIPortEventMap;
export declare class Events {
    static subscribe<K extends keyof KnownEventMap>(eventTarget: EventTarget, type: K, listener: (ev: KnownEventMap[K]) => void, options?: boolean | AddEventListenerOptions): Subscription;
    static subscribeAny<E extends Event>(eventTarget: EventTarget, type: string, listener: (event: E) => void, options?: boolean | AddEventListenerOptions): Subscription;
    static DOUBLE_DOWN_THRESHOLD: 200;
    static subscribeDblDwn: (eventTarget: EventTarget, listener: (event: PointerEvent) => void) => Subscription;
    static readonly PreventDefault: Procedure<Event>;
    static readonly isTextInput: (target: Nullable<EventTarget>) => boolean;
}
export interface PointerCaptureTarget extends EventTarget {
    setPointerCapture(pointerId: number): void;
    releasePointerCapture(pointerId: number): void;
    hasPointerCapture(pointerId: number): boolean;
}
export {};
//# sourceMappingURL=events.d.ts.map