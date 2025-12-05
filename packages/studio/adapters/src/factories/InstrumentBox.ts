import {
    MIDIOutputDeviceBox,
    NanoDeviceBox,
    PlayfieldDeviceBox,
    SoundfontDeviceBox,
    TapeDeviceBox,
    VaporisateurDeviceBox
} from "@naomiarotest/studio-boxes"

export type InstrumentBox =
    TapeDeviceBox
    | VaporisateurDeviceBox
    | NanoDeviceBox
    | PlayfieldDeviceBox
    | SoundfontDeviceBox
    | MIDIOutputDeviceBox