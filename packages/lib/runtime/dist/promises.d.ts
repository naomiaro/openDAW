import { Exec, Func, int, Provider, RuntimeNotification, Terminable, TerminableOwner, TimeSpan } from "@opendaw/lib-std";
export type Resolve<T> = (value: T) => void;
export type Reject = (reason?: unknown) => void;
export type ExecutorTuple<T> = {
    resolve: Resolve<T>;
    reject: Reject;
};
export type PromiseExecutor<T> = (resolve: Resolve<T>, reject: Reject) => void;
export type RetryOption = {
    retry(reason: unknown, exec: Exec): boolean;
};
export declare class IntervalRetryOption implements RetryOption {
    #private;
    readonly maxRetry: int;
    readonly timeSpan: TimeSpan;
    constructor(maxRetry: int, timeSpan: TimeSpan);
    retry(reason: unknown, exec: Exec): boolean;
}
export declare namespace Promises {
    class ResolveResult<T> {
        readonly value: T;
        readonly status = "resolved";
        constructor(value: T);
        error: unknown;
    }
    class RejectedResult {
        readonly error: unknown;
        readonly status = "rejected";
        constructor(error: unknown);
        value: unknown;
    }
    const makeAbortable: <T>(owner: TerminableOwner, promise: Promise<T>) => Promise<T>;
    const tryCatch: <T>(promise: Promise<T>) => Promise<ResolveResult<T> | RejectedResult>;
    const retry: <T>(factory: Provider<Promise<T>>, retryOption?: RetryOption) => Promise<T>;
    const guardedRetry: <T>(factory: Provider<Promise<T>>, retryIf: (error: unknown, count: int) => boolean) => Promise<T>;
    const approvedRetry: <T>(factory: Provider<Promise<T>>, approve: Func<unknown, RuntimeNotification.ApproveRequest>) => Promise<T>;
    const fail: <T>(after: TimeSpan, thenUse: Provider<Promise<T>>) => Provider<Promise<T>>;
    const timeout: <T>(promise: Promise<T>, timeSpan: TimeSpan, fail?: string) => Promise<T>;
    const sequentialAll: <T, R>(factories: Array<Provider<Promise<R>>>) => Promise<Array<R>>;
    const sequentialize: <A, T>(handler: Func<A, Promise<T>>) => Func<A, Promise<T>>;
    const memoizeAsync: <T>(factory: Provider<Promise<T>>, timeout?: TimeSpan) => Provider<Promise<T>>;
    const allWithLimit: <T, U>(tasks: ReadonlyArray<Provider<Promise<T | U>>>, limit?: number) => Promise<Array<T | U>>;
    const allSettledWithLimit: <T, U>(tasks: ReadonlyArray<Provider<Promise<T | U>>>, limit?: number) => Promise<PromiseSettledResult<T | U>[]>;
    class Limit<T> {
        #private;
        readonly max: int;
        constructor(max?: int);
        add(provider: Provider<Promise<T>>): Promise<T>;
    }
    class Latest<T> implements Terminable {
        #private;
        constructor(onResolve: Resolve<T>, onReject: Reject, onFinally?: Exec);
        update(promise: Promise<T>): void;
        terminate(): void;
    }
}
//# sourceMappingURL=promises.d.ts.map