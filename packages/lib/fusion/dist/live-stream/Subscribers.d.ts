import { Maybe, Subscription, Terminable } from "@opendaw/lib-std";
import { Address } from "@opendaw/lib-box";
export declare class Subscribers<T> implements Terminable {
    #private;
    constructor();
    getOrNull(address: Address): Maybe<ReadonlyArray<T>>;
    isEmpty(address: Address): boolean;
    subscribe(address: Address, listener: T): Subscription;
    terminate(): void;
}
//# sourceMappingURL=Subscribers.d.ts.map