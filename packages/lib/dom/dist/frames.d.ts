import { Exec, Terminable } from "@opendaw/lib-std";
export declare namespace AnimationFrame {
    const add: (exec: Exec) => Terminable;
    const once: (exec: Exec) => void;
    const start: (owner: WindowProxy) => void;
    const stop: () => void;
    const terminate: () => void;
}
export declare const deferNextFrame: (exec: Exec) => DeferExec;
export declare class DeferExec implements Terminable {
    #private;
    constructor(exec: Exec);
    readonly request: () => void;
    readonly immediate: () => void;
    cancel(): void;
    terminate(): void;
}
//# sourceMappingURL=frames.d.ts.map