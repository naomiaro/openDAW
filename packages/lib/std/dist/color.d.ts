import { unitValue } from "./lang";
export type RGBA = [unitValue, unitValue, unitValue, unitValue];
export declare class Color {
    #private;
    static parseCssRgbOrRgba(color: string): RGBA;
    /**
     * Converts an HSL color value to a hexadecimal RGB color string.
     *
     * @param h - Hue in degrees (0–360).
     * @param s - Saturation as a unit value (0–1).
     * @param l - Lightness as a unit value (0–1).
     * @returns The color in `#rrggbb` format.
     */
    static hslToHex(h: number, s: unitValue, l: unitValue): string;
    /**
     * Converts a hexadecimal RGB color string to an HSL color value.
     * @param hex - A color string in `#rrggbb`.
     * @returns An object with:
     * - `h` — Hue in degrees (0–360)
     * - `s` — Saturation as a unit value (0–1)
     * - `l` — Lightness as a unit value (0–1)
     */
    static hexToHsl(hex: string): {
        h: number;
        s: number;
        l: number;
    };
    static hslStringToHex(hsl: string): string;
    constructor(h: number, s: number, l: number, a?: number);
    opacity(alpha: number): Color;
    brightness(adjust: number): Color;
    saturate(multiplier: unitValue): Color;
    fade(shift: number): Color;
    toString(): string;
}
//# sourceMappingURL=color.d.ts.map