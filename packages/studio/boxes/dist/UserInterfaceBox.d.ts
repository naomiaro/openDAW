import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Field, UnreferenceableType } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type UserInterfaceBoxFields = {
    1: PointerField<Pointers.User>;
    10: Field<Pointers.Selection>;
    11: Field<Pointers.FileUploadState>;
    21: PointerField<Pointers.Editing>;
    22: PointerField<Pointers.Editing>;
    23: PointerField<Pointers.Editing>;
};
export declare class UserInterfaceBox extends Box<UnreferenceableType, UserInterfaceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<UserInterfaceBox>): UserInterfaceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get root(): PointerField<Pointers.User>;
    get selection(): Field<Pointers.Selection>;
    get uploadStates(): Field<Pointers.FileUploadState>;
    get editingDeviceChain(): PointerField<Pointers.Editing>;
    get editingTimelineRegion(): PointerField<Pointers.Editing>;
    get editingModularSystem(): PointerField<Pointers.Editing>;
    initializeFields(): UserInterfaceBoxFields;
}
//# sourceMappingURL=UserInterfaceBox.d.ts.map