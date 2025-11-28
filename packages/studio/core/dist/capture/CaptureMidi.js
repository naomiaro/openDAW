import { Errors, isDefined, isUndefined, Notifier, Option, Terminable } from "@opendaw/lib-std";
import { Events } from "@opendaw/lib-dom";
import { MidiData } from "@opendaw/lib-midi";
import { Promises } from "@opendaw/lib-runtime";
import { NoteSignal } from "@opendaw/studio-adapters";
import { MidiDevices } from "../midi";
import { Capture } from "./Capture";
import { RecordMidi } from "./RecordMidi";
var warn = Errors.warn;
export class CaptureMidi extends Capture {
    #streamGenerator;
    #notifier = new Notifier();
    #filterChannel = Option.None;
    #stream = Option.None;
    constructor(manager, audioUnitBox, captureMidiBox) {
        super(manager, audioUnitBox, captureMidiBox);
        this.#streamGenerator = Promises.sequentialize(() => this.#updateStream());
        this.ownAll(captureMidiBox.channel.catchupAndSubscribe(async (owner) => {
            const channel = owner.getValue();
            this.#filterChannel = channel >= 0 ? Option.wrap(channel) : Option.None;
            if (this.armed.getValue()) {
                await this.#streamGenerator();
            }
        }), captureMidiBox.deviceId.subscribe(async () => {
            if (this.armed.getValue()) {
                await this.#streamGenerator();
            }
        }), this.armed.catchupAndSubscribe(async (owner) => {
            const armed = owner.getValue();
            if (armed) {
                await this.#streamGenerator();
            }
            else {
                this.#stopStream();
            }
        }), this.#notifier.subscribe((signal) => manager.project.engine.noteSignal(signal)), Terminable.create(() => this.#stopStream()));
    }
    notify(signal) { this.#notifier.notify(signal); }
    subscribeNotes(observer) { return this.#notifier.subscribe(observer); }
    get label() {
        return MidiDevices.get().mapOr(() => this.deviceId.getValue().match({
            none: () => this.armed.getValue() ? this.#filterChannel.match({
                none: () => `Listening to all devices`,
                some: channel => `Listening to all devices on channel '${channel}'`
            }) : "Arm to listen to MIDI device...",
            some: id => {
                const device = MidiDevices.findInputDeviceById(id);
                if (device.isEmpty()) {
                    return `⚠️ Could not find device with id '${id}'`;
                }
                const deviceName = device.unwrapOrUndefined()?.name ?? "Unknown device";
                return this.#filterChannel.match({
                    none: () => `Listening to ${deviceName}`,
                    some: channel => `Listening to ${deviceName} on channel #${channel + 1}`
                });
            }
        }), "MIDI not available");
    }
    get deviceLabel() {
        return this.deviceId.getValue()
            .flatMap(deviceId => MidiDevices.findInputDeviceById(deviceId)
            .map(device => device.name));
    }
    async prepareRecording() {
        if (MidiDevices.get().isEmpty()) {
            if (MidiDevices.canRequestMidiAccess()) {
                await MidiDevices.requestPermission();
            }
            else {
                return Errors.warn("MIDI not available");
            }
        }
        const inputs = MidiDevices.inputDevices();
        if (inputs.length === 0) {
            return;
        }
        const option = this.deviceId.getValue();
        if (option.nonEmpty()) {
            const deviceId = option.unwrap();
            if (isUndefined(inputs.find(device => deviceId === device.id))) {
                return warn(`Could not find MIDI device with id: '${deviceId}'`);
            }
        }
    }
    startRecording() {
        return RecordMidi.start({ notifier: this.#notifier, project: this.manager.project, capture: this });
    }
    async #updateStream() {
        if (MidiDevices.get().isEmpty() && MidiDevices.canRequestMidiAccess()) {
            await MidiDevices.requestPermission();
        }
        const inputs = MidiDevices.inputDevices();
        const explicit = this.deviceId.getValue().match({
            none: () => inputs,
            some: id => inputs.filter(device => id === device.id)
        });
        const activeNotes = new Int8Array(128);
        this.#stream.ifSome(terminable => terminable.terminate());
        this.#stream = Option.wrap(Terminable.many(...explicit.map(input => Events.subscribe(input, "midimessage", (event) => {
            const data = event.data;
            if (isDefined(data) &&
                this.#filterChannel.mapOr(channel => MidiData.readChannel(data) === channel, true)) {
                const pitch = MidiData.readPitch(data);
                if (MidiData.isNoteOn(data)) {
                    activeNotes[pitch]++;
                    this.#notifier.notify(NoteSignal.fromEvent(event, this.uuid));
                }
                else if (MidiData.isNoteOff(data) && activeNotes[pitch] > 0) {
                    activeNotes[pitch]--;
                    this.#notifier.notify(NoteSignal.fromEvent(event, this.uuid));
                }
            }
        })), Terminable.create(() => activeNotes.forEach((count, index) => {
            if (count > 0) {
                for (let channel = 0; channel < 16; channel++) {
                    const event = new MessageEvent("midimessage", { data: MidiData.noteOff(channel, index) });
                    const signal = NoteSignal.fromEvent(event, this.uuid);
                    for (let i = 0; i < count; i++) {
                        this.#notifier.notify(signal);
                    }
                }
            }
        }))));
    }
    #stopStream() {
        this.#stream.ifSome(terminable => terminable.terminate());
        this.#stream = Option.None;
    }
}
