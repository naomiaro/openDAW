import { AudioData, Sample } from "@opendaw/studio-adapters";
export interface ScriptHostProtocol {
    openProject(buffer: ArrayBufferLike, name?: string): void;
    fetchProject(): Promise<{
        buffer: ArrayBuffer;
        name: string;
    }>;
    addSample(data: AudioData, name: string): Promise<Sample>;
}
//# sourceMappingURL=ScriptHostProtocol.d.ts.map