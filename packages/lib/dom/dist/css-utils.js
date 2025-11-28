import { panic } from "@opendaw/lib-std";
export var CssUtils;
(function (CssUtils) {
    CssUtils.calc = (term, size, em) => {
        const regex = /([0-9]*\.?[0-9]+)([a-zA-Z%]*)/g;
        let result = term;
        result.split(/\+|(?<!\d)-/)
            .flatMap(result => Array.from(result.matchAll(regex)))
            .forEach(([replace, digits, unit]) => {
            const number = parseFloat(digits);
            if (isNaN(number)) {
                return panic(`${replace} does not contain a number`);
            }
            if (unit === "em") {
                result = result.replaceAll(replace, `${number * em}`);
            }
            else if (unit === "%") {
                result = result.replaceAll(replace, `${number / 100.0 * size}`);
            }
            else if (unit === "px") {
                result = result.replaceAll(replace, `${number}`);
            }
            else {
                return panic(`Unknown unit '${unit}'`);
            }
        });
        return Function(`return ${result}`)();
    };
    const customCursors = new Map();
    CssUtils.registerCustomCursor = (identifier, data) => customCursors.set(identifier, data);
    CssUtils.setCursor = (identifier, doc = document) => {
        doc.documentElement.style.cursor = typeof identifier === "number"
            ? customCursors.get(identifier) ?? "auto"
            : identifier;
    };
})(CssUtils || (CssUtils = {}));
