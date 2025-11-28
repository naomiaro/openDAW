import { BooleanParameterSchema, RealParameterSchema } from "./defaults";
export declare namespace ParameterEncoder {
    const bool: (id: string, value: boolean, name?: string) => BooleanParameterSchema;
    const linear: (id: string, value: number, min?: number, max?: number, name?: string) => RealParameterSchema;
    const normalized: (id: string, value: number, min?: number, max?: number, name?: string) => RealParameterSchema;
}
export declare namespace ParameterDecoder {
    const readValue: (schema: RealParameterSchema) => number;
}
//# sourceMappingURL=utils.d.ts.map