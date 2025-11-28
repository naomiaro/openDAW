import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Field, BooleanField, StringField, UnreferenceableType } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type AudioBusBoxFields = {
    1: PointerField<Pointers.AudioBusses>;
    2: PointerField<Pointers.AudioOutput>;
    3: Field<Pointers.AudioOutput>;
    4: BooleanField;
    5: StringField;
    6: StringField;
    7: StringField;
    8: BooleanField;
};
export declare class AudioBusBox extends Box<UnreferenceableType, AudioBusBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<AudioBusBox>): AudioBusBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get collection(): PointerField<Pointers.AudioBusses>;
    get output(): PointerField<Pointers.AudioOutput>;
    get input(): Field<Pointers.AudioOutput>;
    get enabled(): BooleanField;
    get icon(): StringField;
    get label(): StringField;
    get color(): StringField;
    get minimized(): BooleanField;
    initializeFields(): AudioBusBoxFields;
}
//# sourceMappingURL=AudioBusBox.d.ts.map