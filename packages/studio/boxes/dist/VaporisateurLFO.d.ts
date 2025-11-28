import "@opendaw/lib-std";
import { ObjectField, FieldConstruct, Int32Field, Float32Field, BooleanField, UnreferenceableType } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export type VaporisateurLFOFields = {
    1: Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    2: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    3: BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    10: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    11: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    12: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class VaporisateurLFO extends ObjectField<VaporisateurLFOFields> {
    static create(construct: FieldConstruct<UnreferenceableType>): VaporisateurLFO;
    private constructor();
    get waveform(): Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get rate(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get sync(): BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get targetTune(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get targetCutoff(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get targetVolume(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): VaporisateurLFOFields;
}
//# sourceMappingURL=VaporisateurLFO.d.ts.map