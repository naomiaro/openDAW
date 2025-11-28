import { float, int, Procedure, Subscription, Terminable } from "@opendaw/lib-std";
import { Address } from "@opendaw/lib-box";
import { Messenger } from "@opendaw/lib-runtime";
export declare class LiveStreamReceiver implements Terminable {
    #private;
    static ID: int;
    constructor();
    connect(messenger: Messenger): Terminable;
    subscribeFloat(address: Address, procedure: Procedure<float>): Subscription;
    subscribeInteger(address: Address, procedure: Procedure<int>): Subscription;
    subscribeFloats(address: Address, procedure: Procedure<Float32Array>): Subscription;
    subscribeIntegers(address: Address, procedure: Procedure<Int32Array>): Subscription;
    subscribeByteArray(address: Address, procedure: Procedure<Int8Array>): Subscription;
    terminate(): void;
}
//# sourceMappingURL=LiveStreamReceiver.d.ts.map