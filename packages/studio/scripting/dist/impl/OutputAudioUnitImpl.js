import { AudioUnitImpl } from "./AudioUnitImpl";
export class OutputAudioUnitImpl extends AudioUnitImpl {
    kind = "output";
    constructor() { super(); }
}
