import "./style.css"
import {assert, Errors, InaccessibleProperty, Progress, UUID} from "@naomiarotest/lib-std"
import {PPQN} from "@naomiarotest/lib-dsp"
import {AnimationFrame, Browser, Files} from "@naomiarotest/lib-dom"
import {Promises} from "@naomiarotest/lib-runtime"
import {AudioData, SampleMetaData} from "@naomiarotest/studio-adapters"
import {
    AudioWorklets,
    DefaultSampleLoaderManager,
    FilePickerAcceptTypes,
    OpenSampleAPI,
    Project,
    ProjectEnv,
    Workers
} from "@naomiarotest/studio-core"
import {testFeatures} from "./features"
import WorkersUrl from "@naomiarotest/studio-core/workers-main.js?worker&url"
import WorkletsUrl from "@naomiarotest/studio-core/processors.js?url"
import {importSample} from "./helper"

/**
 * Example project for testing import samples.
 */
(async () => {
    assert(crossOriginIsolated, "window must be crossOriginIsolated")
    console.debug("booting...")
    console.debug("openDAW -> import-sample")
    console.debug("Agent", Browser.userAgent)
    console.debug("isLocalHost", Browser.isLocalHost())
    const output = document.createElement("div")
    output.textContent = "booting..."
    document.body.append(output)
    await Workers.install(WorkersUrl)
    AudioWorklets.install(WorkletsUrl)
    {
        const {status, error} = await Promises.tryCatch(testFeatures())
        if (status === "rejected") {
            document.querySelector("#preloader")?.remove()
            alert(`Could not test features (${error})`)
            return
        }
    }
    const audioContext = new AudioContext({latencyHint: 0})
    console.debug(`AudioContext state: ${audioContext.state}, sampleRate: ${audioContext.sampleRate}`)
    const audioWorkletResult = await Promises.tryCatch(AudioWorklets.createFor(audioContext))
    if (audioWorkletResult.status === "rejected") {
        alert(`Could not install Worklets (${(audioWorkletResult.error)})`)
        return
    }
    const sampleAPI = OpenSampleAPI.get()
    const sampleManager = new DefaultSampleLoaderManager({
        fetch: (uuid: UUID.Bytes, progress: Progress.Handler): Promise<[AudioData, SampleMetaData]> =>
            sampleAPI.load(audioContext, uuid, progress)
    })

    const env: ProjectEnv = {
        sampleManager,
        audioWorklets: audioWorkletResult.value,
        audioContext,
        soundfontManager: InaccessibleProperty("No SoundFontManager available")
    }
    const project = Project.new(env)
    project.startAudioWorklet()
    if (audioContext.state === "suspended") {
        window.addEventListener("click",
            async () => await audioContext.resume().then(() =>
                console.debug(`AudioContext resumed (${audioContext.state})`)), {capture: true, once: true})
    }
    AnimationFrame.start(window)
    output.textContent = "Ready."
    const button = document.createElement("button")
    button.textContent = "Import sample"
    document.body.append(button)
    button.onclick = async () => {
        console.debug("CLICK")
        const {status, value: files, error} = await Promises.tryCatch(Files.open(FilePickerAcceptTypes.WavFiles))
        if (status === "rejected") {
            if (Errors.isAbort(error)) {return}
            alert(`Could not open file (${error})`)
            return
        }
        if (files.length < 1) {
            alert("No file selected")
            return
        }
        const file = files[0]
        const name = file.name
        const arrayBuffer = await file.arrayBuffer()
        const {engine, editing} = project
        try {
            // using progress here, because of the async nature of 'importSample'
            const process = editing.beginModification()
            await importSample(project, name, arrayBuffer, audioContext)
            process.approve()
        } catch (reason) {
            alert(reason)
        }
        engine.play()
        AnimationFrame.add(() => {
            const ppqn = engine.position.getValue()
            const {bars, beats} = PPQN.toParts(ppqn)
            output.textContent = `${bars + 1}:${beats + 1}`
        })
        button.remove()
    }
})()