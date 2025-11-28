export const mint = (Constructor, ...args) => new Proxy([], {
    get(target, prop) {
        if (typeof prop === "string") {
            const index = Number(prop);
            if (!isNaN(index) && index >= 0 && Number.isInteger(index)) {
                return new Constructor(...args);
            }
        }
        if (prop === Symbol.iterator) {
            return function* () {
                while (true) {
                    yield new Constructor(...args);
                }
            };
        }
        return target[prop];
    },
    has(target, prop) {
        if (typeof prop === "string") {
            const index = Number(prop);
            if (!isNaN(index) && index >= 0) {
                return true;
            }
        }
        return prop in target;
    }
});
