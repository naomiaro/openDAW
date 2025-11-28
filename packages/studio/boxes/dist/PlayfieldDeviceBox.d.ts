import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, StringField, BooleanField, Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type PlayfieldDeviceBoxFields = {
    1: PointerField<Pointers.InstrumentHost>;
    2: StringField;
    3: StringField;
    4: BooleanField;
    5: BooleanField;
    10: Field<Pointers.Sample>;
};
export declare class PlayfieldDeviceBox extends Box<Pointers.Device | Pointers.Selection, PlayfieldDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<PlayfieldDeviceBox>): PlayfieldDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.InstrumentHost>;
    get label(): StringField;
    get icon(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get samples(): Field<Pointers.Sample>;
    initializeFields(): PlayfieldDeviceBoxFields;
}
//# sourceMappingURL=PlayfieldDeviceBox.d.ts.map