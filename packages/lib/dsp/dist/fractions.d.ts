import { int } from "@opendaw/lib-std";
import { ppqn } from "./ppqn";
export type Fraction = Readonly<[int, int]>;
export declare namespace Fraction {
    export const builder: () => Builder;
    export const toDouble: ([n, d]: Fraction) => number;
    export const toPPQN: ([n, d]: Fraction) => ppqn;
    class Builder {
        #private;
        add(fraction: Fraction): this;
        asArray(): ReadonlyArray<Fraction>;
        asAscendingArray(): ReadonlyArray<Fraction>;
        asDescendingArray(): ReadonlyArray<Fraction>;
    }
    export {};
}
//# sourceMappingURL=fractions.d.ts.map