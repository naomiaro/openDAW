import { int, RGBA, Subscription } from "@opendaw/lib-std";
export declare namespace Html {
    const parse: (source: string) => HTMLOrSVGElement & Element;
    const empty: (element: Element) => void;
    const query: <E extends Element>(selectors: string, parent?: ParentNode) => E;
    const queryAll: <E extends Element>(selectors: string, parent?: ParentNode) => ReadonlyArray<E>;
    const sanitize: (element: Element) => void;
    const nextID: () => string;
    const adoptStyleSheet: (classDefinition: string, prefix?: string) => string;
    const buildClassList: (...input: Array<string | false | undefined>) => string;
    const readCssVarColor: (...cssValues: Array<string>) => Array<RGBA>;
    const watchResize: (target: Element, callback: (entry: ResizeObserverEntry, observer: ResizeObserver) => void, options?: ResizeObserverOptions) => Subscription;
    const watchIntersection: (target: Element, callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => Subscription;
    const secureBoundingBox: (element: Element) => DOMRect;
    const unfocus: (owner?: Window) => void;
    const selectContent: (element: HTMLElement) => void;
    const unselectContent: (element: HTMLElement) => void;
    const limitChars: <T extends HTMLElement, K extends keyof T & string>(element: T, property: K, limit: int) => undefined;
    const EmptyGif: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
}
//# sourceMappingURL=html.d.ts.map