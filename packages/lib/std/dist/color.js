import { isDefined } from "./lang";
export class Color {
    static parseCssRgbOrRgba(color) {
        const colorValues = color.match(/\(([^)]+)\)/)?.at(1)?.split(",")?.map(Number);
        if (isDefined(colorValues) && colorValues.every(value => !isNaN(value))) {
            if (colorValues.length === 3) {
                return [
                    colorValues[0] / 255.0,
                    colorValues[1] / 255.0,
                    colorValues[2] / 255.0,
                    1.0
                ];
            }
            else if (colorValues.length === 4) {
                return [
                    colorValues[0] / 255.0,
                    colorValues[1] / 255.0,
                    colorValues[2] / 255.0,
                    colorValues[3]
                ];
            }
        }
        throw new Error(`${color} is not proper formatted. Example: 'rgb(255, 255, 255)' or 'rgba(255, 255, 255, 1)'`);
    }
    /**
     * Converts an HSL color value to a hexadecimal RGB color string.
     *
     * @param h - Hue in degrees (0–360).
     * @param s - Saturation as a unit value (0–1).
     * @param l - Lightness as a unit value (0–1).
     * @returns The color in `#rrggbb` format.
     */
    static hslToHex(h, s, l) {
        const k = (n) => (n + h / 30.0) % 12.0;
        const a = s * Math.min(l, 1.0 - l);
        const f = (n) => l - a * Math.max(-1.0, Math.min(k(n) - 3.0, Math.min(9.0 - k(n), 1.0)));
        const toHex = (x) => Math.round(x * 255).toString(16).padStart(2, "0");
        return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
    }
    /**
     * Converts a hexadecimal RGB color string to an HSL color value.
     * @param hex - A color string in `#rrggbb`.
     * @returns An object with:
     * - `h` — Hue in degrees (0–360)
     * - `s` — Saturation as a unit value (0–1)
     * - `l` — Lightness as a unit value (0–1)
     */
    static hexToHsl(hex) {
        const clean = hex.startsWith("#") ? hex.slice(1) : hex;
        const r = parseInt(clean.slice(0, 2), 16) / 255;
        const g = parseInt(clean.slice(2, 4), 16) / 255;
        const b = parseInt(clean.slice(4, 6), 16) / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const l = (max + min) / 2;
        let h = 0;
        let s = 0;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
                    break;
                case g:
                    h = ((b - r) / d + 2) * 60;
                    break;
                case b:
                    h = ((r - g) / d + 4) * 60;
                    break;
            }
        }
        return { h, s, l };
    }
    static hslStringToHex(hsl) {
        const [h, s, l] = hsl.match(/\d+(\.\d+)?/g).map(Number);
        return Color.hslToHex(h, s / 100.0, l / 100.0);
    }
    #h; // 0...360
    #s; // 0...100
    #l; // 0...100
    #a; // 0...1
    constructor(h, s, l, a = 1.0) {
        this.#h = h;
        this.#s = s;
        this.#l = l;
        this.#a = a;
    }
    opacity(alpha) {
        return new Color(this.#h, this.#s, this.#l, alpha);
    }
    brightness(adjust) {
        const newL = Math.max(0.0, Math.min(100.0, this.#l + adjust));
        return new Color(this.#h, this.#s, newL, this.#a);
    }
    saturate(multiplier) {
        return new Color(this.#h, this.#s * multiplier, this.#l, this.#a);
    }
    fade(shift) {
        const newS = this.#s * (1.0 - Math.sqrt(shift));
        const newL = this.#l + (100.0 - this.#l) * (shift ** 3.0);
        return new Color(this.#h, newS, newL, this.#a);
    }
    toString() {
        return this.#a === 1.0
            ? `hsl(${this.#h}, ${this.#s}%, ${this.#l}%)`
            : `hsla(${this.#h}, ${this.#s}%, ${this.#l}%, ${this.#a})`;
    }
}
