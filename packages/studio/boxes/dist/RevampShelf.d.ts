import "@opendaw/lib-std";
import { ObjectField, FieldConstruct, BooleanField, Float32Field, UnreferenceableType } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export type RevampShelfFields = {
    1: BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    10: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    11: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class RevampShelf extends ObjectField<RevampShelfFields> {
    static create(construct: FieldConstruct<UnreferenceableType>): RevampShelf;
    private constructor();
    get enabled(): BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get frequency(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get gain(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): RevampShelfFields;
}
//# sourceMappingURL=RevampShelf.d.ts.map