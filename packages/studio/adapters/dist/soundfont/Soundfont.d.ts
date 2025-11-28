import { z } from "zod";
export declare const Soundfont: z.ZodObject<{
    name: z.ZodString;
    size: z.ZodNumber;
    url: z.ZodString;
    license: z.ZodString;
    origin: z.ZodEnum<{
        openDAW: "openDAW";
        import: "import";
    }>;
    uuid: z.ZodPipe<z.ZodString, z.ZodTransform<`${string}-${string}-${string}-${string}-${string}`, string>>;
}, z.core.$strip>;
export type Soundfont = z.infer<typeof Soundfont>;
//# sourceMappingURL=Soundfont.d.ts.map