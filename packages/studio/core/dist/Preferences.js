import { z } from "zod";
import { isDefined, Notifier, tryCatch } from "@opendaw/lib-std";
const PreferencesSchema = z.object({
    "auto-open-clips": z.boolean().default(false),
    "auto-create-output-compressor": z.boolean().default(true),
    "footer-show-fps-meter": z.boolean().default(false),
    "footer-show-build-infos": z.boolean().default(false),
    "dragging-use-pointer-lock": z.boolean().default(false),
    "enable-beta-features": z.boolean().default(false),
});
export const Preferences = (() => {
    const STORAGE_KEY = "preferences";
    const notifier = new Notifier();
    const watch = (target) => new Proxy(target, {
        set(obj, prop, value) {
            const key = prop;
            console.debug(`preference changed. key: ${key}, value: ${value}`);
            obj[key] = value;
            notifier.notify(key);
            tryCatch(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(target)));
            return true;
        },
        preventExtensions() {
            // Prevent the proxy target from being made non-extensible
            return false;
        }
    });
    const getOrCreate = () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (isDefined(stored)) {
            const { status, value } = tryCatch(() => JSON.parse(stored));
            if (status === "success") {
                return watch({ ...PreferencesSchema.parse(value) });
            }
        }
        return watch({ ...PreferencesSchema.parse({}) });
    };
    const preferences = getOrCreate();
    return {
        values: preferences,
        catchupAndSubscribe: (observer, property) => {
            observer(preferences[property]);
            return notifier.subscribe(key => { if (key === property) {
                observer(preferences[property]);
            } });
        }
    };
})();
