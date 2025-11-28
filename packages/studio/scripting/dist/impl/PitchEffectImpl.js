export class PitchEffectImpl {
    key = "pitch";
    label;
    octaves;
    semiTones;
    cents;
    enabled;
    constructor(props) {
        this.label = props?.label ?? "Pitch";
        this.octaves = props?.octaves ?? 0 | 0;
        this.semiTones = props?.semiTones ?? 0 | 0;
        this.cents = props?.cents ?? 0.0;
        this.enabled = props?.enabled ?? true;
    }
}
