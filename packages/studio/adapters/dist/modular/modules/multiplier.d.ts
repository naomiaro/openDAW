import { ModuleMultiplierBox } from "@opendaw/studio-boxes";
import { Pointers } from "@opendaw/studio-enums";
import { AbstractModuleAdapter } from "../abstract";
import { ModuleAdapter } from "../module";
import { Direction, ModuleConnectorAdapter } from "../connector";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
export declare class ModuleMultiplierAdapter extends AbstractModuleAdapter<ModuleMultiplierBox> implements ModuleAdapter {
    #private;
    constructor(context: BoxAdaptersContext, box: ModuleMultiplierBox);
    get inputs(): ReadonlyArray<ModuleConnectorAdapter<Pointers.VoltageConnection, Direction.Input>>;
    get outputs(): ReadonlyArray<ModuleConnectorAdapter<Pointers.VoltageConnection, Direction.Output>>;
}
//# sourceMappingURL=multiplier.d.ts.map