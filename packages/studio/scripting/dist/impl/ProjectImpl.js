import { OutputAudioUnitImpl } from "./OutputAudioUnitImpl";
import { InstrumentAudioUnitImpl } from "./InstrumentAudioUnitImpl";
import { AuxAudioUnitImpl } from "./AuxAudioUnitImpl";
import { GroupAudioUnitImpl } from "./GroupAudioUnitImpl";
import { ProjectConverter } from "../ProjectConverter";
export class ProjectImpl {
    #api;
    output;
    name;
    bpm;
    timeSignature = { numerator: 4, denominator: 4 };
    #instruments = [];
    #auxUnits = [];
    #groupUnits = [];
    constructor(api, name) {
        this.#api = api;
        this.name = name;
        this.bpm = 120;
        this.output = new OutputAudioUnitImpl();
    }
    openInStudio() {
        this.#api.openProject(ProjectConverter.toSkeleton(this).boxGraph.toArrayBuffer(), this.name);
    }
    addInstrumentUnit(name, props) {
        const unit = new InstrumentAudioUnitImpl(name, props);
        this.#instruments.push(unit);
        return unit;
    }
    addAuxUnit(props) {
        const unit = new AuxAudioUnitImpl(props);
        this.#auxUnits.push(unit);
        return unit;
    }
    addGroupUnit(props) {
        const unit = new GroupAudioUnitImpl(props);
        this.#groupUnits.push(unit);
        return unit;
    }
    get instrumentUnits() { return this.#instruments; }
    get auxUnits() { return this.#auxUnits; }
    get groupUnits() { return this.#groupUnits; }
}
