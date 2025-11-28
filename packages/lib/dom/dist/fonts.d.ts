export type FontFaceProperties = {
    "font-family": string;
    "font-style": "normal" | "italic" | "oblique";
    "font-weight": 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000 | "normal" | "bold" | "bolder" | "lighter";
    "src": string;
};
export declare const loadFont: (properties: FontFaceProperties) => Promise<void>;
export declare const getFontSizeForHeight: (context: CanvasRenderingContext2D, fontFamily: string, fontSize: number) => number;
//# sourceMappingURL=fonts.d.ts.map