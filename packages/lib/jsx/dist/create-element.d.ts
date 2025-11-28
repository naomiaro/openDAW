import { DomElement, JsxValue } from "./types";
type Factory = (attributes: Readonly<Record<string, any>>, children?: ReadonlyArray<JsxValue>) => JsxValue;
type TagOrFactoryOrElement = string | Factory | DomElement;
/**
 * This method must be exposed as the "createElement" method
 * to be passively called on each element defined in jsx files.
 * This is secured by injection defined in vite.config
 * Most magic happens here, but we try to keep it civil.
 */
export declare function createElement(tagOrFactoryOrElement: TagOrFactoryOrElement, attributes: Readonly<Record<string, any>> | null, ...children: ReadonlyArray<JsxValue>): JsxValue;
export declare const replaceChildren: (element: DomElement, ...children: ReadonlyArray<JsxValue>) => void;
export declare const appendChildren: (element: DomElement, ...children: ReadonlyArray<JsxValue>) => void;
export {};
//# sourceMappingURL=create-element.d.ts.map