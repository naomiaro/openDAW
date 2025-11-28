const key = Symbol.for("@openDAW/lib-fusion");
if (globalThis[key]) {
    console.debug(`%c${key.description}%c is already available in ${globalThis.constructor.name}.`, "color: hsl(10, 83%, 60%)", "color: inherit");
}
else {
    globalThis[key] = true;
    console.debug(`%c${key.description}%c is now available in ${globalThis.constructor.name}.`, "color: hsl(200, 83%, 60%)", "color: inherit");
}
import "./types";
export * from "./live-stream/LiveStreamReceiver";
export * from "./live-stream/LiveStreamBroadcaster";
export * from "./peaks/Peaks";
export * from "./peaks/SamplePeakWorker";
export * from "./peaks/SamplePeakProtocol";
export * from "./peaks/PeaksPainter";
export * from "./opfs/OpfsWorker";
export * from "./opfs/OpfsProtocol";
