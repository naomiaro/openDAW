export declare namespace Errors {
    class Warning extends Error {
    }
    const warn: (issue: string) => never;
    class FileNotFound extends Error {
        constructor(path: string);
    }
    const AbortError: Readonly<DOMException> | {
        name: string;
        message: string;
    };
    const isAbort: (error: unknown) => error is {
        name: string;
        message: string;
    };
    const CatchAbort: (error: unknown) => undefined;
    const isOverconstrained: (error: unknown) => error is {
        constraint: string;
    };
    const isDOMException: (error: unknown) => error is {
        name: string;
        message: string;
    };
    const toString: (error: unknown) => string;
}
//# sourceMappingURL=errors.d.ts.map