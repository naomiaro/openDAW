import "@opendaw/lib-std";
import { ObjectField, FieldConstruct, Float32Field, UnreferenceableType } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export type VaporisateurNoiseFields = {
    1: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    2: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    3: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    4: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class VaporisateurNoise extends ObjectField<VaporisateurNoiseFields> {
    static create(construct: FieldConstruct<UnreferenceableType>): VaporisateurNoise;
    private constructor();
    get attack(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get hold(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get release(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get volume(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): VaporisateurNoiseFields;
}
//# sourceMappingURL=VaporisateurNoise.d.ts.map