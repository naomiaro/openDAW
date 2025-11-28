import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, Field, Float32Field } from "@opendaw/lib-box";
import { ModuleAttributes } from "./ModuleAttributes";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type ModuleGainBoxFields = {
    1: ModuleAttributes;
    10: Field<Pointers.VoltageConnection>;
    12: Field<Pointers.VoltageConnection>;
    20: Float32Field<Pointers.ParameterController>;
};
export declare class ModuleGainBox extends Box<Pointers.Selection, ModuleGainBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<ModuleGainBox>): ModuleGainBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get attributes(): ModuleAttributes;
    get voltageInput(): Field<Pointers.VoltageConnection>;
    get voltageOutput(): Field<Pointers.VoltageConnection>;
    get gain(): Float32Field<Pointers.ParameterController>;
    initializeFields(): ModuleGainBoxFields;
}
//# sourceMappingURL=ModuleGainBox.d.ts.map