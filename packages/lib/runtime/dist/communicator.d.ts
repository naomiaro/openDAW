import { Terminable } from "@opendaw/lib-std";
import { Messenger } from "./messenger";
/**
 * Communicator provides type-safe communication between Window, Worker, MessagePort, BroadcastChannel.
 * Passed objects are structured cloned: https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
 * It is highly advised not to pass classes with methods and or real private properties (starting with #).
 * They will lose their prototype and private property inheritance, and it is cumbersome to patch that up later.
 * Also read: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
 */
export declare namespace Communicator {
    const sender: <PROTOCOL>(messenger: Messenger, bind: (dispatcher: Dispatcher) => PROTOCOL) => PROTOCOL;
    const executor: <PROTOCOL>(messenger: Messenger, protocol: PROTOCOL) => Executor<PROTOCOL>;
    interface Dispatcher {
        dispatchAndForget: <F extends (..._: Parameters<F>) => void>(func: F, ...args: Parameters<F>) => void;
        dispatchAndReturn: <F extends (..._: Parameters<F>) => Promise<R>, R>(func: F, ...args: Parameters<F>) => Promise<R>;
    }
    class Executor<PROTOCOL> implements Terminable {
        #private;
        constructor(messenger: Messenger, protocol: PROTOCOL);
        terminate(): void;
    }
}
//# sourceMappingURL=communicator.d.ts.map