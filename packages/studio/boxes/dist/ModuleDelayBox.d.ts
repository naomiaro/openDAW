import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, Field, Float32Field } from "@opendaw/lib-box";
import { ModuleAttributes } from "./ModuleAttributes";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type ModuleDelayBoxFields = {
    1: ModuleAttributes;
    10: Field<Pointers.VoltageConnection>;
    11: Field<Pointers.VoltageConnection>;
    20: Float32Field<Pointers.ParameterController>;
};
export declare class ModuleDelayBox extends Box<Pointers.Selection, ModuleDelayBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<ModuleDelayBox>): ModuleDelayBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get attributes(): ModuleAttributes;
    get voltageInput(): Field<Pointers.VoltageConnection>;
    get voltageOutput(): Field<Pointers.VoltageConnection>;
    get time(): Float32Field<Pointers.ParameterController>;
    initializeFields(): ModuleDelayBoxFields;
}
//# sourceMappingURL=ModuleDelayBox.d.ts.map