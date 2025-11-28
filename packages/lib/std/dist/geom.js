import { Unhandled } from "./lang";
import { clamp } from "./math";
export var Axis;
(function (Axis) {
    Axis[Axis["T"] = 0] = "T";
    Axis[Axis["R"] = 1] = "R";
    Axis[Axis["B"] = 2] = "B";
    Axis[Axis["L"] = 3] = "L";
})(Axis || (Axis = {}));
export var Corner;
(function (Corner) {
    Corner[Corner["TL"] = 0] = "TL";
    Corner[Corner["TR"] = 1] = "TR";
    Corner[Corner["BR"] = 2] = "BR";
    Corner[Corner["BL"] = 3] = "BL";
})(Corner || (Corner = {}));
export var Geom;
(function (Geom) {
    Geom.outerTangentPoints = (a, b) => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const angle = Math.atan2(dy, dx) + Math.acos((a.r - b.r) / Math.sqrt(dx * dx + dy * dy));
        const cs = Math.cos(angle);
        const sn = Math.sin(angle);
        return [
            { x: a.x + a.r * cs, y: a.y + a.r * sn },
            { x: b.x + b.r * cs, y: b.y + b.r * sn }
        ];
    };
})(Geom || (Geom = {}));
export var Point;
(function (Point) {
    Point.zero = () => ({ x: 0, y: 0 });
    Point.create = (x, y) => ({ x, y });
    Point.clone = (point) => ({ ...point });
    Point.floor = (point) => ({ x: Math.floor(point.x), y: Math.floor(point.y) });
    Point.length = (point) => Math.sqrt(point.x * point.x + point.y * point.y);
    Point.distance = (a, b) => Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    Point.add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
    Point.subtract = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
    Point.scaleBy = (point, scale) => ({ x: point.x * scale, y: point.y * scale });
    Point.scaleTo = (point, scale) => {
        const multiplier = scale / Point.length(point);
        return { x: point.x * multiplier, y: point.y * multiplier };
    };
    Point.fromClient = (object) => ({
        x: object.clientX,
        y: object.clientY
    });
})(Point || (Point = {}));
export var Rect;
(function (Rect) {
    Rect.Empty = Object.freeze({ x: 0, y: 0, width: 0, height: 0 });
    Rect.corners = (rectangle) => {
        const x0 = rectangle.x;
        const y0 = rectangle.y;
        const x1 = x0 + rectangle.width;
        const y1 = y0 + rectangle.height;
        return [{ x: x0, y: y0 }, { x: x1, y: y0 }, { x: x1, y: y1 }, { x: x0, y: y1 }];
    };
    Rect.inflate = (rect, amount) => {
        return {
            x: rect.x - amount,
            y: rect.y - amount,
            width: rect.width + amount * 2.0,
            height: rect.height + amount * 2.0
        };
    };
    Rect.contains = (outer, inner) => {
        const topLeftInside = inner.x >= outer.x && inner.y >= outer.y;
        const bottomRightInside = (inner.x + inner.width) <= (outer.x + outer.width)
            && (inner.y + inner.height) <= (outer.y + outer.height);
        return topLeftInside && bottomRightInside;
    };
    Rect.isPointInside = (point, rect) => point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height;
    Rect.intersect = (a, b) => {
        const xMin = Math.max(a.x, b.x);
        const xMax = Math.min(a.x + a.width, b.x + b.width);
        const yMax = Math.min(a.y + a.height, b.y + b.height);
        const yMin = Math.max(a.y, b.y);
        return xMax > xMin && yMax > yMin;
    };
    Rect.axis = (rectangle, axis) => {
        switch (axis) {
            case Axis.T:
                return rectangle.y;
            case Axis.R:
                return rectangle.x + rectangle.width;
            case Axis.B:
                return rectangle.y + rectangle.height;
            case Axis.L:
                return rectangle.x;
            default:
                return Unhandled(axis);
        }
    };
    Rect.corner = (rectangle, corner) => {
        switch (corner) {
            case Corner.TL:
                return { x: rectangle.x, y: rectangle.y };
            case Corner.TR:
                return { x: rectangle.x + rectangle.width, y: rectangle.y };
            case Corner.BR:
                return { x: rectangle.x + rectangle.width, y: rectangle.y + rectangle.height };
            case Corner.BL:
                return { x: rectangle.x, y: rectangle.y + rectangle.height };
            default:
                return Unhandled(corner);
        }
    };
    Rect.center = (rectangle) => ({
        x: rectangle.x + rectangle.width * 0.5,
        y: rectangle.y + rectangle.height * 0.5
    });
    Rect.isEmpty = (rectangle) => rectangle.width === 0 || rectangle.height === 0;
    Rect.union = (a, b) => {
        if (Rect.isEmpty(a)) {
            if (!Rect.isEmpty(b)) {
                a.x = b.x;
                a.y = b.y;
                a.width = b.width;
                a.height = b.height;
            }
        }
        else if (!Rect.isEmpty(b)) {
            const bx = b.x;
            const by = b.y;
            const ux = Math.min(a.x, bx);
            const uy = Math.min(a.y, by);
            a.width = Math.max(a.x + a.width, bx + b.width) - ux;
            a.height = Math.max(a.y + a.height, by + b.height) - uy;
            a.x = ux;
            a.y = uy;
        }
    };
})(Rect || (Rect = {}));
export var AABB;
(function (AABB) {
    AABB.width = (aabb) => aabb.xMax - aabb.xMin;
    AABB.height = (aabb) => aabb.yMax - aabb.yMin;
    AABB.from = (aabb, that) => {
        aabb.xMin = that.xMin;
        aabb.xMax = that.xMax;
        aabb.yMin = that.yMin;
        aabb.yMax = that.yMax;
    };
    AABB.extend = (aabb, offset) => {
        aabb.xMin -= offset;
        aabb.yMin -= offset;
        aabb.xMax += offset;
        aabb.yMax += offset;
    };
    AABB.padding = (aabb, [top, right, bottom, left]) => {
        aabb.xMin += left;
        aabb.yMin += top;
        aabb.xMax -= right;
        aabb.yMax -= bottom;
        return aabb;
    };
    AABB.intersectPoint = (aabb, point) => aabb.xMin <= point.x && point.x < aabb.xMax && aabb.yMin <= point.y && point.y < aabb.yMax;
    AABB.intersectThat = (aabb, that) => that.xMin < aabb.xMax && that.xMax > aabb.xMin && that.yMin < aabb.yMax && that.yMax > aabb.yMin;
    AABB.center = (aabb) => ({ x: (aabb.xMin + aabb.xMax) * 0.5, y: (aabb.yMin + aabb.yMax) * 0.5 });
})(AABB || (AABB = {}));
export var Padding;
(function (Padding) {
    Padding.Identity = Object.freeze([0.0, 0.0, 0.0, 0.0]);
})(Padding || (Padding = {}));
export var CohenSutherland;
(function (CohenSutherland) {
    CohenSutherland.intersects = (xMin, xMax, yMin, yMax, x0, y0, x1, y1) => {
        const c0 = code(xMin, xMax, yMin, yMax, x0, y0);
        const c1 = code(xMin, xMax, yMin, yMax, x1, y1);
        if ((c0 | c1) === 0) {
            return false;
        }
        if ((c0 & c1) !== 0) {
            return false;
        }
        const s = sign(x0, y0, x1, y1, xMin, yMin);
        return (s !== sign(x0, y0, x1, y1, xMax, yMin) ||
            s !== sign(x0, y0, x1, y1, xMax, yMax) ||
            s !== sign(x0, y0, x1, y1, xMin, yMax));
    };
    const code = (xMin, xMax, yMin, yMax, x, y) => {
        let code = 0;
        if (x <= xMin) {
            code |= 1;
        }
        else if (x >= xMax) {
            code |= 2;
        }
        if (y <= yMin) {
            code |= 8;
        }
        else if (y >= yMax) {
            code |= 4;
        }
        return code;
    };
    const sign = (x0, y0, x1, y1, x2, y2) => (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0) >= 0;
})(CohenSutherland || (CohenSutherland = {}));
export var ValueAxis;
(function (ValueAxis) {
    ValueAxis.Identity = {
        valueToAxis: (value) => value,
        axisToValue: (axis) => axis
    };
    ValueAxis.toClamped = (valueAxis, min, max) => ({
        valueToAxis: (value) => valueAxis.valueToAxis(clamp(value, min, max)),
        axisToValue: (axis) => clamp(valueAxis.axisToValue(axis), min, max)
    });
    ValueAxis.createClamped = (min, max) => ({
        valueToAxis: (value) => clamp(value, min, max),
        axisToValue: (axis) => clamp(axis, min, max)
    });
})(ValueAxis || (ValueAxis = {}));
