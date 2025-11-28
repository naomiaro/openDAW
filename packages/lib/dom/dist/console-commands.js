import { DefaultObservableValue, EmptyProcedure } from "@opendaw/lib-std";
export var ConsoleCommands;
(function (ConsoleCommands) {
    ConsoleCommands.exportMethod = (path, callback) => store(path, { value: callback });
    ConsoleCommands.exportBoolean = (path, init = false) => {
        const observableValue = new DefaultObservableValue(init);
        ConsoleCommands.exportAccessor(path, () => observableValue.getValue(), input => {
            const value = Boolean(input);
            console.debug(`set to ${value}`);
            observableValue.setValue(value);
        });
        return observableValue;
    };
    ConsoleCommands.exportAccessor = (path, getter, setter = EmptyProcedure) => store(path, {
        get: () => {
            try {
                console.debug(getter());
                return 0;
            }
            catch (error) {
                console.error(error);
                return 1;
            }
        },
        set: (value) => {
            try {
                setter(value);
                return getter();
            }
            catch (error) {
                console.error(error);
                return 1;
            }
        },
        enumerable: false,
        configurable: false
    });
    const global = (() => { try {
        return self;
    }
    catch (_) {
        return {};
    } })();
    const scope = (global["opendaw"] ??= {});
    const store = (path, attributes) => {
        const levels = path.split(".");
        const name = levels.splice(-1)[0];
        let current = scope;
        for (const level of levels) {
            current = (current[level] ??= {});
        }
        Object.defineProperty(current, name, attributes);
        console.debug(`Console command 'opendaw.${path}' exported`);
    };
})(ConsoleCommands || (ConsoleCommands = {}));
