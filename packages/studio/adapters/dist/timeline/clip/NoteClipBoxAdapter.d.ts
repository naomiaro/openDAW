import { int, Maybe, ObservableValue, Observer, Option, Subscription, UUID } from "@opendaw/lib-std";
import { EventCollection, ppqn } from "@opendaw/lib-dsp";
import { Address, Int32Field } from "@opendaw/lib-box";
import { NoteClipBox } from "@opendaw/studio-boxes";
import { NoteEventCollectionBoxAdapter } from "../collection/NoteEventCollectionBoxAdapter";
import { ClipBoxAdapter, ClipBoxAdapterVisitor } from "../ClipBoxAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { NoteEventBoxAdapter } from "../event/NoteEventBoxAdapter";
import { TrackBoxAdapter } from "../TrackBoxAdapter";
export declare class NoteClipBoxAdapter implements ClipBoxAdapter<NoteEventCollectionBoxAdapter> {
    #private;
    readonly type = "note-clip";
    constructor(context: BoxAdaptersContext, box: NoteClipBox);
    catchupAndSubscribeSelected(observer: Observer<ObservableValue<boolean>>): Subscription;
    subscribeChange(observer: Observer<void>): Subscription;
    accept<R>(visitor: ClipBoxAdapterVisitor<R>): Maybe<R>;
    consolidate(): void;
    clone(consolidate: boolean): void;
    onSelected(): void;
    onDeselected(): void;
    get isSelected(): boolean;
    terminate(): void;
    get box(): NoteClipBox;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get indexField(): Int32Field;
    get duration(): ppqn;
    get mute(): boolean;
    get hue(): int;
    get events(): Option<EventCollection<NoteEventBoxAdapter>>;
    get hasCollection(): boolean;
    get optCollection(): Option<NoteEventCollectionBoxAdapter>;
    get label(): string;
    get trackBoxAdapter(): Option<TrackBoxAdapter>;
    get isMirrowed(): boolean;
    get canMirror(): boolean;
    toString(): string;
}
//# sourceMappingURL=NoteClipBoxAdapter.d.ts.map