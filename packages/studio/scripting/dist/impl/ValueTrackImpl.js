import { ValueRegionImpl } from "./ValueRegionImpl";
export class ValueTrackImpl {
    audioUnit;
    device;
    parameter;
    #regions;
    enabled;
    constructor(audioUnit, device, parameter, props) {
        this.audioUnit = audioUnit;
        this.device = device;
        this.parameter = parameter;
        this.enabled = props?.enabled ?? true;
        this.#regions = [];
    }
    addRegion(props) {
        const region = new ValueRegionImpl(this, props);
        this.#regions.push(region);
        return region;
    }
    get regions() { return this.#regions; }
}
