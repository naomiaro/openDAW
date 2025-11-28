import { DefaultObservableValue, MappedMutableObservableValue, Option, Terminator } from "@opendaw/lib-std";
export class Capture {
    #terminator = new Terminator();
    #manager;
    #audioUnitBox;
    #captureBox;
    #deviceId;
    #armed;
    constructor(manager, audioUnitBox, captureBox) {
        this.#manager = manager;
        this.#audioUnitBox = audioUnitBox;
        this.#captureBox = captureBox;
        this.#deviceId = new MappedMutableObservableValue(captureBox.deviceId, {
            fx: x => x.length > 0 ? Option.wrap(x) : Option.None,
            fy: y => y.match({ none: () => "", some: x => x })
        });
        this.#armed = this.#terminator.own(new DefaultObservableValue(false));
        this.#terminator.ownAll(this.#captureBox.deviceId.catchupAndSubscribe(owner => {
            const id = owner.getValue();
            this.#deviceId.setValue(id.length > 0 ? Option.wrap(id) : Option.None);
        }));
    }
    get uuid() { return this.#audioUnitBox.address.uuid; }
    get manager() { return this.#manager; }
    get audioUnitBox() { return this.#audioUnitBox; }
    get captureBox() { return this.#captureBox; }
    get armed() { return this.#armed; }
    get deviceId() { return this.#deviceId; }
    own(terminable) { return this.#terminator.own(terminable); }
    ownAll(...terminables) { this.#terminator.ownAll(...terminables); }
    terminate() { this.#terminator.terminate(); }
}
