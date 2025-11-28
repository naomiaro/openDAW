import { panic } from "./lang";
import { Option } from "./option";
export var Attempts;
(function (Attempts) {
    Attempts.async = (promise) => promise.then(value => Attempts.ok(value), reason => Attempts.err(reason));
    Attempts.tryGet = (provider) => {
        try {
            return Attempts.ok(provider());
        }
        catch (reason) {
            return Attempts.err(reason);
        }
    };
    Attempts.ok = (result) => new class {
        value;
        constructor(value) {
            this.value = value;
        }
        asOption = () => Option.wrap(this.value);
        failureReason = () => { throw new Error("Attempt was successful."); };
        isFailure = () => false;
        isSuccess = () => true;
        result = () => this.value;
        map = (map) => {
            try {
                return Attempts.ok(map(this.value));
            }
            catch (reason) {
                return Attempts.err(reason);
            }
        };
        flatMap = (map) => map(this.value);
        match = (matchable) => matchable.ok(this.value);
        toVoid = () => Attempts.ok(undefined);
        failure = () => { throw new Error("Attempt was successful."); };
        toString = () => `{Success: ${this.value}`;
        get [Symbol.toStringTag]() { return "Success"; }
    }(result);
    Attempts.Ok = new class {
        constructor() { }
        asOption = () => Option.None;
        failureReason = () => { throw new Error("Attempt was successful."); };
        isFailure = () => false;
        isSuccess = () => true;
        result = () => undefined;
        map = (map) => Attempts.ok(map());
        flatMap = (map) => map();
        match = (matchable) => matchable.ok();
        toVoid = () => Attempts.ok(undefined);
        failure = () => { throw new Error("Attempt was successful."); };
        toString = () => `{Success: Ok`;
        get [Symbol.toStringTag]() { return "Success"; }
    }();
    Attempts.err = (reason) => new class {
        reason;
        constructor(reason) {
            this.reason = reason;
        }
        asOption = () => Option.None;
        failureReason = () => this.reason;
        isFailure = () => true;
        isSuccess = () => false;
        result = () => panic(`'${this.reason}'`);
        map = () => this;
        flatMap = () => this;
        match = (matchable) => matchable.err(this.reason);
        toVoid = () => Attempts.err(this.reason);
        failure = () => this;
        toString = () => `{Failure: ${this.reason}`;
        get [Symbol.toStringTag]() { return "Failure"; }
    }(reason);
})(Attempts || (Attempts = {}));
