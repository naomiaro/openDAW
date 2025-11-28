import { Arrays, assert, panic, UUID } from "@opendaw/lib-std";
import { Pointers } from "@opendaw/studio-enums";
import { TrackType } from "./timeline/TrackType";
import { DeviceBoxUtils } from "./DeviceBox";
export var DeviceAccepts;
(function (DeviceAccepts) {
    DeviceAccepts.toTrackType = (type) => {
        switch (type) {
            case "midi":
                return TrackType.Notes;
            case "audio":
                return TrackType.Audio;
            default:
                return panic();
        }
    };
})(DeviceAccepts || (DeviceAccepts = {}));
export var Devices;
(function (Devices) {
    Devices.isAny = (adapter) => adapter !== null && typeof adapter === "object" && "type" in adapter
        && (adapter.type === "midi-effect" || adapter.type === "bus"
            || adapter.type === "instrument" || adapter.type === "audio-effect");
    Devices.isEffect = (adapter) => adapter !== null && typeof adapter === "object" && "type" in adapter
        && (adapter.type === "midi-effect" || adapter.type === "audio-effect");
    Devices.isInstrument = (adapter) => adapter !== null && typeof adapter === "object" && "type" in adapter && adapter.type === "instrument";
    Devices.isMidiEffect = (adapter) => adapter !== null && typeof adapter === "object" && "type" in adapter && adapter.type === "midi-effect";
    Devices.isAudioEffect = (adapter) => adapter !== null && typeof adapter === "object" && "type" in adapter && adapter.type === "audio-effect";
    Devices.isHost = (value) => value !== null && typeof value === "object" && "class" in value && value.class === "device-host";
    Devices.deleteEffectDevices = (devices) => {
        if (devices.length === 0) {
            return;
        }
        assert(Arrays.satisfy(devices, (a, b) => a.deviceHost().address.equals(b.deviceHost().address)), "Devices are not connected to the same host");
        const device = devices[0];
        const targets = device.accepts === "audio"
            ? device.deviceHost().audioEffects.field().pointerHub.filter(Pointers.AudioEffectHost)
            : device.accepts === "midi"
                ? device.deviceHost().midiEffects.field().pointerHub.filter(Pointers.MidiEffectHost)
                : panic("unknown type");
        targets.map(({ box }) => DeviceBoxUtils.lookupIndexField(box))
            .filter(index => devices.some(device => UUID.Comparator(device.uuid, index.address.uuid) !== 0))
            .sort((a, b) => a.getValue() - b.getValue())
            .forEach((indexField, index) => indexField.setValue(index));
        devices.forEach(device => device.box.delete());
    };
})(Devices || (Devices = {}));
