import "@opendaw/lib-std";
import { ObjectField, FieldConstruct, Int32Field, Float32Field, UnreferenceableType } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export type VaporisateurOscFields = {
    1: Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    2: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    3: Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    4: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class VaporisateurOsc extends ObjectField<VaporisateurOscFields> {
    static create(construct: FieldConstruct<UnreferenceableType>): VaporisateurOsc;
    private constructor();
    get waveform(): Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get volume(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get octave(): Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get tune(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): VaporisateurOscFields;
}
//# sourceMappingURL=VaporisateurOsc.d.ts.map