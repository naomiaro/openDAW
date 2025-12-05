import "./main.sass"
import {App} from "@/ui/App.tsx"
import {panic, Progress, RuntimeNotification, RuntimeNotifier, UUID} from "@naomiarotest/lib-std"
import {StudioService} from "@/service/StudioService"
import {AudioData, SampleMetaData, SoundfontMetaData} from "@naomiarotest/studio-adapters"
import {Dialogs} from "@/ui/components/dialogs.tsx"
import {installCursors} from "@/ui/Cursors.ts"
import {BuildInfo} from "./BuildInfo"
import {Surface} from "@/ui/surface/Surface.tsx"
import {replaceChildren} from "@naomiarotest/lib-jsx"
import {ContextMenu} from "@/ui/ContextMenu.ts"
import {Spotlight} from "@/ui/spotlight/Spotlight.tsx"
import {testFeatures} from "@/features.ts"
import {MissingFeature} from "@/ui/MissingFeature.tsx"
import {UpdateMessage} from "@/ui/UpdateMessage.tsx"
import {showStoragePersistDialog} from "@/AppDialogs"
import {Promises} from "@naomiarotest/lib-runtime"
import {AnimationFrame, Browser, Events, Keyboard} from "@naomiarotest/lib-dom"
import {AudioOutputDevice} from "@/audio/AudioOutputDevice"
import {FontLoader} from "@/ui/FontLoader"
import {ErrorHandler} from "@/errors/ErrorHandler.ts"
import {
    AudioWorklets,
    CloudAuthManager,
    DefaultSampleLoaderManager,
    DefaultSoundfontLoaderManager,
    OpenSampleAPI,
    OpenSoundfontAPI,
    SampleStorage,
    Workers
} from "@naomiarotest/studio-core"

const loadBuildInfo = async () => fetch(`/build-info.json?v=${Date.now()}`)
    .then(x => x.json())
    .then(x => BuildInfo.parse(x))

