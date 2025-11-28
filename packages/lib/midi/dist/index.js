const key = Symbol.for("@openDAW/lib-midi");
if (globalThis[key]) {
    console.debug(`%c${key.description}%c is already available in ${globalThis.constructor.name}.`, "color: hsl(10, 83%, 60%)", "color: inherit");
}
else {
    globalThis[key] = true;
    console.debug(`%c${key.description}%c is now available in ${globalThis.constructor.name}.`, "color: hsl(200, 83%, 60%)", "color: inherit");
}
export * from "./Channel";
export * from "./Chunk";
export * from "./ControlEvent";
export * from "./MidiEventVisitor";
export * from "./ControlType";
export * from "./Event";
export * from "./MetaType";
export * from "./MidiData";
export * from "./MidiFile";
export * from "./MidiFileDecoder";
export * from "./MidiFileFormat";
export * from "./MidiTrack";
