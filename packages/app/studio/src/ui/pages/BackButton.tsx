import css from "./BackButton.sass?inline"
import {Html} from "@naomiarotest/lib-dom"
import {Icon} from "@/ui/components/Icon"
import {IconSymbol} from "@naomiarotest/studio-enums"
import {createElement, LocalLink} from "@naomiarotest/lib-jsx"

const className = Html.adoptStyleSheet(css, "BackButton")

export const BackButton = () => {
    return (
        <div className={className}>
            <LocalLink href="/">
                <Icon symbol={IconSymbol.OpenDAW} style={{fontSize: "1.25em"}}/><span>GO BACK TO STUDIO</span>
            </LocalLink>
        </div>
    )
}