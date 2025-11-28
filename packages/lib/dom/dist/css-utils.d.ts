export declare namespace CssUtils {
    const calc: (term: string, size: number, em: number) => number;
    const registerCustomCursor: (identifier: number, data: string) => Map<number, string>;
    const setCursor: (identifier: CssUtils.Cursor | number, doc?: Document) => void;
    type Cursor = "alias" | "all-scroll" | "auto" | "cell" | "context-menu" | "col-resize" | "copy" | "crosshair" | "default" | "e-resize" | "ew-resize" | "grab" | "grabbing" | "help" | "move" | "n-resize" | "ne-resize" | "nesw-resize" | "ns-resize" | "nw-resize" | "nwse-resize" | "no-drop" | "none" | "not-allowed" | "pointer" | "progress" | "row-resize" | "s-resize" | "se-resize" | "sw-resize" | "text" | "url" | "w-resize" | "wait" | "zoom-in" | "zoom-out";
}
//# sourceMappingURL=css-utils.d.ts.map