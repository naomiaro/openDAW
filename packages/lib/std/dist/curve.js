import { clamp } from "./math";
/**
 * original: http://werner.yellowcouch.org/Papers/fastenv12/index.html
 */
export var Curve;
(function (Curve) {
    const EPLISON = 1.0e-15;
    Curve.valueAt = ({ slope, steps, y0, y1 }, x) => Curve.normalizedAt(x / steps, slope) * (y1 - y0) + y0;
    // https://www.desmos.com/calculator/9lwjajcfkw
    Curve.normalizedAt = (x, slope) => {
        if (slope > 0.499999 && slope < 0.500001) {
            return x;
        }
        else {
            const p = clamp(slope, EPLISON, 1.0 - EPLISON);
            return (p * p) / (1.0 - p * 2.0) * (Math.pow((1.0 - p) / p, 2.0 * x) - 1.0);
        }
    };
    Curve.inverseAt = (y, slope) => {
        const p = clamp(slope, EPLISON, 1.0 - EPLISON);
        return Math.log((y * (1.0 - 2.0 * p) / (p * p)) + 1.0) / (2.0 * Math.log((1.0 - p) / p));
    };
    Curve.coefficients = (definition) => {
        const f1 = Curve.valueAt(definition, 1.0);
        const f2 = Curve.valueAt(definition, 2.0);
        const m = (f2 - f1) / (f1 - definition.y0);
        const q = f1 - m * definition.y0;
        return { m, q };
    };
    function* walk(slope, steps, y0, y1) {
        const { m, q } = Curve.coefficients({ slope, steps, y0, y1 });
        for (let i = 0, v = y0; i < steps; i++) {
            yield v = m * v + q;
        }
    }
    Curve.walk = walk;
    function* walkNormalized(slope, steps) {
        const d = 1.0 / steps;
        const f1 = Curve.normalizedAt(d, slope);
        const f2 = Curve.normalizedAt(2.0 * d, slope);
        const m = (f2 - f1) / f1;
        for (let i = 0, v = 0.0; i < steps; i++) {
            yield v = m * v + f1;
        }
    }
    Curve.walkNormalized = walkNormalized;
    Curve.byHalf = (steps, y0, ym, y1) => ({
        slope: Curve.slopeByHalf(y0, ym, y1), steps, y0, y1
    });
    Curve.slopeByHalf = (y0, ym, y1) => Math.abs(y1 - y0) < 0.000001 ? 0.5 : (ym - y0) / (y1 - y0);
})(Curve || (Curve = {}));
