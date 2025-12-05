import {Fonts} from "@/ui/Fonts"
import {loadFont} from "@naomiarotest/lib-dom"
import {Lazy} from "@naomiarotest/lib-std"

export class FontLoader {
    @Lazy
    static async load() {
        return Promise.allSettled([
            loadFont(Fonts.Rubik), loadFont(Fonts.OpenSans)
        ])
    }
}