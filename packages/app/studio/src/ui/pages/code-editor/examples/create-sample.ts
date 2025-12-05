import {InaccessibleProperty} from "@naomiarotest/lib-std"
import {Api} from "@naomiarotest/studio-scripting"
import {dbToGain} from "@naomiarotest/lib-dsp"
import {AudioPlayback} from "@naomiarotest/studio-enums"

const openDAW: Api = InaccessibleProperty("Not to be executed.")

// openDAW script editor (very early preview - under heavy construction)

export {}

const numberOfFrames = sampleRate * 3 // three seconds of audio
const frames = new Float32Array(numberOfFrames)
const f0 = 200.0
const f1 = 4000.0
const gain = dbToGain(-6.0)

for (let i = 0, phase = 0.0; i < numberOfFrames; i++) {
    frames[i] = Math.sin(phase * Math.PI * 2.0) * gain
    const t = i / numberOfFrames
    const freq = f0 * Math.pow(f1 / f0, 1.0 - Math.abs(2.0 * t - 1.0)) // up and down chirp
    phase += freq / sampleRate
}

const sample = await openDAW.addSample({
    frames: [frames],
    numberOfFrames,
    numberOfChannels: 1,
    sampleRate
}, "Chirp 200-4000Hz")

const project = openDAW.newProject("Test Audio")
const tapeUnit = project.addInstrumentUnit("Tape")
const audioTrack = tapeUnit.addAudioTrack()
audioTrack.addRegion(sample, {playback: AudioPlayback.NoSync, duration: numberOfFrames / sampleRate})
project.openInStudio()