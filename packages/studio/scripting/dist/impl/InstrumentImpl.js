export class InstrumentImpl {
    audioUnit;
    name;
    props;
    constructor(audioUnit, name, props) {
        this.audioUnit = audioUnit;
        this.name = name;
        this.props = props;
    }
}
