import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, StringField, BooleanField } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type UnknownAudioEffectDeviceBoxFields = {
    1: PointerField<Pointers.AudioEffectHost>;
    2: Int32Field;
    3: StringField;
    4: BooleanField;
    5: BooleanField;
    10: StringField;
};
export declare class UnknownAudioEffectDeviceBox extends Box<Pointers.Device | Pointers.Selection, UnknownAudioEffectDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<UnknownAudioEffectDeviceBox>): UnknownAudioEffectDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.AudioEffectHost>;
    get index(): Int32Field;
    get label(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get comment(): StringField;
    initializeFields(): UnknownAudioEffectDeviceBoxFields;
}
//# sourceMappingURL=UnknownAudioEffectDeviceBox.d.ts.map