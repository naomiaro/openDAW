import "@opendaw/lib-std";
import { ObjectField, FieldConstruct, StringField, UnreferenceableType } from "@opendaw/lib-box";
export type DeviceFields = {
    1: StringField;
    2: StringField;
};
export declare class Device extends ObjectField<DeviceFields> {
    static create(construct: FieldConstruct<UnreferenceableType>): Device;
    private constructor();
    get id(): StringField;
    get label(): StringField;
    initializeFields(): DeviceFields;
}
//# sourceMappingURL=Device.d.ts.map