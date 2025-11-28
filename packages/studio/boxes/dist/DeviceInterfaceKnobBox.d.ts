import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, Float32Field, StringField, UnreferenceableType } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type DeviceInterfaceKnobBoxFields = {
    1: PointerField<Pointers.DeviceUserInterface>;
    2: PointerField<Pointers.ParameterController>;
    3: Int32Field;
    10: Float32Field;
    11: StringField;
};
export declare class DeviceInterfaceKnobBox extends Box<UnreferenceableType, DeviceInterfaceKnobBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<DeviceInterfaceKnobBox>): DeviceInterfaceKnobBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get userInterface(): PointerField<Pointers.DeviceUserInterface>;
    get parameter(): PointerField<Pointers.ParameterController>;
    get index(): Int32Field;
    get anchor(): Float32Field;
    get color(): StringField;
    initializeFields(): DeviceInterfaceKnobBoxFields;
}
//# sourceMappingURL=DeviceInterfaceKnobBox.d.ts.map