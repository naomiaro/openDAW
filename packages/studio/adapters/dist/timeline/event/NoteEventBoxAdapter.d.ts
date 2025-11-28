import { NoteEvent, ppqn } from "@opendaw/lib-dsp";
import { float, int, Option, Selectable, unitValue, UUID } from "@opendaw/lib-std";
import { NoteEventBox } from "@opendaw/studio-boxes";
import { Address, Field } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
import { BoxAdapter } from "../../BoxAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { NoteEventCollectionBoxAdapter } from "../collection/NoteEventCollectionBoxAdapter";
type CopyToParams = {
    position?: ppqn;
    duration?: ppqn;
    pitch?: int;
    playCount?: int;
    events?: Field<Pointers.NoteEvents>;
};
export declare class NoteEventBoxAdapter implements NoteEvent, BoxAdapter, Selectable {
    #private;
    readonly type = "note-event";
    constructor(context: BoxAdaptersContext, box: NoteEventBox);
    onSelected(): void;
    onDeselected(): void;
    terminate(): void;
    get box(): NoteEventBox;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get position(): ppqn;
    get duration(): ppqn;
    get complete(): int;
    get velocity(): float;
    get pitch(): int;
    get cent(): number;
    get chance(): int;
    get playCount(): int;
    get playCurve(): int;
    get isSelected(): boolean;
    get collection(): Option<NoteEventCollectionBoxAdapter>;
    normalizedPitch(): unitValue;
    copyAsNoteEvent(): NoteEvent;
    copyTo(options?: CopyToParams): NoteEventBoxAdapter;
    computeCurveValue(ratio: unitValue): unitValue;
    canConsolidate(): boolean;
    consolidate(): ReadonlyArray<NoteEventBoxAdapter>;
}
export {};
//# sourceMappingURL=NoteEventBoxAdapter.d.ts.map