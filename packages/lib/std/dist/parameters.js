import { Terminable } from "./terminable";
import { ValueMapping } from "./value-mapping";
import { StringMapping } from "./string-mapping";
import { clamp } from "./math";
import { Notifier } from "./notifier";
export class DefaultParameter {
    static percent(name, value) {
        return new DefaultParameter(ValueMapping.unipolar(), StringMapping.percent(), name, value);
    }
    #notifier = new Notifier();
    #valueMapping;
    #stringMapping;
    #name;
    #resetValue;
    #value;
    constructor(valueMapping, stringMapping, name, value) {
        this.#valueMapping = valueMapping;
        this.#stringMapping = stringMapping;
        this.#name = name;
        this.#resetValue = value;
        this.#value = value;
    }
    catchupAndSubscribeControlSources(_observer) { return Terminable.Empty; }
    getControlledValue() { return this.getValue(); }
    getControlledUnitValue() { return this.getUnitValue(); }
    getControlledPrintValue() { return this.getPrintValue(); }
    get valueMapping() { return this.#valueMapping; }
    get stringMapping() { return this.#stringMapping; }
    get name() { return this.#name; }
    get resetValue() { return this.#resetValue; }
    reset() { this.setValue(this.#resetValue); }
    subscribe(observer) { return this.#notifier.subscribe(observer); }
    catchupAndSubscribe(observer) {
        observer(this);
        return this.subscribe(observer);
    }
    getValue() { return this.#value; }
    setValue(value) {
        value = this.#valueMapping.clamp(value);
        if (this.#value === value) {
            return;
        }
        this.#value = value;
        this.#notifier.notify(this);
    }
    setUnitValue(value) { this.setValue(this.#valueMapping.y(clamp(value, 0.0, 1.0))); }
    getUnitValue() { return this.#valueMapping.x(this.#value); }
    getPrintValue() { return this.#stringMapping.x(this.#value); }
    setPrintValue(text) {
        const result = this.#stringMapping.y(text);
        if (result.type === "unitValue") {
            this.setUnitValue(result.value);
        }
        else if (result.type === "explicit") {
            this.setValue(result.value);
        }
    }
    terminate() { this.#notifier.terminate(); }
}
