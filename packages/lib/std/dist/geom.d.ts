export type Point = {
    x: number;
    y: number;
};
export type Circle = Point & {
    r: number;
};
export type Size = {
    width: number;
    height: number;
};
export type Rect = Point & Size;
export type Padding = [number, number, number, number];
export type Client = {
    clientX: number;
    clientY: number;
};
export declare const enum Axis {
    T = 0,
    R = 1,
    B = 2,
    L = 3
}
export declare const enum Corner {
    TL = 0,
    TR = 1,
    BR = 2,
    BL = 3
}
export declare namespace Geom {
    const outerTangentPoints: (a: Circle, b: Circle) => [Point, Point];
}
export declare namespace Point {
    const zero: () => Point;
    const create: (x: number, y: number) => Point;
    const clone: (point: Point) => Point;
    const floor: (point: Point) => Point;
    const length: (point: Point) => number;
    const distance: (a: Point, b: Point) => number;
    const add: (a: Point, b: Point) => Point;
    const subtract: (a: Point, b: Point) => Point;
    const scaleBy: (point: Point, scale: number) => Point;
    const scaleTo: (point: Point, scale: number) => Point;
    const fromClient: (object: {
        clientX: number;
        clientY: number;
    }) => Point;
}
export declare namespace Rect {
    const Empty: Readonly<Rect>;
    const corners: (rectangle: Rect) => Array<Point>;
    const inflate: (rect: Rect, amount: number) => Rect;
    const contains: (outer: Rect, inner: Rect) => boolean;
    const isPointInside: (point: Point, rect: Rect) => boolean;
    const intersect: (a: Rect, b: Rect) => boolean;
    const axis: (rectangle: Rect, axis: Axis) => number;
    const corner: (rectangle: Rect, corner: Corner) => Point;
    const center: (rectangle: Rect) => Point;
    const isEmpty: (rectangle: Rect) => boolean;
    const union: (a: Rect, b: Readonly<Rect>) => void;
}
export interface AABB {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
}
export declare namespace AABB {
    const width: (aabb: AABB) => number;
    const height: (aabb: AABB) => number;
    const from: (aabb: AABB, that: AABB) => void;
    const extend: (aabb: AABB, offset: number) => void;
    const padding: (aabb: AABB, [top, right, bottom, left]: Readonly<Padding>) => AABB;
    const intersectPoint: (aabb: AABB, point: Point) => boolean;
    const intersectThat: (aabb: AABB, that: AABB) => boolean;
    const center: (aabb: AABB) => Point;
}
export declare namespace Padding {
    const Identity: Readonly<Padding>;
}
export declare namespace CohenSutherland {
    const intersects: (xMin: number, xMax: number, yMin: number, yMax: number, x0: number, y0: number, x1: number, y1: number) => boolean;
}
export interface ValueAxis {
    valueToAxis(value: number): number;
    axisToValue(axis: number): number;
}
export declare namespace ValueAxis {
    const Identity: ValueAxis;
    const toClamped: (valueAxis: ValueAxis, min: number, max: number) => ValueAxis;
    const createClamped: (min: number, max: number) => ValueAxis;
}
//# sourceMappingURL=geom.d.ts.map