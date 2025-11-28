export var Intervals;
(function (Intervals) {
    Intervals.intersect1D = (min0, max0, min1, max1) => Math.max(min0, min1) <= Math.min(max0, max1);
})(Intervals || (Intervals = {}));
