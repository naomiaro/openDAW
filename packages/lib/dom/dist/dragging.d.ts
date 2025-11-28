import { Func, Option, Terminable } from "@opendaw/lib-std";
import { PointerCaptureTarget } from "./events";
export declare namespace Dragging {
    interface Process {
        update(event: Event): void;
        cancel?(): void;
        approve?(): void;
        finally?(): void;
        abortSignal?: AbortSignal;
    }
    interface Event {
        readonly clientX: number;
        readonly clientY: number;
        readonly altKey: boolean;
        readonly shiftKey: boolean;
        readonly ctrlKey: boolean;
    }
    interface ProcessOptions {
        multiTouch?: boolean;
        immediate?: boolean;
        permanentUpdates?: boolean;
        pointerLock?: boolean;
        pointerLockThreshold?: number;
    }
    let usePointerLock: boolean;
    const attach: <T extends PointerCaptureTarget>(target: T, factory: Func<PointerEvent, Option<Process>>, options?: ProcessOptions) => Terminable;
}
//# sourceMappingURL=dragging.d.ts.map