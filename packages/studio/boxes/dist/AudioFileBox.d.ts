import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, Float32Field, StringField } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type AudioFileBoxFields = {
    1: Float32Field;
    2: Float32Field;
    3: StringField;
};
export declare class AudioFileBox extends Box<Pointers.AudioFile | Pointers.FileUploadState, AudioFileBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<AudioFileBox>): AudioFileBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get startInSeconds(): Float32Field;
    get endInSeconds(): Float32Field;
    get fileName(): StringField;
    initializeFields(): AudioFileBoxFields;
}
//# sourceMappingURL=AudioFileBox.d.ts.map