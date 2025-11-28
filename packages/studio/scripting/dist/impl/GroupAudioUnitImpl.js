import { AudioUnitImpl } from "./AudioUnitImpl";
import { SendImpl } from "./SendImpl";
import { Arrays } from "@opendaw/lib-std";
export class GroupAudioUnitImpl extends AudioUnitImpl {
    kind = "group";
    #sends = [];
    label;
    constructor(props) {
        super(props);
        this.label = props?.label ?? "Subgroup";
    }
    addSend(target, props) {
        const send = new SendImpl(target, props);
        this.#sends.push(send);
        return send;
    }
    removeSend(send) { Arrays.remove(this.#sends, send); }
    get sends() { return this.#sends; }
}
