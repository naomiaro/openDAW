import { int, unitValue } from "@opendaw/lib-std";
export declare class Adsr {
    #private;
    constructor(sampleRate: number);
    get gate(): boolean;
    get complete(): boolean;
    get value(): number;
    get phase(): number;
    set(attack: number, decay: number, sustain: unitValue, release: number): void;
    gateOn(): void;
    gateOff(): void;
    forceStop(): void;
    process(output: Float32Array, fromIndex: int, toIndex: int): void;
}
//# sourceMappingURL=adsr.d.ts.map