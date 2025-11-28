import { Option, Terminable } from "@opendaw/lib-std";
import { Address } from "@opendaw/lib-box";
import { AutomatableParameterFieldAdapter } from "./AutomatableParameterFieldAdapter";
export declare class ParameterFieldAdapters {
    #private;
    constructor();
    register(adapter: AutomatableParameterFieldAdapter): Terminable;
    get(address: Address): AutomatableParameterFieldAdapter;
    opt(address: Address): Option<AutomatableParameterFieldAdapter>;
}
//# sourceMappingURL=ParameterFieldAdapters.d.ts.map