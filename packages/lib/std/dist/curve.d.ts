import { int, unitValue } from "./lang";
/**
 * original: http://werner.yellowcouch.org/Papers/fastenv12/index.html
 */
export declare namespace Curve {
    interface Definition {
        slope: unitValue;
        steps: int;
        y0: number;
        y1: number;
    }
    interface Coefficients {
        m: number;
        q: number;
    }
    const valueAt: ({ slope, steps, y0, y1 }: Definition, x: number) => number;
    const normalizedAt: (x: unitValue, slope: unitValue) => unitValue;
    const inverseAt: (y: unitValue, slope: unitValue) => unitValue;
    const coefficients: (definition: Definition) => Coefficients;
    function walk(slope: number, steps: int, y0: number, y1: number): Generator<number>;
    function walkNormalized(slope: number, steps: int): Generator<unitValue>;
    const byHalf: (steps: number, y0: number, ym: number, y1: number) => Definition;
    const slopeByHalf: (y0: number, ym: number, y1: number) => number;
}
//# sourceMappingURL=curve.d.ts.map