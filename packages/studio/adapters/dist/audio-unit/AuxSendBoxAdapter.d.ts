import { Address, Box, Int32Field } from "@opendaw/lib-box";
import { float, Observer, Option, Subscription, UUID } from "@opendaw/lib-std";
import { AuxSendBox } from "@opendaw/studio-boxes";
import { BoxAdapter } from "../BoxAdapter";
import { AudioBusBoxAdapter } from "./AudioBusBoxAdapter";
import { BoxAdaptersContext } from "../BoxAdaptersContext";
import { AutomatableParameterFieldAdapter } from "../AutomatableParameterFieldAdapter";
export declare class AuxSendBoxAdapter implements BoxAdapter {
    #private;
    constructor(context: BoxAdaptersContext, box: AuxSendBox);
    catchupAndSubscribeBusChanges(observer: Observer<Option<AudioBusBoxAdapter>>): Subscription;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get box(): Box;
    get indexField(): Int32Field;
    get sendPan(): AutomatableParameterFieldAdapter<float>;
    get sendGain(): AutomatableParameterFieldAdapter<float>;
    get targetBus(): AudioBusBoxAdapter;
    get optTargetBus(): Option<AudioBusBoxAdapter>;
    delete(): void;
    terminate(): void;
}
//# sourceMappingURL=AuxSendBoxAdapter.d.ts.map