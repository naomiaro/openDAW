import css from "./UpdateMessage.sass?inline"
import {Html} from "@naomiarotest/lib-dom"
import {createElement} from "@naomiarotest/lib-jsx"

const className = Html.adoptStyleSheet(css, "UpdateMessage")

export const UpdateMessage = () => {
    return (
        <div className={className}>
            Update available! (please save now and reload!)
        </div>
    )
}