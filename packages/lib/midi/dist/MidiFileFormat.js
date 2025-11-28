export class MidiFileFormat {
    tracks;
    formatType;
    timeDivision;
    constructor(tracks, formatType, timeDivision) {
        this.tracks = tracks;
        this.formatType = formatType;
        this.timeDivision = timeDivision;
    }
}
