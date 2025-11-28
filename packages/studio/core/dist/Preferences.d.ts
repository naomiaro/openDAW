import { z } from "zod";
import { Observer, Subscription } from "@opendaw/lib-std";
declare const PreferencesSchema: z.ZodObject<{
    "auto-open-clips": z.ZodDefault<z.ZodBoolean>;
    "auto-create-output-compressor": z.ZodDefault<z.ZodBoolean>;
    "footer-show-fps-meter": z.ZodDefault<z.ZodBoolean>;
    "footer-show-build-infos": z.ZodDefault<z.ZodBoolean>;
    "dragging-use-pointer-lock": z.ZodDefault<z.ZodBoolean>;
    "enable-beta-features": z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type Preferences = z.infer<typeof PreferencesSchema>;
export declare const Preferences: {
    values: {
        "auto-open-clips": boolean;
        "auto-create-output-compressor": boolean;
        "footer-show-fps-meter": boolean;
        "footer-show-build-infos": boolean;
        "dragging-use-pointer-lock": boolean;
        "enable-beta-features": boolean;
    };
    catchupAndSubscribe: <KEY extends keyof Preferences>(observer: Observer<Preferences[KEY]>, property: KEY) => Subscription;
};
export {};
//# sourceMappingURL=Preferences.d.ts.map