import { int } from "@opendaw/lib-std";
import { ppqn } from "./ppqn";
export declare class Fragmentor {
    static iterate(p0: ppqn, p1: ppqn, stepSize: ppqn): Generator<ppqn>;
    static iterateWithIndex(p0: ppqn, p1: ppqn, stepSize: ppqn): Generator<{
        position: ppqn;
        index: int;
    }>;
}
//# sourceMappingURL=fragmentor.d.ts.map