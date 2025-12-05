import {Coordinates, SelectableLocator} from "@naomiarotest/lib-std"
import {ppqn} from "@naomiarotest/lib-dsp"

import {BoxAdapter} from "@naomiarotest/studio-adapters"

export type TimelineCoordinates = Coordinates<ppqn, number>
export type TimelineSelectableLocator<A extends BoxAdapter> = SelectableLocator<A, ppqn, number>