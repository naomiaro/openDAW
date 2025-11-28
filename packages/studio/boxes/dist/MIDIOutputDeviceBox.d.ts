import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, StringField, BooleanField, Int32Field, Field } from "@opendaw/lib-box";
import { Device } from "./Device";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type MIDIOutputDeviceBoxFields = {
    1: PointerField<Pointers.InstrumentHost>;
    2: StringField;
    3: StringField;
    4: BooleanField;
    5: BooleanField;
    10: Device;
    11: Int32Field;
    12: Int32Field;
    13: Field<Pointers.Parameter>;
    14: PointerField<Pointers.MIDIDevice>;
};
export declare class MIDIOutputDeviceBox extends Box<Pointers.Device | Pointers.Selection, MIDIOutputDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<MIDIOutputDeviceBox>): MIDIOutputDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.InstrumentHost>;
    get label(): StringField;
    get icon(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get deprecatedDevice(): Device;
    get channel(): Int32Field;
    get deprecatedDelay(): Int32Field;
    get parameters(): Field<Pointers.Parameter>;
    get device(): PointerField<Pointers.MIDIDevice>;
    initializeFields(): MIDIOutputDeviceBoxFields;
}
//# sourceMappingURL=MIDIOutputDeviceBox.d.ts.map