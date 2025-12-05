import {Processor} from "./processing"
import {NoteEventSource, NoteEventTarget} from "./NoteEventSource"
import {int, Terminable, UUID} from "@naomiarotest/lib-std"
import {MidiEffectDeviceAdapter} from "@naomiarotest/studio-adapters"

export interface MidiEffectProcessor extends Processor, NoteEventSource, NoteEventTarget, Terminable {
    get uuid(): UUID.Bytes

    index(): int
    adapter(): MidiEffectDeviceAdapter
}