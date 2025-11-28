import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, Field, Int32Field, Float32Field, UnreferenceableType } from "@opendaw/lib-box";
import { Signature } from "./Signature";
import { LoopArea } from "./LoopArea";
import { MarkerTrack } from "./MarkerTrack";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type TimelineBoxFields = {
    1: Field<Pointers.Timeline>;
    10: Signature;
    11: LoopArea;
    20: Field<Pointers.MarkerTrack>;
    21: MarkerTrack;
    30: Int32Field;
    31: Float32Field;
};
export declare class TimelineBox extends Box<UnreferenceableType, TimelineBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<TimelineBox>): TimelineBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get root(): Field<Pointers.Timeline>;
    get signature(): Signature;
    get loopArea(): LoopArea;
    get deprecatedMarkerTrack(): Field<Pointers.MarkerTrack>;
    get markerTrack(): MarkerTrack;
    get durationInPulses(): Int32Field;
    get bpm(): Float32Field;
    initializeFields(): TimelineBoxFields;
}
//# sourceMappingURL=TimelineBox.d.ts.map