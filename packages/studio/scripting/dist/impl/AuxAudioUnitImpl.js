import { AudioUnitImpl } from "./AudioUnitImpl";
import { SendImpl } from "./SendImpl";
import { Arrays } from "@opendaw/lib-std";
export class AuxAudioUnitImpl extends AudioUnitImpl {
    kind = "auxiliary";
    #sends = [];
    label;
    constructor(props) {
        super(props);
        this.label = props?.label ?? "Fx Track";
    }
    addSend(target, props) {
        const send = new SendImpl(target, props);
        this.#sends.push(send);
        return send;
    }
    removeSend(send) { Arrays.remove(this.#sends, send); }
    get sends() { return this.#sends; }
}
