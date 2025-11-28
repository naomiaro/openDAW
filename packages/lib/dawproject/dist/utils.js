import { BooleanParameterSchema, RealParameterSchema, Unit } from "./defaults";
import { Xml } from "@opendaw/lib-xml";
import { asDefined } from "@opendaw/lib-std";
import { semitoneToHz } from "@opendaw/lib-dsp";
export var ParameterEncoder;
(function (ParameterEncoder) {
    ParameterEncoder.bool = (id, value, name) => Xml.element({
        id, name, value
    }, BooleanParameterSchema);
    ParameterEncoder.linear = (id, value, min, max, name) => Xml.element({
        id, name, min, max, value, unit: Unit.LINEAR
    }, RealParameterSchema);
    ParameterEncoder.normalized = (id, value, min, max, name) => Xml.element({
        id, name, min, max, value, unit: Unit.NORMALIZED
    }, RealParameterSchema);
})(ParameterEncoder || (ParameterEncoder = {}));
export var ParameterDecoder;
(function (ParameterDecoder) {
    ParameterDecoder.readValue = (schema) => {
        if (schema.unit === Unit.LINEAR) {
            return schema.value;
        }
        else if (schema.unit === Unit.NORMALIZED) {
            const min = asDefined(schema.min);
            const max = asDefined(schema.max);
            return (schema.value - min) / (max - min);
        }
        else if (schema.unit === Unit.SEMITONES) {
            return semitoneToHz(schema.value);
        }
        return schema.value;
    };
})(ParameterDecoder || (ParameterDecoder = {}));
