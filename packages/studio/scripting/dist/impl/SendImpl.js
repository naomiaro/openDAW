export class SendImpl {
    target;
    amount;
    pan;
    mode;
    constructor(target, props) {
        this.target = target;
        this.amount = props?.amount ?? 0.0;
        this.pan = props?.pan ?? 0.0;
        this.mode = props?.mode ?? "post";
    }
}
