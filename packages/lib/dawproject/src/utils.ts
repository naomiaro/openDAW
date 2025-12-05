import {BooleanParameterSchema, RealParameterSchema, Unit} from "./defaults"
import {Xml} from "@naomiarotest/lib-xml"
import {asDefined} from "@naomiarotest/lib-std"
import {semitoneToHz} from "@naomiarotest/lib-dsp"

export namespace ParameterEncoder {
    export const bool = (id: string, value: boolean, name?: string) => Xml.element({
        id, name, value
    }, BooleanParameterSchema)

    export const linear = (id: string, value: number, min?: number, max?: number, name?: string) => Xml.element({
        id, name, min, max, value, unit: Unit.LINEAR
    }, RealParameterSchema)

    export const normalized = (id: string, value: number, min?: number, max?: number, name?: string) => Xml.element({
        id, name, min, max, value, unit: Unit.NORMALIZED
    }, RealParameterSchema)
}

export namespace ParameterDecoder {
    export const readValue = (schema: RealParameterSchema): number => {
        if (schema.unit === Unit.LINEAR) {
            return schema.value
        } else if (schema.unit === Unit.NORMALIZED) {
            const min = asDefined(schema.min)
            const max = asDefined(schema.max)
            return (schema.value - min) / (max - min)
        } else if (schema.unit === Unit.SEMITONES) {
            return semitoneToHz(schema.value)
        }
        return schema.value
    }
}