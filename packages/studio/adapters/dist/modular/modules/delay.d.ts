import { ModuleDelayBox } from "@opendaw/studio-boxes";
import { Pointers } from "@opendaw/studio-enums";
import { AbstractModuleAdapter } from "../abstract";
import { ModuleAdapter } from "../module";
import { AutomatableParameterFieldAdapter } from "../../AutomatableParameterFieldAdapter";
import { Direction, ModuleConnectorAdapter } from "../connector";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
export declare class ModuleDelayAdapter extends AbstractModuleAdapter<ModuleDelayBox> implements ModuleAdapter {
    #private;
    constructor(context: BoxAdaptersContext, box: ModuleDelayBox);
    get parameterTime(): AutomatableParameterFieldAdapter<number>;
    get voltageInput(): ModuleConnectorAdapter<Pointers.VoltageConnection, Direction.Input>;
    get voltageOutput(): ModuleConnectorAdapter<Pointers.VoltageConnection, Direction.Output>;
    get inputs(): ReadonlyArray<ModuleConnectorAdapter<Pointers.VoltageConnection, Direction.Input>>;
    get outputs(): ReadonlyArray<ModuleConnectorAdapter<Pointers.VoltageConnection, Direction.Output>>;
}
//# sourceMappingURL=delay.d.ts.map