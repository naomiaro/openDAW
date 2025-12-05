import {AudioData, Sample} from "@naomiarotest/studio-adapters"

export interface ScriptHostProtocol {
    openProject(buffer: ArrayBufferLike, name?: string): void

    fetchProject(): Promise<{ buffer: ArrayBuffer, name: string }>

    addSample(data: AudioData, name: string): Promise<Sample>
}