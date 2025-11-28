import { Chord, dbToGain, FFT, gainToDb, Interpolation, midiToHz, PPQN } from "@opendaw/lib-dsp";
import { AudioPlayback } from "@opendaw/studio-enums";
import { ApiImpl } from "./impl";
export class ScriptRunner {
    #api;
    constructor(protocol) { this.#api = new ApiImpl(protocol); }
    async run(jsCode, context) {
        Object.assign(globalThis, {
            ...context,
            openDAW: this.#api,
            AudioPlayback, midiToHz, PPQN, FFT, Chord, Interpolation, dbToGain, gainToDb
        });
        const blob = new Blob([jsCode], { type: "text/javascript" });
        const url = URL.createObjectURL(blob);
        try {
            const AsyncFunction = (async () => { }).constructor;
            await new AsyncFunction("url", "return import(url)")(url);
        }
        finally {
            URL.revokeObjectURL(url);
        }
    }
}
