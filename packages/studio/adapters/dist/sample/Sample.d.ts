import { z } from "zod";
export declare const Sample: z.ZodObject<{
    name: z.ZodString;
    bpm: z.ZodNumber;
    duration: z.ZodNumber;
    sample_rate: z.ZodNumber;
    origin: z.ZodEnum<{
        openDAW: "openDAW";
        recording: "recording";
        import: "import";
    }>;
    uuid: z.ZodPipe<z.ZodString, z.ZodTransform<`${string}-${string}-${string}-${string}-${string}`, string>>;
}, z.core.$strip>;
export type Sample = z.infer<typeof Sample>;
//# sourceMappingURL=Sample.d.ts.map