var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Errors, Lazy, MutableObservableOption, MutableObservableValue, Notifier, Option, Terminator } from "@opendaw/lib-std";
import { MidiData } from "@opendaw/lib-midi";
import { Promises } from "@opendaw/lib-runtime";
import { MIDIMessageSubscriber } from "./MIDIMessageSubscriber";
import { SoftwareMIDIInput } from "./SoftwareMIDIInput";
export class MidiDevices {
    static canRequestMidiAccess() { return "requestMIDIAccess" in navigator; }
    static softwareMIDIInput = new SoftwareMIDIInput();
    static #memoizedRequest = Promises.memoizeAsync(() => navigator.requestMIDIAccess({ sysex: false }));
    static async requestPermission() {
        if (this.canRequestMidiAccess()) {
            const { status, value: midiAccess, error } = await Promises.tryCatch(this.#memoizedRequest());
            if (status === "rejected") {
                console.warn(error);
                return Errors.warn("Could not request MIDI");
            }
            const numberOfInputs = midiAccess.inputs.size;
            const numberOfOutputs = midiAccess.outputs.size;
            console.debug(`MIDI access granted: ${numberOfInputs} inputs, ${numberOfOutputs} outputs`);
            this.#midiAccess.wrap(midiAccess);
        }
        else {
            return Errors.warn("This browser does not support MIDI");
        }
    }
    static get() { return this.#midiAccess; }
    static subscribeMessageEvents(observer, channel) {
        return this.get().match({
            none: () => {
                const terminator = new Terminator();
                terminator.own(this.available().subscribe(() => terminator.own(this.subscribeMessageEvents(observer, channel))));
                return terminator;
            },
            some: midi => MIDIMessageSubscriber.subscribeMessageEvents(midi, observer, channel)
        });
    }
    static inputDevices() {
        return this.externalInputDevices()
            .mapOr((inputs) => Array.from(inputs.values()).concat(this.softwareMIDIInput), [this.softwareMIDIInput]);
    }
    static findInputDeviceById(id) {
        return Option.wrap(this.inputDevices().find(input => input.id === id));
    }
    static externalInputDevices() {
        return this.get().map(({ inputs }) => Array.from(inputs.values()));
    }
    static externalOutputDevices() {
        return this.get().map(({ outputs }) => Array.from(outputs.values()));
    }
    static panic() {
        this.get().ifSome((midiAccess) => {
            for (let note = 0; note < 128; note++) {
                for (let channel = 0; channel < 16; channel++) {
                    const data = MidiData.noteOff(channel, note);
                    const event = new MessageEvent("midimessage", { data });
                    for (let input of midiAccess.inputs.values()) {
                        input.dispatchEvent(event);
                    }
                    for (let output of midiAccess.outputs.values()) {
                        output.send(data);
                    }
                }
            }
        });
    }
    static available() {
        const scope = this;
        return new class {
            #notifier = new Notifier();
            constructor() {
                const subscription = scope.get().subscribe(option => {
                    if (option.nonEmpty()) {
                        subscription.terminate();
                        this.#notifier.notify(this);
                    } // MIDIAccess cannot be turned off
                });
            }
            setValue(value) {
                if (!value || scope.#midiAccess.nonEmpty() || scope.#isRequesting) {
                    return;
                }
                console.debug("Request MIDI access");
                scope.#isRequesting = true;
                scope.requestPermission().finally(() => scope.#isRequesting = false);
            }
            getValue() { return scope.#midiAccess.nonEmpty(); }
            catchupAndSubscribe(observer) {
                observer(this);
                return this.#notifier.subscribe(observer);
            }
            subscribe(observer) {
                return this.#notifier.subscribe(observer);
            }
        };
    }
    static #isRequesting = false;
    static #midiAccess = new MutableObservableOption();
}
__decorate([
    Lazy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], MidiDevices, "available", null);
