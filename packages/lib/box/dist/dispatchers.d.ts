import { int, Procedure, Subscription } from "@opendaw/lib-std";
import { Address, Addressable } from "./address";
export declare enum Propagation {
    This = 0,
    Parent = 1,
    Children = 2
}
export interface Dispatchers<TARGET extends Addressable> {
    subscribe(propagation: Propagation, address: Address, procedure: Procedure<TARGET>): Subscription;
    dispatch(target: TARGET): void;
    countStations(): int;
}
export declare namespace Dispatchers {
    const create: <TARGET extends Addressable>() => Dispatchers<TARGET>;
}
//# sourceMappingURL=dispatchers.d.ts.map