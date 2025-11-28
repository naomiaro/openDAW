import { Errors, isDefined, isNotNull, RuntimeNotifier, Terminator } from "@opendaw/lib-std";
import { Address } from "@opendaw/lib-box";
import { MidiData } from "@opendaw/lib-midi";
import { MidiDevices } from "./MidiDevices";
import { AnimationFrame } from "@opendaw/lib-dom";
export class MIDILearning {
    #terminator = new Terminator();
    #project;
    #connections;
    constructor(project) {
        this.#project = project;
        this.#connections = Address.newSet(connection => connection.address);
    }
    hasMidiConnection(address) { return this.#connections.hasKey(address); }
    forgetMidiConnection(address) { this.#connections.removeByKey(address).terminate(); }
    async learnMIDIControls(field) {
        if (!MidiDevices.canRequestMidiAccess()) {
            return;
        }
        await MidiDevices.requestPermission();
        const learnLifecycle = this.#terminator.spawn();
        const abortController = new AbortController();
        learnLifecycle.own(MidiDevices.subscribeMessageEvents((event) => {
            const data = event.data;
            if (data === null) {
                return;
            }
            if (MidiData.isController(data)) {
                learnLifecycle.terminate();
                abortController.abort(Errors.AbortError);
                return this.#startListeningControl(field, MidiData.readChannel(data), MidiData.readParam1(data), event);
            }
        }));
        return RuntimeNotifier.info({
            headline: "Learn Midi Keys...",
            message: "Hit a key on your midi-device to learn a connection.",
            okText: "Cancel",
            abortSignal: abortController.signal
        }).then(() => learnLifecycle.terminate(), Errors.CatchAbort);
    }
    toJSON() {
        return this.#connections.values().map(connection => connection.toJSON());
    }
    terminate() {
        this.#killAllConnections();
        this.#terminator.terminate();
    }
    #startListeningControl(field, channel, controlId, event) {
        console.debug(`startListeningControl channel: ${channel}, controlId: ${controlId}`);
        const { observer, terminate } = this.#createMidiControlObserver(this.#project, this.#project.parameterFieldAdapters.get(field.address), controlId);
        if (isDefined(event)) {
            observer(event);
        }
        const subscription = MidiDevices.subscribeMessageEvents(observer, channel);
        this.#connections.add({
            address: field.address,
            toJSON: () => ({
                type: "control",
                address: field.address.toJSON(),
                channel,
                controlId
            }),
            label: () => this.#project.parameterFieldAdapters.get(field.address).name,
            terminate: () => {
                terminate();
                subscription.terminate();
            }
        });
    }
    #killAllConnections() {
        this.#connections.forEach(({ terminate }) => terminate());
        this.#connections.clear();
    }
    #createMidiControlObserver(project, adapter, controlId) {
        const registration = adapter.registerMidiControl();
        let pendingValue = null;
        const update = (value) => project.editing.modify(() => adapter.setValue(adapter.valueMapping.y(value)), false);
        return {
            observer: (event) => {
                const data = event.data;
                if (data === null) {
                    return;
                }
                if (MidiData.isController(data) && MidiData.readParam1(data) === controlId) {
                    const value = MidiData.asValue(data);
                    if (pendingValue === null) {
                        update(value);
                        pendingValue = value;
                        AnimationFrame.once(() => {
                            if (isNotNull(pendingValue)) {
                                update(pendingValue);
                                pendingValue = null;
                            }
                        });
                    }
                    else {
                        pendingValue = value;
                    }
                }
            },
            terminate: () => {
                pendingValue = null;
                registration.terminate();
            }
        };
    }
}
