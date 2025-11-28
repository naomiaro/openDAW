import { Terminable } from "./terminable";
import { Notifier } from "./notifier";
import { Option } from "./option";
import { isDefined } from "./lang";
export var ObservableValue;
(function (ObservableValue) {
    ObservableValue.seal = (value) => new class {
        getValue() { return value; }
        subscribe(_observer) { return Terminable.Empty; }
        catchupAndSubscribe(observer) {
            observer(this);
            return Terminable.Empty;
        }
    };
})(ObservableValue || (ObservableValue = {}));
export var MutableObservableValue;
(function (MutableObservableValue) {
    MutableObservableValue.False = new class {
        getValue() { return false; }
        setValue(_) { }
        subscribe(_) { return Terminable.Empty; }
        catchupAndSubscribe(observer) {
            observer(this);
            return Terminable.Empty;
        }
    };
    MutableObservableValue.inverseBoolean = (observableValue) => new class {
        getValue() { return !observableValue.getValue(); }
        setValue(value) { observableValue.setValue(!value); }
        subscribe(observer) { return observableValue.subscribe(observer); }
        catchupAndSubscribe(observer) {
            observer(this);
            return this.subscribe(observer);
        }
    };
})(MutableObservableValue || (MutableObservableValue = {}));
export class MutableObservableOption {
    #notifier;
    #option = Option.None;
    constructor(value) {
        this.#notifier = new Notifier();
        this.wrap(value);
    }
    wrap(value) { this.wrapOption(Option.wrap(value)); }
    wrapOption(value) {
        if (!this.#option.equals(value)) {
            this.#option = value;
            this.#notifier.notify(this);
        }
    }
    clear(procedure) {
        if (this.#option.isEmpty()) {
            return;
        }
        if (isDefined(procedure)) {
            procedure(this.#option.unwrap());
        }
        this.#option = Option.None;
        this.#notifier.notify(this);
    }
    assert(fail) {
        this.#option.assert(fail);
        return this;
    }
    contains(value) { return this.#option.contains(value); }
    equals(other) { return this.#option.equals(other); }
    flatMap(func) { return this.#option.flatMap(func); }
    ifSome(procedure) { return this.#option.ifSome(procedure); }
    ifAbsent(exec) { return this.#option.ifAbsent(exec); }
    isEmpty() { return this.#option.isEmpty(); }
    map(func) { return this.#option.map(func); }
    mapOr(func, or) { return this.#option.mapOr(func, or); }
    match(matchable) { return this.#option.match(matchable); }
    nonEmpty() { return this.#option.nonEmpty(); }
    unwrap(fail) { return this.#option.unwrap(fail); }
    unwrapOrElse(or) { return this.#option.unwrapOrElse(or); }
    unwrapOrNull() { return this.#option.unwrapOrNull(); }
    unwrapOrUndefined() { return this.#option.unwrapOrUndefined(); }
    subscribe(observer) { return this.#notifier.subscribe(() => observer(this)); }
    catchupAndSubscribe(observer) {
        observer(this);
        return this.#notifier.subscribe(() => observer(this));
    }
    terminate() { this.#notifier.terminate(); }
}
export class MappedMutableObservableValue {
    #source;
    #mapping;
    #notifier;
    #subscription;
    constructor(source, mapping) {
        this.#source = source;
        this.#mapping = mapping;
        this.#notifier = new Notifier();
        this.#subscription = this.#source.catchupAndSubscribe(() => this.#notifier.notify(this.getValue()));
    }
    catchupAndSubscribe(observer) {
        observer(this);
        return this.subscribe(observer);
    }
    getValue() { return this.#mapping.fx(this.#source.getValue()); }
    setValue(value) { this.#source.setValue(this.#mapping.fy(value)); }
    subscribe(observer) {
        return this.#notifier.subscribe(() => observer(this));
    }
    terminate() { this.#subscription.terminate(); }
}
export class DefaultObservableValue {
    #notifier;
    #guard = Option.None;
    #value;
    constructor(value, guard) {
        this.#notifier = new Notifier();
        this.#value = guard?.guard(value) ?? value;
        this.#guard = Option.wrap(guard);
    }
    setValue(value) {
        if (this.#guard.nonEmpty()) {
            value = this.#guard.unwrap().guard(value);
        }
        if (this.#value === value) {
            return;
        }
        this.#value = value;
        this.#notifier.notify(this);
    }
    getValue() { return this.#value; }
    subscribe(observer) { return this.#notifier.subscribe(observer); }
    catchupAndSubscribe(observer) {
        observer(this);
        return this.#notifier.subscribe(observer);
    }
    terminate() { this.#notifier.terminate(); }
    toString() { return `{DefaultObservableValue value: ${this.#value}`; }
}
