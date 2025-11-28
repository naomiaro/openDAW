import { TimeSpan } from "@opendaw/lib-std";
export var TimeSpanUtils;
(function (TimeSpanUtils) {
    TimeSpanUtils.startEstimator = () => {
        const startTime = performance.now();
        return (progress) => {
            if (progress === 0.0) {
                return TimeSpan.POSITIVE_INFINITY;
            }
            const runtime = (performance.now() - startTime);
            return TimeSpan.millis(runtime / progress - runtime);
        };
    };
})(TimeSpanUtils || (TimeSpanUtils = {}));
