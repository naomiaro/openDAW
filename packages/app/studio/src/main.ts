import "./main.sass"
import workersUrl from "@naomiarotest/studio-core/workers-main.js?worker&url"
import workletsUrl from "@naomiarotest/studio-core/processors.js?url"
import {boot} from "@/boot"
import {initializeColors} from "@naomiarotest/studio-enums"

if (window.crossOriginIsolated) {
    const now = Date.now()
    initializeColors(document.documentElement)
    boot({workersUrl, workletsUrl}).then(() => console.debug(`Booted in ${Math.ceil(Date.now() - now)}ms`))
} else {
    alert("crossOriginIsolated is enabled")
}