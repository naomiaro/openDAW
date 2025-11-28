import { byte, Comparator, int } from "@opendaw/lib-std";
import { Event } from "./Event";
import { ControlType } from "./ControlType";
import { MidiEventVisitor } from "./MidiEventVisitor";
import { MidiFileDecoder } from "./MidiFileDecoder";
export declare class ControlEvent implements Event<ControlType> {
    readonly ticks: int;
    readonly type: ControlType;
    readonly param0: byte;
    readonly param1: byte;
    static readonly Comparator: Comparator<ControlEvent>;
    constructor(ticks: int, type: ControlType, param0: byte, param1: byte);
    static decode(decoder: MidiFileDecoder, type: int, ticks: int): ControlEvent | null;
    accept(visitor: MidiEventVisitor): void;
    toString(): string;
}
//# sourceMappingURL=ControlEvent.d.ts.map