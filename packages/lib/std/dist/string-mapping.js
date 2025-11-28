import { isDefined } from "./lang";
import { clamp } from "./math";
export var StringMapping;
(function (StringMapping) {
    StringMapping.percent = ({ bipolar, fractionDigits } = {}) => new Numeric("%", fractionDigits, false, bipolar);
    StringMapping.numeric = ({ unit, fractionDigits, unitPrefix, bipolar } = {}) => new Numeric(unit, fractionDigits, unitPrefix, bipolar);
    StringMapping.indices = (unit, values) => new class {
        x(y) {
            return { unit, value: values[y] };
        }
        y(x) {
            const index = values.indexOf(x);
            return index === -1 ? { type: "unknown", value: "💣" } : { type: "explicit", value: index };
        }
    };
    StringMapping.values = (unit, values, strings) => new class {
        x(y) {
            return { unit, value: strings.at(values.indexOf(y)) ?? "N/A" };
        }
        y(x) {
            const index = strings.indexOf(x);
            return index === -1 ? { type: "unknown", value: "💣" } : { type: "explicit", value: values[index] };
        }
    };
    StringMapping.bool = new class {
        y(x) {
            switch (x.trim()) {
                case "on":
                case "yes":
                case "true":
                    return { type: "explicit", value: true };
                default:
                    return { type: "explicit", value: false };
            }
        }
        x(y) {
            return { value: y ? "On" : "Off", unit: "" };
        }
    };
    StringMapping.boolValues = (falseValue, trueValue) => new class {
        y(x) {
            switch (x.trim()) {
                case trueValue:
                case "on":
                case "yes":
                case "true":
                    return { type: "explicit", value: true };
                case falseValue:
                default:
                    return { type: "explicit", value: false };
            }
        }
        x(y) {
            return { value: y ? "On" : "Off", unit: "" };
        }
    };
    class Numeric {
        #unit;
        #fractionDigits;
        #unitPrefix;
        #bipolar;
        constructor(unit, fractionDigits, unitPrefix, bipolar) {
            this.#unit = unit ?? "";
            this.#fractionDigits = fractionDigits ?? 0;
            this.#unitPrefix = unitPrefix ?? false;
            this.#bipolar = bipolar ?? false;
        }
        y(x) {
            let value = x.trim();
            const float = parseFloat(value);
            if (isNaN(float)) {
                return { type: "unknown", value: value };
            }
            else if (this.#unit === "%") {
                return {
                    type: "explicit",
                    value: float / 100.0
                };
            }
            else if (value.endsWith("%")) {
                return {
                    type: "unitValue",
                    value: this.#bipolar
                        ? clamp(float / 200.0 + 0.5, 0.0, 1.0)
                        : clamp(float / 100.0, 0.0, 1.0)
                };
            }
            else {
                if (value.endsWith(this.#unit) && this.#unit.length > 0) {
                    // remove unit
                    value = value.slice(0, -this.#unit.length);
                }
                const regex = /(\d+)(\D+)/;
                const match = regex.exec(value);
                const last = match?.at(2)?.at(0);
                if (isDefined(last)) {
                    const index = prefixes.indexOf(last);
                    if (index > -1) {
                        return { type: "explicit", value: float * Math.pow(10.0, (index - 4) * 3.0) };
                    }
                }
                return { type: "explicit", value: float };
            }
        }
        x(y) {
            if (Number.isNaN(y)) {
                return { value: "💣", unit: this.#unit };
            }
            else if (Number.isFinite(y)) {
                if (this.#unit === "%") {
                    return this.#bipolar
                        ? { value: (y * 200 - 100).toFixed(this.#fractionDigits), unit: this.#unit }
                        : { value: (y * 100).toFixed(this.#fractionDigits), unit: this.#unit };
                }
                if (this.#unitPrefix) {
                    const { value, prefix } = computePrefix(y);
                    return { value: value.toFixed(this.#fractionDigits), unit: `${prefix}${this.#unit}` };
                }
                else {
                    return { value: y.toFixed(this.#fractionDigits), unit: this.#unit };
                }
            }
            else {
                return { value: y === Number.POSITIVE_INFINITY ? "∞" : "-∞", unit: this.#unit };
            }
        }
    }
    const prefixes = Object.freeze(["p", "n", "μ", "m", "", "k", "M", "G", "T"]);
    // this magic number rounds the result perfectly to integers, while the mathematically correct 10 doesn't:
    // computeBase10(1000) = 3
    // computeBase10(0.001) = -3
    const computeBase10 = (value) => Math.log(value) / Math.log(9.999999999999999);
    const computePrefix = (value) => {
        const location = Math.floor(computeBase10(value) / 3.0);
        const prefix = prefixes[location + 4];
        return isDefined(prefix) ? { value: value * Math.pow(10.0, location * -3.0), prefix } : { value, prefix: "" };
    };
    StringMapping.decible = StringMapping.numeric({ unit: "db", fractionDigits: 1 });
    StringMapping.panning = StringMapping.percent({ unit: "%", fractionDigits: 0 });
})(StringMapping || (StringMapping = {}));
