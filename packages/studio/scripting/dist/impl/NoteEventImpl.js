export class NoteEventImpl {
    position;
    duration;
    pitch;
    cents;
    velocity;
    constructor(props) {
        this.position = props?.position ?? 0.0;
        this.duration = props?.duration ?? PPQN.SemiQuaver;
        this.pitch = props?.pitch ?? 60;
        this.cents = props?.cents ?? 0;
        this.velocity = props?.velocity ?? 1.0;
    }
}
