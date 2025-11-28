export var Runtime;
(function (Runtime) {
    // Debounce execution by delaying the call until after the timeout has passed without new invocations.
    Runtime.debounce = (() => {
        let id = undefined;
        return (exec, timeout = 1000) => {
            clearTimeout(id);
            id = setTimeout(exec, timeout);
        };
    })();
    Runtime.scheduleInterval = (exec, time, ...args) => {
        const id = setInterval(exec, time, ...args);
        return { terminate: () => clearInterval(id) };
    };
    Runtime.scheduleTimeout = (exec, time, ...args) => {
        const id = setTimeout(exec, time, ...args);
        return { terminate: () => clearTimeout(id) };
    };
})(Runtime || (Runtime = {}));
