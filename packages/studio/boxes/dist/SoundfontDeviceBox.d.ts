import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, StringField, BooleanField, Int32Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type SoundfontDeviceBoxFields = {
    1: PointerField<Pointers.InstrumentHost>;
    2: StringField;
    3: StringField;
    4: BooleanField;
    5: BooleanField;
    10: PointerField<Pointers.SoundfontFile>;
    11: Int32Field;
};
export declare class SoundfontDeviceBox extends Box<Pointers.Device | Pointers.Selection, SoundfontDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<SoundfontDeviceBox>): SoundfontDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.InstrumentHost>;
    get label(): StringField;
    get icon(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get file(): PointerField<Pointers.SoundfontFile>;
    get presetIndex(): Int32Field;
    initializeFields(): SoundfontDeviceBoxFields;
}
//# sourceMappingURL=SoundfontDeviceBox.d.ts.map