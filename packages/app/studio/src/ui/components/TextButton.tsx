import css from "./TextButton.sass?inline"
import {Exec} from "@naomiarotest/lib-std"
import {createElement} from "@naomiarotest/lib-jsx"
import {Html} from "@naomiarotest/lib-dom"

const className = Html.adoptStyleSheet(css, "TextButton")

export const TextButton = ({onClick}: { onClick: Exec }) => (
    <div className={className} onclick={onClick}/>
)