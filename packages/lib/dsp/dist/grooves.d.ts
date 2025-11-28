import { ppqn } from "./ppqn";
import { Bijective, FloatArray, unitValue } from "@opendaw/lib-std";
export interface GrooveFunction extends Bijective<unitValue, unitValue> {
}
export interface GroovePatternFunction extends GrooveFunction {
    duration(): ppqn;
}
export interface Groove {
    warp(position: ppqn): ppqn;
    unwarp(position: ppqn): ppqn;
}
export declare namespace Groove {
    const Identity: Groove;
}
export declare class GroovePattern implements Groove {
    #private;
    constructor(func: GroovePatternFunction);
    warp(position: ppqn): ppqn;
    unwarp(position: ppqn): ppqn;
}
export declare class QuantisedGrooveFunction implements GrooveFunction {
    #private;
    constructor(values: FloatArray);
    fx(x: unitValue): unitValue;
    fy(y: unitValue): unitValue;
}
export declare class GrooveChain implements Groove {
    #private;
    constructor(grooves: ReadonlyArray<Groove>);
    warp(position: ppqn): ppqn;
    unwarp(position: ppqn): ppqn;
}
//# sourceMappingURL=grooves.d.ts.map