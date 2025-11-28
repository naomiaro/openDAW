import { Arrays, EmptyExec, panic, Terminator } from "@opendaw/lib-std";
import { Communicator } from "@opendaw/lib-runtime";
export class SyncSource {
    static DEBUG_CHECKSUM = false;
    #terminator;
    #caller;
    constructor(graph, messenger, initialize) {
        this.#terminator = new Terminator();
        this.#caller = Communicator.sender(messenger, ({ dispatchAndForget, dispatchAndReturn }) => new class {
            sendUpdates(updates) {
                dispatchAndForget(this.sendUpdates, updates);
            }
            checksum(value) {
                return dispatchAndReturn(this.checksum, value);
            }
        });
        if (initialize === true) {
            const boxes = graph.boxes();
            if (boxes.length > 0) {
                this.#caller.sendUpdates(boxes.map(box => ({ type: "new", name: box.name, uuid: box.address.uuid, buffer: box.toArrayBuffer() })));
            }
        }
        const updates = [];
        this.#terminator.own(graph.subscribeTransaction({
            onBeginTransaction: EmptyExec,
            onEndTransaction: () => {
                this.#caller.sendUpdates(updates);
                if (SyncSource.DEBUG_CHECKSUM) {
                    this.#caller.checksum(graph.checksum()).then(EmptyExec, (reason) => panic(reason));
                }
                Arrays.clear(updates);
            }
        }));
        this.#terminator.own(graph.subscribeToAllUpdatesImmediate({
            onUpdate: (update) => {
                if (update.type === "new") {
                    updates.push({
                        type: "new",
                        name: update.name,
                        uuid: update.uuid,
                        buffer: update.settings
                    });
                }
                else if (update.type === "primitive") {
                    updates.push({
                        type: "update-primitive",
                        address: update.address.decompose(),
                        value: update.newValue
                    });
                }
                else if (update.type === "pointer") {
                    updates.push({
                        type: "update-pointer",
                        address: update.address.decompose(),
                        target: update.newAddress.unwrapOrNull()?.decompose()
                    });
                }
                else if (update.type === "delete") {
                    updates.push({
                        type: "delete",
                        uuid: update.uuid
                    });
                }
                else {
                    return panic(`Unknown ${update}`);
                }
            }
        }));
    }
    checksum(value) { return this.#caller.checksum(value); }
    terminate() { this.#terminator.terminate(); }
}
