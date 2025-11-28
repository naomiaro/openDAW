import { Subscription, Terminable } from "./terminable";
import { Observer } from "./observers";
import { Observable } from "./observables";
export declare class Notifier<T> implements Observable<T>, Terminable {
    #private;
    static subscribeMany<T extends Observable<any>>(observer: Observer<T>, ...observables: ReadonlyArray<T>): Subscription;
    subscribe(observer: Observer<T>): Subscription;
    isEmpty(): boolean;
    notify(value: T): void;
    observers(): Set<Observer<T>>;
    terminate(): void;
}
//# sourceMappingURL=notifier.d.ts.map