import { ModularAudioInputBox } from "@opendaw/studio-boxes";
import { Pointers } from "@opendaw/studio-enums";
import { AbstractModuleAdapter } from "../abstract";
import { ModuleAdapter } from "../module";
import { Direction, ModuleConnectorAdapter } from "../connector";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
export declare class ModularAudioInputAdapter extends AbstractModuleAdapter<ModularAudioInputBox> implements ModuleAdapter {
    #private;
    constructor(context: BoxAdaptersContext, box: ModularAudioInputBox);
    get voltageOutput(): ModuleConnectorAdapter<Pointers.VoltageConnection, Direction.Output>;
    get inputs(): ReadonlyArray<ModuleConnectorAdapter<Pointers.VoltageConnection, Direction.Input>>;
    get outputs(): ReadonlyArray<ModuleConnectorAdapter<Pointers.VoltageConnection, Direction.Output>>;
}
//# sourceMappingURL=audio-input.d.ts.map