import { Func, Provider } from "./lang";
import { Option } from "./option";
export interface Attempt<RESULT, FAILURE = unknown> {
    isFailure(): boolean;
    isSuccess(): boolean;
    result(): RESULT;
    failureReason(): FAILURE;
    asOption(): Option<RESULT>;
    map<U>(map: Func<RESULT, U>): Attempt<U, FAILURE>;
    flatMap<U, R>(map: Func<RESULT, Attempt<U, R>>): Attempt<U, FAILURE | R>;
    match<RETURN>(matchable: Attempts.Matchable<RESULT, FAILURE, RETURN>): RETURN;
    toVoid(): Attempt<void, FAILURE>;
    failure<NOT>(): Attempt<NOT, FAILURE>;
    toString(): string;
}
export declare namespace Attempts {
    interface Matchable<RESULT, FAILURE, RETURN> {
        ok: Func<RESULT, RETURN>;
        err: Func<FAILURE, RETURN>;
    }
    const async: <RESULT, FAILURE>(promise: Promise<RESULT>) => Promise<Attempt<RESULT, FAILURE>>;
    const tryGet: <RESULT, FAILURE>(provider: Provider<RESULT>) => Attempt<RESULT, FAILURE>;
    const ok: <RESULT>(result: RESULT) => Attempt<RESULT, never>;
    const Ok: {
        readonly asOption: () => Option<never>;
        readonly failureReason: () => never;
        readonly isFailure: () => boolean;
        readonly isSuccess: () => boolean;
        readonly result: () => void;
        readonly map: <U>(map: Func<void, U>) => Attempt<U, never>;
        readonly flatMap: <U, R>(map: Func<void, Attempt<U, R>>) => Attempt<U, R>;
        readonly match: <RETURN>(matchable: Matchable<void, never, RETURN>) => RETURN;
        readonly toVoid: () => Attempt<void, never>;
        readonly failure: <NOT>() => Attempt<NOT, never>;
        readonly toString: () => string;
        get [Symbol.toStringTag](): string;
    };
    const err: <RESULT = never, FAILURE = unknown>(reason: FAILURE) => Attempt<RESULT, FAILURE>;
}
//# sourceMappingURL=attempts.d.ts.map