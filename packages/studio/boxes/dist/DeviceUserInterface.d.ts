import "@opendaw/lib-std";
import { ObjectField, FieldConstruct, Field, UnreferenceableType } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export type DeviceUserInterfaceFields = {
    1: Field<Pointers.DeviceUserInterface>;
};
export declare class DeviceUserInterface extends ObjectField<DeviceUserInterfaceFields> {
    static create(construct: FieldConstruct<UnreferenceableType>): DeviceUserInterface;
    private constructor();
    get elements(): Field<Pointers.DeviceUserInterface>;
    initializeFields(): DeviceUserInterfaceFields;
}
//# sourceMappingURL=DeviceUserInterface.d.ts.map