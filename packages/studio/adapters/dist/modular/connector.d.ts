import { Pointers } from "@opendaw/studio-enums";
import { Address, Field } from "@opendaw/lib-box";
import { BoxAdapters } from "../BoxAdapters";
import { ModuleConnectionAdapter } from "./connection";
export declare enum Direction {
    Input = "input",
    Output = "output"
}
export declare class ModuleConnectorAdapter<CONNECTION_TYPE extends Pointers, Direction> {
    #private;
    static create<CONNECTION_TYPE extends Pointers, Direction>(boxAdapters: BoxAdapters, field: Field<CONNECTION_TYPE>, direction: Direction, name?: string): ModuleConnectorAdapter<CONNECTION_TYPE, Direction>;
    private constructor();
    matches(other: ModuleConnectorAdapter<any, any>): boolean;
    get connections(): ReadonlyArray<ModuleConnectionAdapter>;
    get field(): Field<CONNECTION_TYPE>;
    get address(): Address;
    get direction(): Direction;
    get name(): string;
    toString(): string;
}
//# sourceMappingURL=connector.d.ts.map