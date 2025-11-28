import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class UploadFileBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new UploadFileBox({
            uuid,
            graph,
            name: "UploadFileBox",
            pointerRules: NoPointers,
        }), constructor);
    }
    static ClassName = "UploadFileBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitUploadFileBox, this);
    }
    get user() {
        return this.getField(1);
    }
    get file() {
        return this.getField(2);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "user",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.FileUploadState, true),
            2: PointerField.create({
                parent: this,
                fieldKey: 2,
                fieldName: "file",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.FileUploadState, true),
        };
    }
}
