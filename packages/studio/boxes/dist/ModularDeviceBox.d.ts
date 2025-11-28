import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, StringField, BooleanField } from "@opendaw/lib-box";
import { DeviceUserInterface } from "./DeviceUserInterface";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type ModularDeviceBoxFields = {
    1: PointerField<Pointers.AudioEffectHost>;
    2: Int32Field;
    3: StringField;
    4: BooleanField;
    5: BooleanField;
    10: PointerField<Pointers.ModularSetup>;
    11: DeviceUserInterface;
};
export declare class ModularDeviceBox extends Box<Pointers.Device | Pointers.Selection, ModularDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<ModularDeviceBox>): ModularDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.AudioEffectHost>;
    get index(): Int32Field;
    get label(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get modularSetup(): PointerField<Pointers.ModularSetup>;
    get userInterface(): DeviceUserInterface;
    initializeFields(): ModularDeviceBoxFields;
}
//# sourceMappingURL=ModularDeviceBox.d.ts.map