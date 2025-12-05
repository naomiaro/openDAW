import {Chord, dbToGain, FFT, gainToDb, Interpolation, midiToHz, PPQN} from "@naomiarotest/lib-dsp"
import {AudioPlayback} from "@naomiarotest/studio-enums"
import {ScriptHostProtocol} from "./ScriptHostProtocol"
import {ScriptExecutionContext} from "./ScriptExecutionProtocol"
import {Api} from "./Api"
import {ApiImpl} from "./impl"

export class ScriptRunner {
    readonly #api: Api

    constructor(protocol: ScriptHostProtocol) {this.#api = new ApiImpl(protocol)}

    async run(jsCode: string, context: ScriptExecutionContext) {
        Object.assign(globalThis, {
            ...context,
            openDAW: this.#api,
            AudioPlayback, midiToHz, PPQN, FFT, Chord, Interpolation, dbToGain, gainToDb
        })
        const blob = new Blob([jsCode], {type: "text/javascript"})
        const url = URL.createObjectURL(blob)
        try {
            const AsyncFunction = (async () => {}).constructor as new (arg: string, body: string) =>
                (...args: any[]) => Promise<any>
            await new AsyncFunction("url", "return import(url)")(url)
        } finally {
            URL.revokeObjectURL(url)
        }
    }
}