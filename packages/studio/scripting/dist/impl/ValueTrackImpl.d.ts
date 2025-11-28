import { AnyDevice, AudioUnit, ValueRegion, ValueRegionProps, ValueTrack } from "../Api";
import { ValueRegionImpl } from "./ValueRegionImpl";
import { AudioUnitImpl } from "./AudioUnitImpl";
export declare class ValueTrackImpl<DEVICE extends AnyDevice = AnyDevice, PARAMETER extends keyof DEVICE = keyof DEVICE> implements ValueTrack {
    #private;
    readonly audioUnit: AudioUnit;
    readonly device: DEVICE;
    readonly parameter: PARAMETER;
    enabled: boolean;
    constructor(audioUnit: AudioUnitImpl, device: DEVICE, parameter: PARAMETER, props?: Partial<ValueTrack>);
    addRegion(props?: ValueRegionProps): ValueRegion;
    get regions(): ReadonlyArray<ValueRegionImpl>;
}
//# sourceMappingURL=ValueTrackImpl.d.ts.map