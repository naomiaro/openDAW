import { ppqn } from "@opendaw/lib-dsp";
import { int, Maybe, ObservableValue, Observer, Option, Subscription, UUID } from "@opendaw/lib-std";
import { AudioClipBox } from "@opendaw/studio-boxes";
import { Address, Int32Field } from "@opendaw/lib-box";
import { ClipBoxAdapter, ClipBoxAdapterVisitor } from "../ClipBoxAdapter";
import { TrackBoxAdapter } from "../TrackBoxAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { AudioFileBoxAdapter } from "../../audio/AudioFileBoxAdapter";
export declare class AudioClipBoxAdapter implements ClipBoxAdapter<never> {
    #private;
    readonly type = "audio-clip";
    constructor(context: BoxAdaptersContext, box: AudioClipBox);
    catchupAndSubscribeSelected(observer: Observer<ObservableValue<boolean>>): Subscription;
    subscribeChange(observer: Observer<void>): Subscription;
    accept<R>(visitor: ClipBoxAdapterVisitor<R>): Maybe<R>;
    consolidate(): void;
    clone(_mirrored: boolean): void;
    onSelected(): void;
    onDeselected(): void;
    get isSelected(): boolean;
    terminate(): void;
    get box(): AudioClipBox;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get indexField(): Int32Field;
    get duration(): ppqn;
    get mute(): boolean;
    get hue(): int;
    get gain(): number;
    get file(): AudioFileBoxAdapter;
    get hasCollection(): boolean;
    get optCollection(): Option<never>;
    get label(): string;
    get trackBoxAdapter(): Option<TrackBoxAdapter>;
    get isMirrowed(): boolean;
    get canMirror(): boolean;
    toString(): string;
}
//# sourceMappingURL=AudioClipBoxAdapter.d.ts.map