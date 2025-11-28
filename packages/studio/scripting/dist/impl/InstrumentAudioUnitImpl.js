import { AudioUnitImpl } from "./AudioUnitImpl";
import { SendImpl } from "./SendImpl";
import { InstrumentImpl } from "./InstrumentImpl";
import { Arrays } from "@opendaw/lib-std";
export class InstrumentAudioUnitImpl extends AudioUnitImpl {
    kind = "instrument";
    #sends = [];
    instrument;
    constructor(instrumentName, props) {
        super();
        this.instrument = new InstrumentImpl(this, instrumentName, props);
    }
    setInstrument(instrumentName, props) {
        this.instrument = new InstrumentImpl(this, instrumentName, props);
        return this.instrument;
    }
    addSend(target, props) {
        const send = new SendImpl(target, props);
        this.#sends.push(send);
        return send;
    }
    removeSend(send) { Arrays.remove(this.#sends, send); }
    get sends() { return this.#sends; }
}
