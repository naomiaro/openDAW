export var Svg;
(function (Svg) {
    Svg.pathBuilder = () => new class {
        #d = "";
        moveTo(x, y) {
            this.#d += `M${x.toFixed(3)} ${y.toFixed(3)}`;
            return this;
        }
        lineTo(x, y) {
            this.#d += `L${x.toFixed(3)} ${y.toFixed(3)}`;
            return this;
        }
        quadratic(x1, y1, x, y) {
            this.#d += `Q${x1.toFixed(3)} ${y1.toFixed(3)} ${x.toFixed(3)} ${y.toFixed(3)}`;
            return this;
        }
        quadraticTo(x, y) {
            this.#d += `T${x.toFixed(3)} ${y.toFixed(3)}`;
            return this;
        }
        cubic(x1, y1, x2, y2, x, y) {
            this.#d += `Q${x1.toFixed(3)} ${y1.toFixed(3)} ${x2.toFixed(3)} ${y2.toFixed(3)} ${x.toFixed(3)} ${y.toFixed(3)}`;
            return this;
        }
        arc(rx, ry, deg, largeArc, sweep, x, y) {
            this.#d += `A${rx} ${ry} ${deg} ${largeArc ? 1 : 0} ${sweep ? 1 : 0} ${x.toFixed(3)} ${y.toFixed(3)}`;
            return this;
        }
        circleSegment(cx, cy, radius, a0, a1) {
            const x0 = cx + Math.cos(a0) * radius;
            const y0 = cy + Math.sin(a0) * radius;
            const x1 = cx + Math.cos(a1) * radius;
            const y1 = cy + Math.sin(a1) * radius;
            let range = a1 - a0;
            while (range < 0.0)
                range += Math.PI * 2.0;
            return this.moveTo(x0, y0).arc(radius, radius, 0, range > Math.PI, true, x1, y1);
        }
        close() {
            this.#d += "Z";
            return this;
        }
        get() { return this.#d; }
    };
})(Svg || (Svg = {}));
