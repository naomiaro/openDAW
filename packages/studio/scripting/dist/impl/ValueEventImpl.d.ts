import { ValueEvent } from "../Api";
import { Interpolation, ppqn } from "@opendaw/lib-dsp";
import { unitValue } from "@opendaw/lib-std";
export declare class ValueEventImpl implements ValueEvent {
    position: ppqn;
    value: unitValue;
    interpolation: Interpolation;
    index: int;
    constructor(props?: Partial<ValueEvent>);
}
//# sourceMappingURL=ValueEventImpl.d.ts.map