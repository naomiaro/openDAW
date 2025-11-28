import { z } from "zod";
export declare const SoundfontMetaData: z.ZodObject<{
    name: z.ZodString;
    size: z.ZodNumber;
    url: z.ZodString;
    license: z.ZodString;
    origin: z.ZodEnum<{
        openDAW: "openDAW";
        import: "import";
    }>;
}, z.core.$strip>;
export type SoundfontMetaData = z.infer<typeof SoundfontMetaData>;
//# sourceMappingURL=SoundfontMetaData.d.ts.map