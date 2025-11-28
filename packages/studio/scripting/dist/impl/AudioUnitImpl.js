import { NoteTrackImpl } from "./NoteTrackImpl";
import { ValueTrackImpl } from "./ValueTrackImpl";
import { DelayEffectImpl } from "./DelayEffectImpl";
import { PitchEffectImpl } from "./PitchEffectImpl";
import { AudioTrackImpl } from "./AudioTrackImpl";
export class AudioUnitImpl {
    #audioEffects;
    #midiEffects;
    #noteTracks;
    #valueTracks;
    #audioTracks;
    output;
    volume;
    panning;
    mute;
    solo;
    constructor(props) {
        this.#audioEffects = [];
        this.#midiEffects = [];
        this.#noteTracks = [];
        this.#audioTracks = [];
        this.#valueTracks = [];
        this.output = props?.output;
        this.volume = props?.volume ?? 0.0;
        this.panning = props?.panning ?? 0.0;
        this.mute = props?.mute ?? false;
        this.solo = props?.solo ?? false;
    }
    addMIDIEffect(type, props) {
        let effect;
        switch (type) {
            case "pitch":
                effect = new PitchEffectImpl(props);
                break;
            default:
                throw new Error(`Unknown MIDI effect type: ${type}`);
        }
        this.#midiEffects.push(effect);
        return effect;
    }
    addAudioEffect(type, props) {
        let effect;
        switch (type) {
            case "delay":
                effect = new DelayEffectImpl(props);
                break;
            default:
                throw new Error(`Unknown Audio effect type: ${type}`);
        }
        this.#audioEffects.push(effect);
        return effect;
    }
    addNoteTrack(props) {
        const track = new NoteTrackImpl(this, props);
        this.#noteTracks.push(track);
        return track;
    }
    addAudioTrack(props) {
        const track = new AudioTrackImpl(this, props);
        this.#audioTracks.push(track);
        return track;
    }
    addValueTrack(device, parameter, props) {
        const track = new ValueTrackImpl(this, device, parameter, props);
        this.#valueTracks.push(track);
        return track;
    }
    get audioEffects() { return this.#audioEffects; }
    get midiEffects() { return this.#midiEffects; }
    get noteTracks() { return this.#noteTracks; }
    get audioTracks() { return this.#audioTracks; }
    get valueTracks() { return this.#valueTracks; }
}
