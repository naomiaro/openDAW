import { panic } from "./lang";
export var Objects;
(function (Objects) {
    const Empty = Object.freeze({});
    Objects.empty = () => Empty;
    Objects.mergeNoOverlap = (u, v) => {
        const keys = new Set(Object.keys(u));
        for (const key of Object.keys(v)) {
            if (keys.has(key)) {
                return panic(`'${key}' is an overlapping key`);
            }
        }
        return ({ ...u, ...v });
    };
    Objects.include = (obj, ...keys) => {
        const out = {};
        for (const k of keys)
            out[k] = obj[k];
        return out;
    };
    Objects.exclude = (obj, ...keys) => {
        const exclude = new Set(keys);
        return Object.entries(obj).reduce((result, [key, value]) => {
            if (!exclude.has(key)) {
                result[key] = value;
            }
            return result;
        }, {});
    };
    Objects.overwrite = (target, patch) => Object.assign(target, patch);
})(Objects || (Objects = {}));
