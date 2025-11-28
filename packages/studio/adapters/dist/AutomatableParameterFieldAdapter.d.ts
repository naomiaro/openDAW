import { ControlSourceListener, Observer, Option, Parameter, StringMapping, StringResult, Subscription, Terminable, unitValue, ValueMapping } from "@opendaw/lib-std";
import { ppqn } from "@opendaw/lib-dsp";
import { Address, PrimitiveField, PrimitiveType, PrimitiveValues } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
import { TrackBoxAdapter } from "./timeline/TrackBoxAdapter";
import { BoxAdaptersContext } from "./BoxAdaptersContext";
export declare class AutomatableParameterFieldAdapter<T extends PrimitiveValues = any> implements Parameter<T>, Terminable {
    #private;
    constructor(context: BoxAdaptersContext, field: PrimitiveField<T, any>, valueMapping: ValueMapping<T>, stringMapping: StringMapping<T>, name: string, anchor?: unitValue);
    registerMidiControl(): Terminable;
    get field(): PrimitiveField<T, Pointers.Automation>;
    get valueMapping(): ValueMapping<T>;
    get stringMapping(): StringMapping<T>;
    get name(): string;
    get anchor(): unitValue;
    get type(): PrimitiveType;
    get address(): Address;
    get track(): Option<TrackBoxAdapter>;
    valueAt(position: ppqn): T;
    subscribe(observer: Observer<AutomatableParameterFieldAdapter<T>>): Subscription;
    catchupAndSubscribe(observer: Observer<AutomatableParameterFieldAdapter<T>>): Subscription;
    catchupAndSubscribeControlSources(observer: ControlSourceListener): Subscription;
    getValue(): T;
    setValue(value: T): void;
    setUnitValue(value: unitValue): void;
    getUnitValue(): unitValue;
    getControlledValue(): T;
    getControlledUnitValue(): unitValue;
    getControlledPrintValue(): Readonly<StringResult>;
    getPrintValue(): Readonly<StringResult>;
    setPrintValue(text: string): void;
    reset(): void;
    terminate(): void;
}
//# sourceMappingURL=AutomatableParameterFieldAdapter.d.ts.map