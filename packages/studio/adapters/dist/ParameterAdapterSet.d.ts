import { Address, PointerTypes, PrimitiveField, PrimitiveValues } from "@opendaw/lib-box";
import { StringMapping, Terminable, unitValue, ValueMapping } from "@opendaw/lib-std";
import { AutomatableParameterFieldAdapter } from "./AutomatableParameterFieldAdapter";
import { BoxAdaptersContext } from "./BoxAdaptersContext";
export declare class ParameterAdapterSet implements Terminable {
    #private;
    constructor(context: BoxAdaptersContext);
    terminate(): void;
    parameters(): ReadonlyArray<AutomatableParameterFieldAdapter>;
    parameterAt(address: Address): AutomatableParameterFieldAdapter;
    createParameter<T extends PrimitiveValues>(field: PrimitiveField<T, PointerTypes>, valueMapping: ValueMapping<T>, stringMapping: StringMapping<T>, name: string, anchor?: unitValue): AutomatableParameterFieldAdapter<T>;
    removeParameter<T extends PrimitiveValues>(address: Address): AutomatableParameterFieldAdapter<T>;
}
//# sourceMappingURL=ParameterAdapterSet.d.ts.map