import { asDefined, assert, isDefined, Iterables, panic } from "@opendaw/lib-std";
/**
 * Communicator provides type-safe communication between Window, Worker, MessagePort, BroadcastChannel.
 * Passed objects are structured cloned: https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
 * It is highly advised not to pass classes with methods and or real private properties (starting with #).
 * They will lose their prototype and private property inheritance, and it is cumbersome to patch that up later.
 * Also read: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
 */
export var Communicator;
(function (Communicator) {
    Communicator.sender = (messenger, bind) => bind(new Sender(messenger));
    Communicator.executor = (messenger, protocol) => new Executor(messenger, protocol);
    const extractTransferables = (args) => {
        const transferables = [];
        for (const arg of args) {
            if (arg instanceof MessagePort) {
                transferables.push(arg);
            }
            if (typeof ImageBitmap !== "undefined" && arg instanceof ImageBitmap) {
                transferables.push(arg);
            }
            if (typeof OffscreenCanvas !== "undefined" && arg instanceof OffscreenCanvas) {
                transferables.push(arg);
            }
        }
        return transferables;
    };
    class Sender {
        #messenger;
        #expected = new Map();
        #subscription;
        #returnId = 0;
        constructor(messenger) {
            this.#messenger = messenger;
            this.#subscription = messenger.subscribe(this.#messageHandler);
        }
        terminate() { this.#subscription.terminate(); }
        dispatchAndForget = (func, ...args) => {
            const transferables = extractTransferables(args);
            this.#messenger.send({
                type: "send",
                returnId: false,
                func: func.name,
                args: Array.from(Iterables.map(args, arg => ({ value: arg })))
            }, transferables);
        };
        dispatchAndReturn = (func, ...args) => new Promise((resolve, reject) => {
            const entries = Iterables.reduce(args, (callbacks, arg, index) => {
                if (typeof arg === "function") {
                    callbacks.push([index, arg]);
                }
                return callbacks;
            }, []);
            this.#expected.set(this.#returnId, {
                executorTuple: { resolve, reject },
                callbacks: new Map(entries)
            });
            const transferables = extractTransferables(args);
            this.#messenger.send({
                type: "send",
                returnId: this.#returnId,
                func: func.name,
                args: Array.from(Iterables.map(args, (arg, index) => typeof arg === "function" ? ({ callback: index }) : ({ value: arg })))
            }, transferables);
            this.#returnId++;
        });
        #messageHandler = (message) => {
            const returns = this.#expected.get(message.returnId);
            if (isDefined(returns)) {
                if (message.type === "resolve") {
                    returns.executorTuple.resolve(message.resolve);
                    this.#expected.delete(message.returnId);
                }
                else if (message.type === "reject") {
                    returns.executorTuple.reject(message.reject);
                    this.#expected.delete(message.returnId);
                }
                else if (message.type === "callback") {
                    returns.callbacks?.get(message.funcAt).apply(this, message.args);
                }
            }
            else {
                panic(`Promise has already been resolved. ${JSON.stringify(message)}`);
            }
        };
    }
    class Executor {
        #messenger;
        #protocol;
        #subscription;
        constructor(messenger, protocol) {
            this.#messenger = messenger;
            this.#protocol = protocol;
            this.#subscription = messenger.subscribe(this.#messageHandler);
        }
        terminate() { this.#subscription.terminate(); }
        #messageHandler = (message) => {
            assert(message.type === "send", () => "Message type must be 'send'");
            const object = Object.getPrototypeOf(this.#protocol) === Object.getPrototypeOf({})
                ? this.#protocol : Object.getPrototypeOf(this.#protocol);
            const func = asDefined(object[message.func], `${message.func.toString()} does not exists on ${this.#protocol}`);
            const returnId = message.returnId;
            if (returnId === false) {
                func.apply(this.#protocol, message.args.map((arg) => "value" in arg
                    ? arg.value : panic(`${message.func.toString()} has no promise.`)));
            }
            else {
                try {
                    const promise = func.apply(this.#protocol, message.args
                        .map(arg => "callback" in arg ? (...args) => this.#sendCallback(returnId, arg.callback, args) : arg.value));
                    promise.then(value => {
                        try {
                            this.#sendResolve(returnId, value);
                        }
                        catch (reason) {
                            this.#sendReject(returnId, reason);
                        }
                    }, reason => this.#sendReject(returnId, reason));
                }
                catch (reason) {
                    this.#sendReject(returnId, reason);
                }
            }
        };
        #sendResolve = (returnId, value) => this.#messenger.send({ type: "resolve", returnId, resolve: value });
        #sendReject = (returnId, reason) => this.#messenger.send({ type: "reject", returnId, reject: reason });
        #sendCallback = (returnId, func, args) => this.#messenger.send({ type: "callback", returnId, funcAt: func, args });
    }
    Communicator.Executor = Executor;
})(Communicator || (Communicator = {}));
