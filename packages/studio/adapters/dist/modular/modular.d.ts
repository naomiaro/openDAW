import { ModularBox } from "@opendaw/studio-boxes";
import { Address, Field, StringField } from "@opendaw/lib-box";
import { Subscription, UUID } from "@opendaw/lib-std";
import { ModuleConnectionAdapter } from "./connection";
import { Pointers } from "@opendaw/studio-enums";
import { ModuleAdapter } from "./module";
import { BoxAdapter } from "../BoxAdapter";
import { BoxAdaptersContext } from "../BoxAdaptersContext";
import { ModularDeviceBoxAdapter } from "../devices/audio-effects/ModularDeviceBoxAdapter";
export interface ModularSystemListener {
    onModuleAdded?(adapter: ModuleAdapter): void;
    onModuleRemoved?(adapter: ModuleAdapter): void;
    onConnectionAdded?(adapter: ModuleConnectionAdapter): void;
    onConnectionRemoved?(adapter: ModuleConnectionAdapter): void;
}
export declare class ModularAdapter implements BoxAdapter {
    #private;
    constructor(context: BoxAdaptersContext, box: ModularBox);
    catchupAndSubscribe(listener: ModularSystemListener): Subscription;
    get box(): ModularBox;
    get address(): Address;
    get uuid(): UUID.Bytes;
    get editingField(): Field<Pointers.Editing>;
    get labelField(): StringField;
    get modules(): ReadonlyArray<ModuleAdapter>;
    get connections(): ReadonlyArray<ModuleConnectionAdapter>;
    get device(): ModularDeviceBoxAdapter;
    terminate(): void;
}
//# sourceMappingURL=modular.d.ts.map