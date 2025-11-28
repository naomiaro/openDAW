import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, StringField, BooleanField, Float32Field } from "@opendaw/lib-box";
import { RevampPass } from "./RevampPass";
import { RevampShelf } from "./RevampShelf";
import { RevampBell } from "./RevampBell";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type RevampDeviceBoxFields = {
    1: PointerField<Pointers.AudioEffectHost>;
    2: Int32Field;
    3: StringField;
    4: BooleanField;
    5: BooleanField;
    10: RevampPass;
    11: RevampShelf;
    12: RevampBell;
    13: RevampBell;
    14: RevampBell;
    15: RevampShelf;
    16: RevampPass;
    17: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class RevampDeviceBox extends Box<Pointers.Device | Pointers.Selection, RevampDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<RevampDeviceBox>): RevampDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.AudioEffectHost>;
    get index(): Int32Field;
    get label(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get highPass(): RevampPass;
    get lowShelf(): RevampShelf;
    get lowBell(): RevampBell;
    get midBell(): RevampBell;
    get highBell(): RevampBell;
    get highShelf(): RevampShelf;
    get lowPass(): RevampPass;
    get gain(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): RevampDeviceBoxFields;
}
//# sourceMappingURL=RevampDeviceBox.d.ts.map