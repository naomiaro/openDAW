import { Interpolation } from "@opendaw/lib-dsp";
export class ValueEventImpl {
    position;
    value;
    interpolation;
    index = 0;
    constructor(props) {
        this.position = props?.position ?? 0.0;
        this.value = props?.value ?? 0.0;
        this.interpolation = props?.interpolation ?? Interpolation.Linear;
    }
}
