import { asDefined, getOrProvide, isDefined, panic } from "./lang";
export var Option;
(function (Option) {
    Option.wrap = (value) => isDefined(value) ? new Some(value) : Option.None;
    Option.from = (provider) => Option.wrap(provider());
    Option.tryFrom = (provider) => {
        try {
            return Option.wrap(provider());
        }
        catch (_error) {
            return Option.None;
        }
    };
    Option.execute = (func, ...args) => Option.wrap(func?.apply(null, args));
    Option.async = (promise) => promise.then(value => Option.wrap(value), () => Option.None);
    class Some {
        #value;
        constructor(value) { this.#value = asDefined(value); }
        unwrap() { return this.#value; }
        unwrapOrElse(_) { return this.#value; }
        unwrapOrNull() { return this.#value; }
        unwrapOrUndefined() { return this.#value; }
        contains(value) { return value === this.#value; }
        match(matchable) { return matchable.some(this.#value); }
        ifSome(run) { return run(this.#value); }
        ifAbsent(_func) { return undefined; }
        isEmpty() { return false; }
        nonEmpty() { return true; }
        map(callback) { return Option.wrap(callback(this.#value)); }
        mapOr(func, _or) { return func(this.#value); }
        flatMap(callback) { return callback(this.#value); }
        equals(other) { return this.unwrapOrNull() === other.unwrapOrNull(); }
        assert(_fail) { return this; }
        toString() { return `{Option.Some(${this.#value})}`; }
        get [Symbol.toStringTag]() { return this.toString(); }
    }
    Option.Some = Some;
    Option.None = new class {
        unwrap = (fail) => panic(isDefined(fail) ? getOrProvide(fail) : "unwrap failed");
        unwrapOrElse = (value) => getOrProvide(value);
        unwrapOrNull = () => null;
        unwrapOrUndefined = () => undefined;
        contains = (_) => false;
        match = (matchable) => matchable.none();
        ifSome = (_) => { };
        ifAbsent = (exec) => exec(undefined);
        isEmpty = () => true;
        nonEmpty = () => false;
        map = (_) => Option.None;
        mapOr = (_, or) => getOrProvide(or);
        flatMap = (_) => Option.None;
        equals = (other) => other.isEmpty();
        assert = (fail) => panic(getOrProvide(fail) ?? "assert failed");
        toString = () => "{Option.None}";
        get [Symbol.toStringTag]() { return this.toString(); }
    };
})(Option || (Option = {}));
