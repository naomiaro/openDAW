import { int, unitValue } from "@opendaw/lib-std";
export declare class Delay {
    #private;
    constructor(maxFrames: int, interpolationLength: int);
    reset(): void;
    set offset(value: number);
    get offset(): number;
    set feedback(value: unitValue);
    get feedback(): unitValue;
    mix(wet: unitValue, dry: unitValue): void;
    process(input: Float32Array, output: Float32Array, fromIndex: int, toIndex: int): void;
}
//# sourceMappingURL=delay.d.ts.map