import { Exec, Subscription } from "@opendaw/lib-std";
export declare namespace Runtime {
    const debounce: (exec: Exec, timeout?: number) => void;
    const scheduleInterval: (exec: Exec, time: number, ...args: Array<any>) => Subscription;
    const scheduleTimeout: (exec: Exec, time: number, ...args: Array<any>) => Subscription;
}
//# sourceMappingURL=runtime.d.ts.map