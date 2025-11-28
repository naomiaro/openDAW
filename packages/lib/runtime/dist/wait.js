import { tryCatch } from "@opendaw/lib-std";
export var Wait;
(function (Wait) {
    Wait.frame = () => new Promise(resolve => requestAnimationFrame(() => resolve()));
    Wait.frames = (numFrames) => new Promise(resolve => {
        let count = numFrames;
        const callback = () => { if (--count <= 0) {
            resolve();
        }
        else {
            requestAnimationFrame(callback);
        } };
        requestAnimationFrame(callback);
    });
    Wait.timeSpan = (time, ...args) => new Promise(resolve => setTimeout(resolve, time.millis(), ...args));
    Wait.event = (target, type) => new Promise(resolve => target.addEventListener(type, resolve, { once: true }));
    Wait.observable = (observable) => new Promise(resolve => {
        const terminable = observable.subscribe(() => {
            terminable.terminate();
            resolve();
        });
    });
    Wait.complete = (generator) => new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            const { status, value: next, error } = tryCatch(() => generator.next());
            if (status === "success") {
                const { done, value } = next;
                if (done) {
                    clearInterval(interval);
                    resolve(value);
                }
            }
            else {
                clearInterval(interval);
                reject(error);
            }
        }, 0);
    });
})(Wait || (Wait = {}));