export const boot = async ({workersUrl, workletsUrl}: { workersUrl: string, workletsUrl: string }) => {
    console.debug("booting...")
    const {status, value: buildInfo} = await Promises.tryCatch(loadBuildInfo())
    if (status === "rejected") {
        alert("Error loading build info. Please reload the page.")
        return
    }
    console.debug("buildInfo", buildInfo)
    await FontLoader.load()
    await Workers.install(workersUrl)
    AudioWorklets.install(workletsUrl)
    const testFeaturesResult = await Promises.tryCatch(testFeatures())
    if (testFeaturesResult.status === "rejected") {
        document.querySelector("#preloader")?.remove()
        replaceChildren(document.body, MissingFeature({error: testFeaturesResult.error}))
        return
    }
    console.debug("isLocalHost", Browser.isLocalHost())
    console.debug("agent", Browser.userAgent)
    const sampleRate = Browser.isFirefox() ? undefined : 48000
    console.debug("requesting custom sampleRate", sampleRate ?? "'No (Firefox)'")
    const context = new AudioContext({sampleRate, latencyHint: 0})
    console.debug(`AudioContext state: ${context.state}, sampleRate: ${context.sampleRate}`)
    const audioWorklets = await Promises.tryCatch(AudioWorklets.createFor(context))
    if (audioWorklets.status === "rejected") {
        return panic(audioWorklets.error)
    }
    if (context.state === "suspended") {
        window.addEventListener("click",
            async () => await context.resume().then(() =>
                console.debug(`AudioContext resumed (${context.state})`)), {capture: true, once: true})
    }
    const audioDevices = await AudioOutputDevice.create(context)
    const sampleManager = new DefaultSampleLoaderManager({
        fetch: async (uuid: UUID.Bytes, progress: Progress.Handler): Promise<[AudioData, SampleMetaData]> =>
            OpenSampleAPI.get().load(context, uuid, progress)
    })
    const soundfontManager = new DefaultSoundfontLoaderManager({
        fetch: async (uuid: UUID.Bytes, progress: Progress.Handler): Promise<[ArrayBuffer, SoundfontMetaData]> =>
            OpenSoundfontAPI.get().load(uuid, progress)
    })
    const cloudAuthManager = CloudAuthManager.create({
        Dropbox: "jtehjzxaxf3bf1l",
        GoogleDrive: "628747153367-gt1oqcn3trr9l9a7jhigja6l1t3f1oik.apps.googleusercontent.com"
    })
    const service: StudioService = new StudioService(
        context, audioWorklets.value, audioDevices, sampleManager, soundfontManager, cloudAuthManager, buildInfo)
    const errorHandler = new ErrorHandler(buildInfo, () => service.recovery.createBackupCommand())
    const surface = Surface.main({
        config: (surface: Surface) => {
            surface.ownAll(
                Events.subscribe(surface.owner, "keydown", event => {
                    if (Keyboard.isControlKey(event) && event.key.toLowerCase() === "z") {
                        if (event.shiftKey) {
                            service.runIfProject(project => project.editing.redo())
                        } else {
                            service.runIfProject(project => project.editing.undo())
                        }
                    } else if (event.defaultPrevented) {return}
                }),
                ContextMenu.install(surface.owner),
                Spotlight.install(surface, service)
            )
        }
    }, errorHandler)
    document.querySelector("#preloader")?.remove()
    document.addEventListener("touchmove", (event: TouchEvent) => event.preventDefault(), {passive: false})
    replaceChildren(surface.ground, App(service))
    AnimationFrame.start(window)
    installCursors()
    RuntimeNotifier.install({
        info: (request) => Dialogs.info(request),
        approve: (request) => Dialogs.approve({...request, reverse: true}),
        progress: (request): RuntimeNotification.ProgressUpdater => Dialogs.progress(request)
    })
    if (buildInfo.env === "production" && !Browser.isLocalHost()) {
        const uuid = buildInfo.uuid
        const sourceCss = document.querySelector<HTMLLinkElement>("link[rel='stylesheet']")?.href ?? ""
        const sourceCode = document.querySelector<HTMLScriptElement>("script[src]")?.src ?? ""
        if (!sourceCss.includes(uuid) || !sourceCode.includes(uuid)) {
            console.warn("Cache issue:")
            console.warn("expected uuid", uuid)
            console.warn("sourceCss", sourceCss)
            console.warn("sourceCode", sourceCode)
            Dialogs.cache()
            return
        }
        const checkExtensions = setInterval(() => {
            if (document.scripts.length > 1) {
                Dialogs.info({
                    headline: "Warning",
                    message: "Please disable extensions to avoid undefined behavior.",
                    okText: "Ignore"
                }).finally()
                clearInterval(checkExtensions)
            }
        }, 5_000)
        const checkUpdates = setInterval(async () => {
            if (!navigator.onLine) {return}
            const {status, value: newBuildInfo} = await Promises.tryCatch(loadBuildInfo())
            if (status === "resolved" && newBuildInfo.uuid !== undefined && newBuildInfo.uuid !== buildInfo.uuid) {
                document.body.prepend(UpdateMessage())
                console.warn("A new version is online.")
                clearInterval(checkUpdates)
            }
        }, 5_000)
    } else {
        console.debug("No production checks (build version & updates).")
    }
    if (Browser.isFirefox()) {
        const persisted = await Promises.tryCatch(navigator.storage.persisted())
        console.debug("Firefox.isPersisted", persisted.value)
        if (persisted.status === "resolved" && !persisted.value) {
            await Promises.tryCatch(showStoragePersistDialog())
        }
    }
    // delete obsolete indexedDB
    try {indexedDB.deleteDatabase("audio-file-cache")} catch (_: any) {}
    // delete obsolete samples
    SampleStorage.cleanDeprecated().then()
}