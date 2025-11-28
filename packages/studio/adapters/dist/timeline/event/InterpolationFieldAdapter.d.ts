import { Pointers } from "@opendaw/studio-enums";
import { Int32Field } from "@opendaw/lib-box";
import { Interpolation } from "@opendaw/lib-dsp";
export declare namespace InterpolationFieldAdapter {
    const write: (field: Int32Field<Pointers.ValueInterpolation>, value: Interpolation) => void;
    const read: (field: Int32Field<Pointers.ValueInterpolation>) => Interpolation;
}
//# sourceMappingURL=InterpolationFieldAdapter.d.ts.map