import { isDefined } from "./lang";
export var Strings;
(function (Strings) {
    Strings.hyphenToCamelCase = (value) => value
        .replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    Strings.fallback = (value, fallback) => isDefined(value) && value.length > 0 ? value : fallback;
    Strings.endsWithDigit = (str) => /\d$/.test(str);
    Strings.nonEmpty = (str, fallback) => isDefined(str) && str.trim().length > 0 ? str : fallback;
    // UTF-8
    Strings.toArrayBuffer = (str) => {
        const buffer = new ArrayBuffer(str.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < str.length; i++) {
            view[i] = str.charCodeAt(i);
        }
        return buffer;
    };
    Strings.getUniqueName = (existingNames, desiredName) => {
        const existingSet = new Set(existingNames);
        let test = desiredName;
        let counter = 1;
        if (existingSet.has(desiredName) || existingSet.has(`${desiredName} 1`)) {
            counter = 2;
        }
        else {
            return desiredName;
        }
        while (existingSet.has(test = `${desiredName} ${counter++}`)) { }
        return test;
    };
})(Strings || (Strings = {}));
