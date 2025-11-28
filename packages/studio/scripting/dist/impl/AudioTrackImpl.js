import { AudioRegionImpl } from "./AudioRegionImpl";
export class AudioTrackImpl {
    audioUnit;
    #regions;
    enabled;
    constructor(audioUnit, props) {
        this.audioUnit = audioUnit;
        this.#regions = [];
        this.enabled = props?.enabled ?? true;
    }
    addRegion(sample, props) {
        const region = new AudioRegionImpl(this, sample, props);
        this.#regions.push(region);
        return region;
    }
    get regions() { return this.#regions; }
}
