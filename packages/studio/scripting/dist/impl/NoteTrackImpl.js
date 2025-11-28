import { NoteRegionImpl } from "./NoteRegionImpl";
export class NoteTrackImpl {
    audioUnit;
    #regions;
    enabled;
    constructor(audioUnit, props) {
        this.audioUnit = audioUnit;
        this.#regions = [];
        this.enabled = props?.enabled ?? true;
    }
    addRegion(props) {
        const region = new NoteRegionImpl(this, props);
        this.#regions.push(region);
        return region;
    }
    get regions() { return this.#regions; }
}
