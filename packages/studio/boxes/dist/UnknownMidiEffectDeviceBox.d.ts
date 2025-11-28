import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, StringField, BooleanField } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type UnknownMidiEffectDeviceBoxFields = {
    1: PointerField<Pointers.MidiEffectHost>;
    2: Int32Field;
    3: StringField;
    4: BooleanField;
    5: BooleanField;
    10: StringField;
};
export declare class UnknownMidiEffectDeviceBox extends Box<Pointers.Device | Pointers.Selection, UnknownMidiEffectDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<UnknownMidiEffectDeviceBox>): UnknownMidiEffectDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.MidiEffectHost>;
    get index(): Int32Field;
    get label(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get comment(): StringField;
    initializeFields(): UnknownMidiEffectDeviceBoxFields;
}
//# sourceMappingURL=UnknownMidiEffectDeviceBox.d.ts.map