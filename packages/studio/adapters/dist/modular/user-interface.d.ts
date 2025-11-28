import { DeviceInterfaceKnobBox } from "@opendaw/studio-boxes";
import { Address, Box, PointerTypes } from "@opendaw/lib-box";
import { ModuleAdapter } from "./module";
import { BoxAdapter } from "../BoxAdapter";
import { AutomatableParameterFieldAdapter } from "../AutomatableParameterFieldAdapter";
import { BoxAdaptersContext } from "../BoxAdaptersContext";
export interface DeviceInterfaceElementAdapter extends BoxAdapter {
    get moduleAdapter(): ModuleAdapter;
    get parameterAdapter(): AutomatableParameterFieldAdapter;
}
export declare class DeviceInterfaceKnobAdapter implements DeviceInterfaceElementAdapter {
    #private;
    constructor(context: BoxAdaptersContext, box: DeviceInterfaceKnobBox);
    get box(): Box<PointerTypes, any>;
    get uuid(): Readonly<Uint8Array>;
    get address(): Address;
    get moduleAdapter(): ModuleAdapter;
    get parameterAdapter(): AutomatableParameterFieldAdapter;
    terminate(): void;
}
//# sourceMappingURL=user-interface.d.ts.map