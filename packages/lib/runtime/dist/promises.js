import { assert, InaccessibleProperty, isDefined, isNull, Option, RuntimeNotifier, safeExecute, Terminable, TimeSpan } from "@opendaw/lib-std";
import { Wait } from "./wait";
export class IntervalRetryOption {
    maxRetry;
    timeSpan;
    #count = 0 | 0;
    constructor(maxRetry, timeSpan) {
        this.maxRetry = maxRetry;
        this.timeSpan = timeSpan;
    }
    retry(reason, exec) {
        if (++this.#count === this.maxRetry) {
            return false;
        }
        console.debug(`${reason} > will retry in ${this.timeSpan.toString()}`);
        setTimeout(exec, this.timeSpan.millis());
        return true;
    }
}
export var Promises;
(function (Promises) {
    class ResolveResult {
        value;
        status = "resolved";
        constructor(value) {
            this.value = value;
        }
        error = InaccessibleProperty("Cannot access error when promise is resolved");
    }
    Promises.ResolveResult = ResolveResult;
    class RejectedResult {
        error;
        status = "rejected";
        constructor(error) {
            this.error = error;
        }
        value = InaccessibleProperty("Cannot access value when promise is rejected");
    }
    Promises.RejectedResult = RejectedResult;
    Promises.makeAbortable = async (owner, promise) => {
        let running = true;
        owner.own(Terminable.create(() => running = false));
        return new Promise((resolve, reject) => promise.then(value => { if (running) {
            resolve(value);
        } }, reason => { if (running) {
            reject(reason);
        } }));
    };
    Promises.tryCatch = (promise) => promise.then(value => new ResolveResult(value), error => new RejectedResult(error));
    const DefaultRetryOption = new IntervalRetryOption(3, TimeSpan.seconds(3));
    Promises.retry = (factory, retryOption = DefaultRetryOption) => factory().catch(reason => new Promise((resolve, reject) => {
        const onFailure = (reason) => {
            if (!retryOption.retry(reason, () => factory().then((value) => resolve(value), onFailure))) {
                reject(reason);
            }
        };
        onFailure(reason);
    }));
    Promises.guardedRetry = (factory, retryIf) => {
        const attempt = async (count = 0) => {
            try {
                return await factory();
            }
            catch (reason) {
                if (retryIf(reason, ++count)) {
                    console.debug("retrying after failure:", reason);
                    await Wait.timeSpan(TimeSpan.seconds(1));
                    return attempt(count);
                }
                throw new Error(`Failed after ${count} retries: ${reason}`);
            }
        };
        return attempt();
    };
    Promises.approvedRetry = (factory, approve) => {
        const attempt = async () => {
            try {
                return await factory();
            }
            catch (reason) {
                if (await RuntimeNotifier.approve(approve(reason))) {
                    return attempt();
                }
                throw reason;
            }
        };
        return attempt();
    };
    // this is for testing the catch branch
    Promises.fail = (after, thenUse) => {
        let use = () => new Promise((_, reject) => setTimeout(() => reject("fails first"), after.millis()));
        return () => {
            const promise = use();
            use = thenUse;
            return promise;
        };
    };
    Promises.timeout = (promise, timeSpan, fail) => {
        return new Promise((resolve, reject) => {
            let running = true;
            const timeout = setTimeout(() => {
                running = false;
                reject(new Error(fail ?? "timeout"));
            }, timeSpan.millis());
            promise
                .then((value) => { if (running) {
                resolve(value);
            } }, reason => { if (running) {
                reject(reason);
            } })
                .finally(() => clearTimeout(timeout));
        });
    };
    Promises.sequentialAll = (factories) => factories.reduce((promise, factory) => promise
        .then(async (results) => [...results, await factory()]), Promise.resolve([]));
    Promises.sequentialize = (handler) => {
        let lastPromise = Promise.resolve();
        return (arg) => {
            const execute = () => handler(arg);
            const currentPromise = lastPromise.then(execute, execute);
            lastPromise = currentPromise.catch(() => { });
            return currentPromise;
        };
    };
    Promises.memoizeAsync = (factory, timeout) => {
        let resolving = null;
        let lastCall = Date.now();
        return () => {
            const now = Date.now();
            if (isNull(resolving) || (isDefined(timeout) && now - lastCall > timeout.millis())) {
                lastCall = now;
                resolving = factory();
                resolving.catch(error => {
                    resolving = null;
                    return error;
                });
            }
            return resolving;
        };
    };
    Promises.allWithLimit = async (tasks, limit = 1) => {
        const results = new Array(tasks.length);
        let index = 0;
        let hasError = false;
        const run = async () => {
            while (index < tasks.length && !hasError) {
                const i = index++;
                try {
                    const value = await tasks[i]();
                    if (!hasError) {
                        results[i] = value;
                    }
                }
                catch (reason) {
                    hasError = true;
                    throw reason;
                }
            }
        };
        await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, run));
        return results;
    };
    Promises.allSettledWithLimit = async (tasks, limit = 1) => {
        const results = new Array(tasks.length);
        let index = 0;
        const run = async () => {
            while (index < tasks.length) {
                const i = index++;
                try {
                    const value = await tasks[i]();
                    results[i] = { status: "fulfilled", value };
                }
                catch (reason) {
                    results[i] = { status: "rejected", reason };
                }
            }
        };
        await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, run));
        return results;
    };
    class Limit {
        max;
        #waiting;
        #running = 0 | 0;
        constructor(max = 1) {
            this.max = max;
            this.#waiting = [];
        }
        async add(provider) {
            if (this.#running < this.max) {
                this.#running++;
                return provider().finally(() => this.#continue());
            }
            else {
                const resolvers = Promise.withResolvers();
                this.#waiting.push([provider, resolvers]);
                return resolvers.promise.finally(() => this.#continue());
            }
        }
        #continue() {
            assert(this.#running > 0, "Internal Error in Promises.Limit");
            if (--this.#running < this.max) {
                if (this.#waiting.length > 0) {
                    const [provider, { resolve, reject }] = this.#waiting.shift();
                    this.#running++;
                    provider().then(resolve, reject);
                }
            }
        }
    }
    Promises.Limit = Limit;
    class Latest {
        #onResolve;
        #onReject;
        #onFinally;
        #latest = Option.None;
        constructor(onResolve, onReject, onFinally) {
            this.#onResolve = onResolve;
            this.#onReject = onReject;
            this.#onFinally = onFinally;
        }
        update(promise) {
            this.#latest = Option.wrap(promise);
            promise
                .then(value => { if (this.#latest.contains(promise)) {
                this.#onResolve(value);
            } })
                .catch(reason => { if (this.#latest.contains(promise)) {
                this.#onReject(reason);
            } })
                .finally(() => {
                if (this.#latest.contains(promise)) {
                    this.terminate();
                    safeExecute(this.#onFinally);
                }
            });
        }
        terminate() { this.#latest = Option.None; }
    }
    Promises.Latest = Latest;
})(Promises || (Promises = {}));
