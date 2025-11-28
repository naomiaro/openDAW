import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, StringField, PointerField, Field, Int32Field, Float32Field, BooleanField } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type AudioUnitBoxFields = {
    1: StringField;
    2: PointerField<Pointers.AudioUnits>;
    3: Field<Pointers.Editing>;
    11: Int32Field;
    12: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    13: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    14: BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    15: BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    20: Field<Pointers.TrackCollection>;
    21: Field<Pointers.MidiEffectHost>;
    22: Field<Pointers.InstrumentHost | Pointers.AudioOutput>;
    23: Field<Pointers.AudioEffectHost>;
    24: Field<Pointers.AuxSend>;
    25: PointerField<Pointers.AudioOutput>;
    26: PointerField<Pointers.Capture>;
};
export declare class AudioUnitBox extends Box<Pointers.Selection | Pointers.Automation, AudioUnitBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<AudioUnitBox>): AudioUnitBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get type(): StringField;
    get collection(): PointerField<Pointers.AudioUnits>;
    get editing(): Field<Pointers.Editing>;
    get index(): Int32Field;
    get volume(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get panning(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get mute(): BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get solo(): BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get tracks(): Field<Pointers.TrackCollection>;
    get midiEffects(): Field<Pointers.MidiEffectHost>;
    get input(): Field<Pointers.InstrumentHost | Pointers.AudioOutput>;
    get audioEffects(): Field<Pointers.AudioEffectHost>;
    get auxSends(): Field<Pointers.AuxSend>;
    get output(): PointerField<Pointers.AudioOutput>;
    get capture(): PointerField<Pointers.Capture>;
    initializeFields(): AudioUnitBoxFields;
}
//# sourceMappingURL=AudioUnitBox.d.ts.map