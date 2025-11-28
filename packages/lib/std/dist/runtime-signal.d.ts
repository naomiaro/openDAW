import { Observer } from "./observers";
import { Subscription } from "./terminable";
export declare namespace RuntimeSignal {
    interface Signal {
        get type(): string;
    }
    const subscribe: (observer: Observer<Signal>) => Subscription;
    const dispatch: (signal: Signal) => void;
}
//# sourceMappingURL=runtime-signal.d.ts.map