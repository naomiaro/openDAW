import "@opendaw/lib-std";
import { ObjectField, FieldConstruct, BooleanField, Float32Field, UnreferenceableType } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export type RevampBellFields = {
    1: BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    10: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    11: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    12: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class RevampBell extends ObjectField<RevampBellFields> {
    static create(construct: FieldConstruct<UnreferenceableType>): RevampBell;
    private constructor();
    get enabled(): BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get frequency(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get gain(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get q(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): RevampBellFields;
}
//# sourceMappingURL=RevampBell.d.ts.map