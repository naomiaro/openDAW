import { Exec, Func } from "./lang";
import { Observer } from "./observers";
export interface Terminable {
    terminate(): void;
}
export interface TerminableOwner {
    own<T extends Terminable>(terminable: T): T;
    ownAll<T extends Terminable>(...terminables: Array<T>): void;
    spawn(): Terminator;
}
export type Subscription = Terminable;
export type Lifecycle = TerminableOwner;
export declare const Terminable: Readonly<{
    readonly Empty: {
        readonly terminate: Exec;
    };
    readonly create: (exec: Exec) => {
        terminate: Exec;
    };
    readonly many: (...terminables: Terminable[]) => Terminable;
}>;
export declare class Terminator implements TerminableOwner, Terminable {
    #private;
    isEmpty(): boolean;
    nonEmpty(): boolean;
    own<T extends Terminable>(terminable: T): T;
    ownAll<T extends Terminable>(...terminables: Array<T>): void;
    spawn(): Terminator;
    terminate(): void;
}
export declare class VitalSigns implements Terminable {
    #private;
    get isTerminated(): boolean;
    terminate(): void;
}
export declare class CascadingSubscriptions {
    #private;
    constructor();
    next(): {
        own: (subscription: Subscription) => Subscription;
        toObserver: <T>(fn: Func<T, Subscription>) => Observer<T>;
    };
    append<T>(subscribe: Func<Observer<T>, Subscription>, observer: Func<T, Subscription>): Subscription;
}
//# sourceMappingURL=terminable.d.ts.map