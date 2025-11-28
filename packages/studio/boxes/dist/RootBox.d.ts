import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Field, StringField, UnreferenceableType } from "@opendaw/lib-box";
import { PianoMode } from "./PianoMode";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type RootBoxFields = {
    1: PointerField<Pointers.Timeline>;
    2: Field<Pointers.User>;
    3: StringField;
    4: PointerField<Pointers.Groove>;
    10: Field<Pointers.ModularSetup>;
    20: Field<Pointers.AudioUnits>;
    21: Field<Pointers.AudioBusses>;
    30: Field<Pointers.AudioOutput>;
    35: Field<Pointers.MIDIDevice>;
    40: PianoMode;
    111: PointerField<Pointers.Editing>;
};
export declare class RootBox extends Box<UnreferenceableType, RootBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<RootBox>): RootBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get timeline(): PointerField<Pointers.Timeline>;
    get users(): Field<Pointers.User>;
    get created(): StringField;
    get groove(): PointerField<Pointers.Groove>;
    get modularSetups(): Field<Pointers.ModularSetup>;
    get audioUnits(): Field<Pointers.AudioUnits>;
    get audioBusses(): Field<Pointers.AudioBusses>;
    get outputDevice(): Field<Pointers.AudioOutput>;
    get outputMidiDevices(): Field<Pointers.MIDIDevice>;
    get pianoMode(): PianoMode;
    get editingChannel(): PointerField<Pointers.Editing>;
    initializeFields(): RootBoxFields;
}
//# sourceMappingURL=RootBox.d.ts.map