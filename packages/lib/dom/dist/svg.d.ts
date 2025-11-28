export declare namespace Svg {
    interface PathBuilder {
        moveTo(x: number, y: number): this;
        lineTo(x: number, y: number): this;
        quadratic(x1: number, y1: number, x: number, y: number): this;
        quadraticTo(x: number, y: number): this;
        cubic(x1: number, y1: number, x2: number, y2: number, x: number, y: number): this;
        arc(rx: number, ry: number, deg: number, largeArc: boolean, sweep: boolean, x: number, y: number): this;
        circleSegment(cx: number, cy: number, radius: number, a0: number, a1: number): this;
        close(): this;
        get(): string;
    }
    const pathBuilder: () => PathBuilder;
}
//# sourceMappingURL=svg.d.ts.map