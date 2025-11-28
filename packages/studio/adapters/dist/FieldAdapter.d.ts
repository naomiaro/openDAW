import { MutableObservableValue, Observer, Option, StringMapping, StringResult, Subscription, Terminable, unitValue, ValueMapping } from "@opendaw/lib-std";
import { Address, PrimitiveField, PrimitiveType, PrimitiveValues } from "@opendaw/lib-box";
import { TrackBoxAdapter } from "./timeline/TrackBoxAdapter";
export declare class FieldAdapter<T extends PrimitiveValues = any> implements MutableObservableValue<T>, Terminable {
    #private;
    constructor(field: PrimitiveField<T, any>, valueMapping: ValueMapping<T>, stringMapping: StringMapping<T>, name: string, anchor?: unitValue);
    get field(): PrimitiveField<T>;
    get valueMapping(): ValueMapping<T>;
    get stringMapping(): StringMapping<T>;
    get name(): string;
    get anchor(): unitValue;
    get type(): PrimitiveType;
    get address(): Address;
    get track(): Option<TrackBoxAdapter>;
    subscribe(observer: Observer<FieldAdapter<T>>): Subscription;
    catchupAndSubscribe(observer: Observer<FieldAdapter<T>>): Subscription;
    getValue(): T;
    setValue(value: T): void;
    setUnitValue(value: unitValue): void;
    getUnitValue(): unitValue;
    getPrintValue(): Readonly<StringResult>;
    setPrintValue(text: string): void;
    reset(): void;
    terminate(): void;
}
//# sourceMappingURL=FieldAdapter.d.ts.map