import { NoteEventCollectionBox } from "@opendaw/studio-boxes";
import { Coordinates, float, int, Observer, SelectableLocator, Subscription, UUID } from "@opendaw/lib-std";
import { Address } from "@opendaw/lib-box";
import { EventCollection, ppqn } from "@opendaw/lib-dsp";
import { BoxAdapter } from "../../BoxAdapter";
import { NoteEventBoxAdapter } from "../event/NoteEventBoxAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
type CreateEventParams = {
    position: ppqn;
    duration: ppqn;
    pitch: int;
    cent: number;
    velocity: float;
    chance: int;
    playCount: int;
};
export declare class NoteEventCollectionBoxAdapter implements BoxAdapter, SelectableLocator<NoteEventBoxAdapter, ppqn, int> {
    #private;
    constructor(context: BoxAdaptersContext, box: NoteEventCollectionBox);
    copy(): NoteEventCollectionBoxAdapter;
    createEvent({ position, duration, velocity, pitch, chance, playCount, cent }: CreateEventParams): NoteEventBoxAdapter;
    subscribeChange(observer: Observer<this>): Subscription;
    selectable(): Iterable<NoteEventBoxAdapter>;
    selectableAt(coordinates: Coordinates<ppqn, int>): Iterable<NoteEventBoxAdapter>;
    selectablesBetween(begin: Coordinates<ppqn, int>, end: Coordinates<ppqn, int>): Iterable<NoteEventBoxAdapter>;
    requestSorting(): void;
    onEventPropertyChanged(): void;
    terminate(): void;
    get box(): NoteEventCollectionBox;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get numOwners(): int;
    get events(): EventCollection<NoteEventBoxAdapter>;
    get minPitch(): int;
    get maxPitch(): int;
    get maxDuration(): number;
    toString(): string;
}
export {};
//# sourceMappingURL=NoteEventCollectionBoxAdapter.d.ts.map