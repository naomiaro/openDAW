import { Maybe } from "./lang";
export declare namespace Strings {
    const hyphenToCamelCase: (value: string) => string;
    const fallback: (value: Maybe<string>, fallback: string) => string;
    const endsWithDigit: (str: string) => boolean;
    const nonEmpty: (str: Maybe<string>, fallback: string) => string;
    const toArrayBuffer: (str: string) => ArrayBuffer;
    const getUniqueName: (existingNames: ReadonlyArray<string>, desiredName: string) => string;
}
//# sourceMappingURL=strings.d.ts.map