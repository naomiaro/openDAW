import { DataInput, DataOutput } from "./data";
import { int } from "./lang";
/**
 * Schema defines a fixed structure for numbers and boolean
 */
export declare namespace Schema {
    type Schema<T> = {
        [K in keyof T]: (Serializer<T[K]> | Schema<T[K]>);
    };
    abstract class Serializer<T> {
        abstract read(input: DataInput, previousValue: T): T;
        abstract write(output: DataOutput, value: T): void;
        abstract initialValue(): T;
    }
    export const createBuilder: <T>(schema: Readonly<Schema<T>>) => () => IO<T>;
    export const bool: {
        read(input: DataInput): boolean;
        write(output: DataOutput, value: boolean): void;
        initialValue(): boolean;
    };
    export const int8: {
        read(input: DataInput): number;
        write(output: DataOutput, value: number): void;
        initialValue(): number;
    };
    export const int16: {
        read(input: DataInput): number;
        write(output: DataOutput, value: number): void;
        initialValue(): number;
    };
    export const int32: {
        read(input: DataInput): number;
        write(output: DataOutput, value: number): void;
        initialValue(): number;
    };
    export const float: {
        read(input: DataInput): number;
        write(output: DataOutput, value: number): void;
        initialValue(): number;
    };
    export const double: {
        read(input: DataInput): number;
        write(output: DataOutput, value: number): void;
        initialValue(): number;
    };
    export const int64: {
        read(input: DataInput): bigint;
        write(output: DataOutput, value: bigint): void;
        initialValue(): bigint;
    };
    export const floats: (length: int) => {
        read(input: DataInput, values: Float32Array): Float32Array;
        write(output: DataOutput, values: Float32Array): void;
        initialValue(): Float32Array;
    };
    export const doubles: (length: int) => {
        read(input: DataInput, values: Float64Array): Float64Array;
        write(output: DataOutput, values: Float64Array): void;
        initialValue(): Float64Array;
    };
    export interface IO<T> {
        read(input: DataInput): void;
        write(output: DataOutput): void;
        get object(): T;
        get bytesTotal(): int;
    }
    export {};
}
//# sourceMappingURL=schema.d.ts.map