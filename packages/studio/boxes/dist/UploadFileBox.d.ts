import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, UnreferenceableType } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type UploadFileBoxFields = {
    1: PointerField<Pointers.FileUploadState>;
    2: PointerField<Pointers.FileUploadState>;
};
export declare class UploadFileBox extends Box<UnreferenceableType, UploadFileBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<UploadFileBox>): UploadFileBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get user(): PointerField<Pointers.FileUploadState>;
    get file(): PointerField<Pointers.FileUploadState>;
    initializeFields(): UploadFileBoxFields;
}
//# sourceMappingURL=UploadFileBox.d.ts.map