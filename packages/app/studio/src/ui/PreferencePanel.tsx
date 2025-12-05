import css from "./PreferencePanel.sass?inline"
import {Html} from "@naomiarotest/lib-dom"
import {DefaultObservableValue, Lifecycle} from "@naomiarotest/lib-std"
import {createElement, Frag} from "@naomiarotest/lib-jsx"
import {Preferences} from "@naomiarotest/studio-core"
import {Colors, IconSymbol} from "@naomiarotest/studio-enums"
import {Checkbox} from "@/ui/components/Checkbox"
import {Icon} from "@/ui/components/Icon"

const className = Html.adoptStyleSheet(css, "PreferencePanel")

type Construct = {
    lifecycle: Lifecycle
}

const Labels: { [K in keyof Preferences]: string } = {
    "auto-open-clips": "Always open clip view",
    "auto-create-output-compressor": "Automatically add compressor to main output",
    "dragging-use-pointer-lock": "Use Pointer Lock when dragging close to window edges [Chrome only]",
    "footer-show-fps-meter": "🪲 Show FPS meter",
    "footer-show-build-infos": "🪲 Show Build Informations",
    "enable-beta-features": "☢️ Enable Experimental Features"
}

export const PreferencePanel = ({lifecycle}: Construct) => {
    return (
        <div className={className}>
            {Object.keys(Labels).map(key => {
                const pKey = key as keyof Preferences
                const value = Preferences.values[pKey]
                switch (typeof value) {
                    case "boolean": {
                        const pKey = key as keyof Preferences
                        const model = new DefaultObservableValue<boolean>(value)
                        lifecycle.own(model.subscribe(owner => Preferences.values[pKey] = owner.getValue()))
                        return (
                            <Frag>
                                <Checkbox lifecycle={lifecycle}
                                          model={model}
                                          appearance={{
                                              color: Colors.shadow,
                                              activeColor: Colors.bright,
                                              cursor: "pointer"
                                          }}>
                                    <span style={{color: Colors.dark.toString()}}>{Labels[pKey]}</span>
                                    <hr/>
                                    <Icon symbol={IconSymbol.Checkbox}/>
                                </Checkbox>
                            </Frag>
                        )
                    }
                }
            })}
        </div>
    )
}