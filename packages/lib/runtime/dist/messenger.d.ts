import { Nullable, Observable, Procedure, Terminable } from "@opendaw/lib-std";
export type Port = {
    postMessage(message: any, transfer?: Array<Transferable>): void;
    onmessage: Nullable<Procedure<MessageEvent>>;
    onmessageerror: Nullable<Procedure<MessageEvent>>;
};
export declare const Messenger: {
    for: (port: Port) => Messenger;
};
export type Messenger = Observable<any> & Terminable & {
    send(message: any, transfer?: Array<Transferable>): void;
    channel(name: string): Messenger;
};
//# sourceMappingURL=messenger.d.ts.map