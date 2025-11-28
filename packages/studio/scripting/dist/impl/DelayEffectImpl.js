export class DelayEffectImpl {
    key = "delay";
    label;
    enabled;
    delay;
    feedback;
    cross;
    filter;
    wet;
    dry;
    constructor(props) {
        this.label = props?.label ?? "Delay";
        this.enabled = props?.enabled ?? true;
        this.delay = props?.delay ?? 4;
        this.feedback = props?.feedback ?? 0.5;
        this.cross = props?.cross ?? 0;
        this.filter = props?.filter ?? 0;
        this.wet = props?.wet ?? -6.0;
        this.dry = props?.dry ?? 0.0;
    }
}
