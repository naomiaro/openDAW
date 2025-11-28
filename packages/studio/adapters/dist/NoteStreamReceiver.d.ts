import { byte, Observer, Subscription, Terminable } from "@opendaw/lib-std";
import { Address } from "@opendaw/lib-box";
import { LiveStreamReceiver } from "@opendaw/lib-fusion";
export declare class NoteStreamReceiver implements Terminable {
    #private;
    constructor(receiver: LiveStreamReceiver, address: Address);
    isNoteOn(note: byte): boolean;
    isAnyNoteOn(): boolean;
    subscribe(observer: Observer<this>): Subscription;
    terminate(): void;
}
//# sourceMappingURL=NoteStreamReceiver.d.ts.map