import "./style.css"
import {assert, UUID} from "@naomiarotest/lib-std"
import {Browser} from "@naomiarotest/lib-dom"
import {Soundfont} from "@naomiarotest/studio-adapters"
import {AudioWorklets, Workers} from "@naomiarotest/studio-core"
import WorkersUrl from "@naomiarotest/studio-core/workers-main.js?worker&url"
import WorkletsUrl from "@naomiarotest/studio-core/processors.js?url"
import {SoundFont2} from "soundfont2"

/**
 * This is just to make soundfonts available for openDAW's cloud.
 */
(async () => {
    assert(crossOriginIsolated, "window must be crossOriginIsolated")
    console.debug("booting...")
    console.debug("openDAW -> headless")
    console.debug("Agent", Browser.userAgent)
    console.debug("isLocalHost", Browser.isLocalHost())
    document.body.textContent = "booting..."
    await Workers.install(WorkersUrl)
    AudioWorklets.install(WorkletsUrl)

    await fetch("soundfonts/ConcertHarp-20200702.sf2")
        .then(x => x.arrayBuffer())
        .then(async x => {
            const uuid = await UUID.sha256(x)
            const uuidAsString = UUID.toString(uuid)
            console.debug("UUID", uuidAsString)
            const sf = new SoundFont2(new Uint8Array(x))
            const result: Soundfont = {
                uuid: uuidAsString,
                size: x.byteLength,
                name: sf.metaData.name,
                license: "Creative Commons CC0 public domain",
                url: "https://freepats.zenvoid.org/OrchestralStrings/harp.html",
                origin: "openDAW"
            }
            sf.presets.map(preset => preset.header.name).forEach(name => console.debug(name))
            console.dir(result, {depth: Number.MAX_SAFE_INTEGER})
        })

    document.body.textContent = "Ready."
})()