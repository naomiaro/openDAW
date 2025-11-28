import "@opendaw/lib-std";
import { ObjectField, FieldConstruct, BooleanField, Float32Field, Int32Field, UnreferenceableType } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export type RevampPassFields = {
    1: BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    10: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    11: Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    12: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class RevampPass extends ObjectField<RevampPassFields> {
    static create(construct: FieldConstruct<UnreferenceableType>): RevampPass;
    private constructor();
    get enabled(): BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get frequency(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get order(): Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get q(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): RevampPassFields;
}
//# sourceMappingURL=RevampPass.d.ts.map