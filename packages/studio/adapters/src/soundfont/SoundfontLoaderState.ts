import {unitValue} from "@naomiarotest/lib-std"

export type SoundfontLoaderState =
    | { readonly type: "idle" }
    | { readonly type: "progress", progress: unitValue }
    | { readonly type: "error", readonly reason: string }
    | { readonly type: "loaded" }