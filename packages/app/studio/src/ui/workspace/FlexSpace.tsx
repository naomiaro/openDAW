import css from "./FlexSpace.sass?inline"
import {createElement} from "@naomiarotest/lib-jsx"
import {Html} from "@naomiarotest/lib-dom"

const className = Html.adoptStyleSheet(css, "FlexSpace")

export const FlexSpace = () => (<div className={className}/>)