import { int, Observable, TimeSpan } from "@opendaw/lib-std";
export declare namespace Wait {
    const frame: () => Promise<void>;
    const frames: (numFrames: int) => Promise<void>;
    const timeSpan: <T>(time: TimeSpan, ...args: any[]) => Promise<T>;
    const event: (target: EventTarget, type: string) => Promise<void>;
    const observable: (observable: Observable<unknown>) => Promise<void>;
    const complete: <R>(generator: Generator<unknown, R>) => Promise<R>;
}
//# sourceMappingURL=wait.d.ts.map