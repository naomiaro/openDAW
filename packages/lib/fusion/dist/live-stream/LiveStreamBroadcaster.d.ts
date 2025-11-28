import { Exec, float, int, Provider, Terminable } from "@opendaw/lib-std";
import { Address } from "@opendaw/lib-box";
import { Messenger } from "@opendaw/lib-runtime";
export declare class LiveStreamBroadcaster {
    #private;
    static create(messenger: Messenger, name: string): LiveStreamBroadcaster;
    private constructor();
    flush(): void;
    broadcastFloat(address: Address, provider: Provider<float>): Terminable;
    broadcastInteger(address: Address, provider: Provider<int>): Terminable;
    broadcastFloats(address: Address, values: Float32Array, before?: Exec, after?: Exec): Terminable;
    broadcastIntegers(address: Address, values: Int32Array, update: Exec): Terminable;
    broadcastByteArray(address: Address, values: Int8Array, update: Exec): Terminable;
    terminate(): void;
}
//# sourceMappingURL=LiveStreamBroadcaster.d.ts.map