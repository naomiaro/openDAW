import { byte, JSONValue, Provider, Terminable } from "@opendaw/lib-std";
import { Address, AddressJSON, PrimitiveField, PrimitiveValues } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
import { Project } from "../project";
export type MIDIConnectionJSON = ({
    type: "control";
    controlId: byte;
}) & {
    address: AddressJSON;
    channel: byte;
} & JSONValue;
export interface MIDIConnection extends Terminable {
    address: Address;
    label: Provider<string>;
    toJSON(): MIDIConnectionJSON;
}
export declare class MIDILearning implements Terminable {
    #private;
    constructor(project: Project);
    hasMidiConnection(address: Address): boolean;
    forgetMidiConnection(address: Address): void;
    learnMIDIControls(field: PrimitiveField<PrimitiveValues, Pointers.MidiControl | Pointers>): Promise<void>;
    toJSON(): ReadonlyArray<MIDIConnectionJSON>;
    terminate(): void;
}
//# sourceMappingURL=MIDILearning.d.ts.map