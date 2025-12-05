import {Observer, Subscription, Terminable, UUID} from "@naomiarotest/lib-std"
import {Processor, ProcessPhase} from "./processing"
import {LiveStreamBroadcaster} from "@naomiarotest/lib-fusion"
import {UpdateClock} from "./UpdateClock"
import {TimeInfo} from "./TimeInfo"
import {AudioUnit} from "./AudioUnit"
import {Mixer} from "./Mixer"
import {BoxAdaptersContext, EngineToClient} from "@naomiarotest/studio-adapters"

export interface EngineContext extends BoxAdaptersContext, Terminable {
    get broadcaster(): LiveStreamBroadcaster
    get updateClock(): UpdateClock
    get timeInfo(): TimeInfo
    get mixer(): Mixer
    get engineToClient(): EngineToClient

    getAudioUnit(uuid: UUID.Bytes): AudioUnit
    registerProcessor(processor: Processor): Terminable
    registerEdge(source: Processor, target: Processor): Terminable
    subscribeProcessPhase(observer: Observer<ProcessPhase>): Subscription
    ignoresRegion(uuid: UUID.Bytes): boolean
    sendMIDIData(midiDeviceId: string, data: Uint8Array, relativeTimeInMs: number): void
}