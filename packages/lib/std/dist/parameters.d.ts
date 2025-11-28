import { Observer } from "./observers";
import { Subscription, Terminable } from "./terminable";
import { Primitive, unitValue } from "./lang";
import { ValueMapping } from "./value-mapping";
import { StringMapping, StringResult } from "./string-mapping";
import { Observable, ObservableValue } from "./observables";
export interface ObservableUnitValue extends Observable<ObservableUnitValue> {
    setUnitValue: (value: unitValue) => void;
    getUnitValue: () => unitValue;
}
export type PrintValue = StringResult;
export interface ObservablePrintValue extends Observable<ObservablePrintValue> {
    setPrintValue(text: string): void;
    getPrintValue(): PrintValue;
}
export type ControlSource = "automated" | "modulated" | "midi" | "external";
export interface ControlSourceListener {
    onControlSourceAdd(source: ControlSource): void;
    onControlSourceRemove(source: ControlSource): void;
}
export interface Parameter<T extends Primitive = Primitive> extends ObservableValue<T>, ObservableUnitValue, ObservablePrintValue, Terminable {
    subscribe(observer: Observer<Parameter<T>>): Subscription;
    catchupAndSubscribeControlSources(observer: ControlSourceListener): Subscription;
    getControlledValue(): T;
    getControlledUnitValue(): unitValue;
    getControlledPrintValue(): Readonly<StringResult>;
    get valueMapping(): ValueMapping<T>;
    get stringMapping(): StringMapping<T>;
    get name(): string;
}
export declare class DefaultParameter<T extends Primitive = Primitive> implements Parameter<T> {
    #private;
    static percent(name: string, value: unitValue): Parameter<unitValue>;
    constructor(valueMapping: ValueMapping<T>, stringMapping: StringMapping<T>, name: string, value: T);
    catchupAndSubscribeControlSources(_observer: ControlSourceListener): Subscription;
    getControlledValue(): T;
    getControlledUnitValue(): unitValue;
    getControlledPrintValue(): Readonly<StringResult>;
    get valueMapping(): ValueMapping<T>;
    get stringMapping(): StringMapping<T>;
    get name(): string;
    get resetValue(): T;
    reset(): void;
    subscribe(observer: Observer<Parameter<T>>): Subscription;
    catchupAndSubscribe(observer: Observer<Parameter<T>>): Subscription;
    getValue(): T;
    setValue(value: T): void;
    setUnitValue(value: unitValue): void;
    getUnitValue(): unitValue;
    getPrintValue(): Readonly<StringResult>;
    setPrintValue(text: string): void;
    terminate(): void;
}
//# sourceMappingURL=parameters.d.ts.map