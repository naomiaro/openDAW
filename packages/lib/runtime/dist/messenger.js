import { isDefined, Notifier } from "@opendaw/lib-std";
export const Messenger = { for: (port) => new NativeMessenger(port) };
const EmptyTransferables = [];
class NativeMessenger {
    #port;
    #notifier = new Notifier();
    constructor(port) {
        this.#port = port;
        if (isDefined(port.onmessage) || isDefined(port.onmessageerror)) {
            console.error(port);
            throw new Error(`${port} is already wrapped.`);
        }
        port.onmessage = (event) => this.#notifier.notify(event.data);
        port.onmessageerror = (event) => { throw new Error(event.type); };
    }
    send(message, transfer) {
        this.#port.postMessage(message, transfer ?? EmptyTransferables);
    }
    channel(name) { return new Channel(this, name); }
    subscribe(observer) { return this.#notifier.subscribe(observer); }
    terminate() {
        this.#notifier.terminate();
        this.#port.onmessage = null;
        this.#port.onmessageerror = null;
    }
}
// with '__id__' we put in a little security that we are only communicating with the messenger we created
class Channel {
    #messages;
    #name;
    #notifier = new Notifier();
    #subscription;
    constructor(messages, name) {
        this.#messages = messages;
        this.#name = name;
        this.#subscription = messages.subscribe(data => {
            if ("__id__" in data && data.__id__ === "42" && "message" in data && "channel" in data && data.channel === name) {
                this.#notifier.notify(data.message);
            }
        });
    }
    send(message, transferrables) {
        this.#messages.send({ __id__: "42", channel: this.#name, message }, transferrables);
    }
    channel(name) { return new Channel(this, name); }
    subscribe(observer) { return this.#notifier.subscribe(observer); }
    terminate() {
        this.#subscription.terminate();
        this.#notifier.terminate();
    }
}
