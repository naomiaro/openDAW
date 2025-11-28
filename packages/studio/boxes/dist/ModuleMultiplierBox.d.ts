import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, Field, Float32Field } from "@opendaw/lib-box";
import { ModuleAttributes } from "./ModuleAttributes";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type ModuleMultiplierBoxFields = {
    1: ModuleAttributes;
    10: Field<Pointers.VoltageConnection>;
    11: Field<Pointers.VoltageConnection>;
    12: Field<Pointers.VoltageConnection>;
    20: Float32Field;
};
export declare class ModuleMultiplierBox extends Box<Pointers.Selection, ModuleMultiplierBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<ModuleMultiplierBox>): ModuleMultiplierBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get attributes(): ModuleAttributes;
    get voltageInputX(): Field<Pointers.VoltageConnection>;
    get voltageInputY(): Field<Pointers.VoltageConnection>;
    get voltageOutput(): Field<Pointers.VoltageConnection>;
    get multiplier(): Float32Field;
    initializeFields(): ModuleMultiplierBoxFields;
}
//# sourceMappingURL=ModuleMultiplierBox.d.ts.map