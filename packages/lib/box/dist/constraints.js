export var Constraints;
(function (Constraints) {
    // TODO There are many challenges to be solved. One is project-migration:
    //  Old values might be out of range now!
    Constraints.clampInt32 = (constraint, value) => {
        // TODO
        /*if (constraint === "any") {
            return value
        } else if (constraint === "index" || constraint === "non-negative") {
            assert(value >= 0, () => `value(${value}) must be non-negative`)
        } else if (constraint === "positive") {
            assert(value > 0, () => `value(${value}) must be positive`)
        } else if (typeof constraint === "object") {
            if ("min" in constraint && "max" in constraint) {
                assert(constraint.min <= value && value <= constraint.max,
                    () => `value(${value}) must be in minmax(${constraint.min}, ${constraint.max})`)
            } else if ("values" in constraint) {
                assert(constraint.values.includes(value),
                    () => `value(${value}) must be in values(${constraint.values.join(", ")})`)
            } else if ("length" in constraint) {
                assert(value >= 0 && value < constraint.length,
                    () => `value(${value}) must be non-negative and lower then length(${constraint.length})`)
            }
        }*/
        return value;
    };
    Constraints.clampFloat32 = (constraint, value) => {
        // TODO
        /*if (constraint === "any") {
            return value
        } else if (constraint === "unipolar") {
            assert(value >= 0 && value <= 1, () => `value(${value}) must be in [0, 1]`)
        } else if (constraint === "bipolar") {
            assert(value >= -1 && value <= 1, () => `value(${value}) must be in [-1, 1]`)
        } else if (constraint === "decibel") {
            assert(value <= 0.0, () => `value(${value}) must be in [-INFINITY, 0]`)
        } else if (constraint === "non-negative") {
            assert(value >= 0, () => `value(${value}) must be non-negative`)
        } else if (constraint === "positive") {
            assert(value > 0, () => `value(${value}) must be positive`)
        } else if (typeof constraint === "object") {
            if ("min" in constraint && "max" in constraint) {
                assert(constraint.min <= value && value <= constraint.max,
                    () => `value(${value}) must be in minmax(${constraint.min}, ${constraint.max})`)
            }
        }*/
        return value;
    };
})(Constraints || (Constraints = {}));
