import { asDefined, isDefined, panic } from "./lang";
const findMethodType = (descriptor) => {
    if (!isDefined(descriptor)) {
        return panic("Cannot resolve method key of undefined descriptor");
    }
    if (descriptor.value !== undefined) {
        return "value";
    }
    if (descriptor.get !== undefined) {
        return "get";
    }
    return panic(`Cannot resolve method key of ${descriptor}`);
};
export const Lazy = (_, property, descriptor) => {
    // For stage 3 decorators, we need to handle the case where the descriptor might be undefined
    // and return a proper descriptor or function
    if (!isDefined(descriptor)) {
        // This is likely a stage 3 decorator call - return a function that returns the descriptor
        return function (_, context) {
            if (context && context.kind === "getter") {
                return function () {
                    const originalDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), property);
                    if (!isDefined(originalDescriptor?.get)) {
                        return panic(`Cannot find getter for property '${property}'`);
                    }
                    const value = originalDescriptor.get.apply(this);
                    Object.defineProperty(this, property, {
                        value: value,
                        configurable: false,
                        writable: false,
                        enumerable: false
                    });
                    return value;
                };
            }
            // Fallback for other cases
            return undefined;
        };
    }
    const methodType = findMethodType(descriptor);
    const element = asDefined(descriptor[methodType]);
    return {
        [methodType]: function (...args) {
            if (args.length > 0) {
                return panic("lazy accessory must not have any construction parameters");
            }
            const value = element.apply(this);
            Object.defineProperty(this, property, {
                value: methodType === "get" ? value : () => value,
                configurable: false,
                writable: false,
                enumerable: false
            });
            return value;
        }
    };
};
