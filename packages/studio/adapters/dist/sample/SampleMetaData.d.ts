import { z } from "zod";
export declare const SampleMetaData: z.ZodObject<{
    name: z.ZodString;
    bpm: z.ZodNumber;
    duration: z.ZodNumber;
    sample_rate: z.ZodNumber;
    origin: z.ZodEnum<{
        openDAW: "openDAW";
        recording: "recording";
        import: "import";
    }>;
}, z.core.$strip>;
export type SampleMetaData = z.infer<typeof SampleMetaData>;
//# sourceMappingURL=SampleMetaData.d.ts.map