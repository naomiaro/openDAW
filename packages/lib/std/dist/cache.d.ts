import { Exec, Provider } from "./lang";
import { Terminable } from "./terminable";
export declare class Cache<T> implements Terminable {
    #private;
    constructor(provider: Provider<T>);
    readonly invalidate: Exec;
    get(): T;
    terminate(): void;
}
//# sourceMappingURL=cache.d.ts.map