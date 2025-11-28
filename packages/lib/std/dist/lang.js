// noinspection JSUnusedGlobalSymbols
export const identity = (value) => value;
export const isDefined = (value) => value !== undefined && value !== null;
export const isNull = (value) => value === null;
export const isNotNull = (value) => value !== null;
export const isUndefined = (value) => value === undefined;
export const isNotUndefined = (value) => value !== undefined;
export const isAbsent = (value) => value === undefined || value === null;
export const ifDefined = (value, procedure) => value !== undefined && value !== null ? procedure(value) : undefined;
export const asDefined = (value, fail = "asDefined failed") => value === null || value === undefined ? panic(getOrProvide(fail)) : value;
export const isInstanceOf = (obj, clazz) => obj instanceof clazz;
export const asInstanceOf = (obj, clazz) => obj instanceof clazz ? obj : panic(`${obj} is not instance of ${clazz}`);
export const assertInstanceOf = (obj, clazz) => {
    if (!(obj instanceof clazz)) {
        panic(`${obj} is not instance of ${clazz}`);
    }
};
export const isSameClass = (a, b) => a.constructor === b.constructor;
export const tryProvide = (provider) => {
    try {
        return provider();
    }
    catch (reason) {
        return panic(String(reason));
    }
};
export const getOrProvide = (value) => value instanceof Function ? value() : value;
export const safeWrite = (object, property, value) => property in object ? object[property] = value : undefined;
export const safeExecute = (func, ...args) => func?.apply(null, args);
export const isRecord = (value) => isDefined(value) && typeof value === "object";
export const hasField = (record, key, type) => {
    if (!(key in record))
        return false;
    const value = record[key];
    return type === "null" ? value === null : typeof value === type;
};
export const safeRead = (object, ...keys) => {
    let current = object;
    for (const key of keys) {
        if (!isRecord(current) || !(key in current)) {
            return undefined;
        }
        current = current[key];
    }
    return current;
};
export const Unhandled = (empty) => { throw new Error(`Unhandled ${empty}`); };
export const panic = (issue) => {
    throw typeof issue === "string" ? new Error(issue) : issue;
};
export const assert = (condition, fail) => condition ? undefined : panic(getOrProvide(fail));
export const checkIndex = (index, array) => index >= 0 && index < array.length ? index : panic(`Index ${index} is out of bounds`);
export const InaccessibleProperty = (failMessage) => new Proxy({}, { get() { return panic(failMessage); } });
export const canWrite = (obj, key) => {
    while (isDefined(obj)) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        if (isDefined(descriptor)) {
            return typeof descriptor.set === "function";
        }
        obj = Object.getPrototypeOf(obj);
    }
    return false;
};
export const requireProperty = (object, key) => {
    const { status, value } = tryCatch(() => object instanceof Function ? object.name : object.constructor.name);
    const feature = status === "failure" ? `${object}.${String(key)}` : `${value}.${String(key)}`;
    console.debug(`%c${feature}%c available`, "color: hsl(200, 83%, 60%)", "color: inherit");
    if (!(key in object)) {
        throw feature;
    }
};
export class SuccessResult {
    value;
    status = "success";
    constructor(value) {
        this.value = value;
    }
    error = InaccessibleProperty("Cannot access error when succeeded");
}
export class FailureResult {
    error;
    status = "failure";
    constructor(error) {
        this.error = error;
    }
    value = InaccessibleProperty("Cannot access value when failed");
}
export const tryCatch = (statement) => {
    try {
        return new SuccessResult(statement());
    }
    catch (error) {
        return new FailureResult(error);
    }
};
export const isValidIdentifier = (identifier) => /^[A-Za-z_$][A-Za-z0-9_]*$/.test(identifier);
export const asValidIdentifier = (identifier) => isValidIdentifier(identifier) ? identifier : panic(`'${identifier}' is not a valid identifier`);
export const asEnumValue = (value, enm) => {
    const keys = Object.keys(enm);
    if (keys.length === 0)
        return panic("Empty enum object (are you using `const enum`?)");
    const values = Object.keys(enm)
        .filter(k => isNaN(Number(k)))
        .map(k => enm[k]);
    return values.includes(value) ? value : panic(`Invalid enum value: ${String(value)}`);
};
export const EmptyExec = () => { };
export const EmptyProvider = () => { };
export const EmptyProcedure = (_) => { };
