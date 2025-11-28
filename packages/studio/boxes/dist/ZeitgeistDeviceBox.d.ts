import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, StringField, BooleanField } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type ZeitgeistDeviceBoxFields = {
    1: PointerField<Pointers.MidiEffectHost>;
    2: Int32Field;
    3: StringField;
    4: BooleanField;
    5: BooleanField;
    10: PointerField<Pointers.Groove>;
};
export declare class ZeitgeistDeviceBox extends Box<Pointers.Device | Pointers.Selection, ZeitgeistDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<ZeitgeistDeviceBox>): ZeitgeistDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.MidiEffectHost>;
    get index(): Int32Field;
    get label(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get groove(): PointerField<Pointers.Groove>;
    initializeFields(): ZeitgeistDeviceBoxFields;
}
//# sourceMappingURL=ZeitgeistDeviceBox.d.ts.map