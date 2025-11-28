import { asDefined, assert, Color, isDefined, panic, Rect } from "@opendaw/lib-std";
export var Html;
(function (Html) {
    Html.parse = (source) => {
        const template = document.createElement("div");
        template.innerHTML = source;
        if (template.childElementCount !== 1) {
            return panic(`Source html has more than one root elements: '${source}'`);
        }
        const child = template.firstChild;
        return child instanceof HTMLElement || child instanceof SVGSVGElement
            ? child
            : panic(`Cannot parse to HTMLOrSVGElement from '${source}'`);
    };
    Html.empty = (element) => { while (element.firstChild !== null) {
        element.firstChild.remove();
    } };
    Html.query = (selectors, parent = document) => asDefined(parent.querySelector(selectors));
    Html.queryAll = (selectors, parent = document) => Array.from(parent.querySelectorAll(selectors));
    Html.sanitize = (element) => {
        element.querySelectorAll("script").forEach(node => node.remove());
        element.querySelectorAll("*").forEach(element => {
            [...element.attributes].forEach(attribute => {
                if (attribute.name.toLowerCase().startsWith("on")) {
                    element.removeAttribute(attribute.name);
                }
            });
        });
    };
    Html.nextID = (() => {
        let id = 0 | 0;
        return () => (++id).toString(16).padStart(4, "0");
    })();
    Html.adoptStyleSheet = (classDefinition, prefix) => {
        assert(classDefinition.includes("component"), `No 'component' found in: ${classDefinition}`);
        const className = `${prefix ?? "C"}${Html.nextID()}`;
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(classDefinition.replaceAll("component", `.${className}`));
        if (sheet.cssRules.length === 0) {
            return panic(`No cssRules found in: ${classDefinition}`);
        }
        document.adoptedStyleSheets.push(sheet);
        return className;
    };
    // Allows conditional accumulation of classNames
    Html.buildClassList = (...input) => input.filter(x => x !== false && x !== undefined).join(" ");
    Html.readCssVarColor = (...cssValues) => {
        const element = document.createElement("div");
        document.body.appendChild(element);
        const colors = cssValues.map(value => {
            element.style.color = value;
            return Color.parseCssRgbOrRgba(getComputedStyle(element).color);
        });
        element.remove();
        return colors;
    };
    Html.watchResize = (target, callback, options) => {
        const observer = new ResizeObserver(([first], observer) => callback(first, observer));
        observer.observe(target, options);
        return { terminate: () => observer.disconnect() };
    };
    Html.watchIntersection = (target, callback, options) => {
        const observer = new IntersectionObserver(callback, options);
        observer.observe(target);
        return { terminate: () => observer.disconnect() };
    };
    // handles cases like 'display: contents', where the bounding box is always empty, although the children have dimensions
    Html.secureBoundingBox = (element) => {
        let elemRect = element.getBoundingClientRect();
        if (!Rect.isEmpty(elemRect)) {
            return elemRect;
        }
        for (const child of element.children) {
            Rect.union(elemRect, Html.secureBoundingBox(child));
        }
        return elemRect;
    };
    Html.unfocus = (owner = self) => {
        const element = owner.document.activeElement;
        if (element !== null && "blur" in element && typeof element.blur === "function") {
            element.blur();
        }
    };
    Html.selectContent = (element) => {
        const range = document.createRange();
        const selection = window.getSelection();
        if (isDefined(selection)) {
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };
    Html.unselectContent = (element) => {
        const selection = window.getSelection();
        if (!isDefined(selection) || selection.rangeCount === 0) {
            return;
        }
        if (element.contains(selection.getRangeAt(0).commonAncestorContainer)) {
            selection.removeAllRanges();
        }
    };
    Html.limitChars = (element, property, limit) => {
        if (!(property in element))
            return panic(`${property} not found in ${element}`);
        if (typeof element[property] !== "string")
            return panic(`${property} in ${element} is not a string`);
        if (element[property].length > limit) {
            element[property] = element[property].substring(0, limit);
            if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                element.setSelectionRange(limit, limit);
            }
            else {
                const document = element.ownerDocument;
                const range = document.createRange();
                const selection = document.defaultView?.getSelection();
                if (!isDefined(selection)) {
                    return;
                }
                range.selectNodeContents(element);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    };
    Html.EmptyGif = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
})(Html || (Html = {}));
