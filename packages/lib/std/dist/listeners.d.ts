import { Subscription, Terminable } from "./terminable";
import { int, Procedure } from "./lang";
export declare class Listeners<T> implements Terminable {
    #private;
    constructor();
    get proxy(): Required<T>;
    get size(): int;
    subscribe(listener: T): Subscription;
    forEach(procedure: Procedure<T>): void;
    terminate(): void;
}
//# sourceMappingURL=listeners.d.ts.map