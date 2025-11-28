import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, StringField, Int32Field, Float32Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type CaptureAudioBoxFields = {
    1: StringField;
    2: StringField;
    10: Int32Field;
    11: Float32Field;
};
export declare class CaptureAudioBox extends Box<Pointers.Capture, CaptureAudioBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<CaptureAudioBox>): CaptureAudioBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get deviceId(): StringField;
    get recordMode(): StringField;
    get requestChannels(): Int32Field;
    get gainDb(): Float32Field;
    initializeFields(): CaptureAudioBoxFields;
}
//# sourceMappingURL=CaptureAudioBox.d.ts.map