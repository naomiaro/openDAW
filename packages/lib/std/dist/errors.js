import { hasField, isRecord, panic } from "./lang";
export var Errors;
(function (Errors) {
    class Warning extends Error {
    }
    Errors.Warning = Warning;
    // Should be handled more gracefully from the user-interface
    Errors.warn = (issue) => { throw new Warning(issue); };
    class FileNotFound extends Error {
        constructor(path) { super(`${path} not found`); }
    }
    Errors.FileNotFound = FileNotFound;
    Errors.AbortError = typeof DOMException === "undefined"
        ? { name: "AbortError", message: "" } : Object.freeze(new DOMException("AbortError"));
    Errors.isAbort = (error) => error === Errors.AbortError || (Errors.isDOMException(error) && error.name === "AbortError");
    Errors.CatchAbort = (error) => error === Errors.AbortError ? undefined : panic(error);
    // https://developer.mozilla.org/en-US/docs/Web/API/OverconstrainedError is not available in Firefox and Gecko
    Errors.isOverconstrained = (error) => isRecord(error) && "constraint" in error;
    Errors.isDOMException = (error) => isRecord(error) &&
        hasField(error, "name", "string") &&
        hasField(error, "message", "string");
    Errors.toString = (error) => {
        const truncateStack = (stack) => stack.split("\n").slice(0, 4).join("\n");
        if (error instanceof Error) {
            return truncateStack(error.stack || error.message);
        }
        if (typeof error === "string") {
            return error;
        }
        if (error && typeof error === "object") {
            const err = error;
            if (err.stack) {
                return truncateStack(err.stack);
            }
            if (err.message) {
                return err.message;
            }
            try {
                return JSON.stringify(error, null, 2);
            }
            catch {
            }
        }
        return String(error);
    };
})(Errors || (Errors = {}));
