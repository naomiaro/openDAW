import { ModularAudioOutputBox } from "@opendaw/studio-boxes";
import { Pointers } from "@opendaw/studio-enums";
import { AbstractModuleAdapter } from "../abstract";
import { ModuleAdapter } from "../module";
import { Direction, ModuleConnectorAdapter } from "../connector";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
export declare class ModularAudioOutputAdapter extends AbstractModuleAdapter<ModularAudioOutputBox> implements ModuleAdapter {
    #private;
    constructor(context: BoxAdaptersContext, box: ModularAudioOutputBox);
    get voltageInput(): ModuleConnectorAdapter<Pointers.VoltageConnection, Direction.Input>;
    get inputs(): ReadonlyArray<ModuleConnectorAdapter<Pointers.VoltageConnection, Direction.Input>>;
    get outputs(): ReadonlyArray<ModuleConnectorAdapter<Pointers.VoltageConnection, Direction.Output>>;
}
//# sourceMappingURL=audio-output.d.ts.map