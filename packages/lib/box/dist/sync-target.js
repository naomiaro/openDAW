import { Arrays, ByteArrayInput, isDefined, Option, UUID } from "@opendaw/lib-std";
import { Communicator } from "@opendaw/lib-runtime";
import { Address } from "./address";
export const createSyncTarget = (graph, messenger) => {
    return Communicator.executor(messenger, new class {
        sendUpdates(updates) {
            graph.beginTransaction();
            updates.forEach(update => {
                const type = update.type;
                if (type === "new") {
                    graph.createBox(update.name, update.uuid, box => box.read(new ByteArrayInput(update.buffer)));
                }
                else if (type === "update-primitive") {
                    graph.findVertex(Address.reconstruct(update.address))
                        .unwrap(() => `Could not find primitive field ${update.address}`)
                        .setValue(update.value);
                }
                else if (type === "update-pointer") {
                    graph.findVertex(Address.reconstruct(update.address))
                        .unwrap(() => `Could not find pointer field ${update.address}`)
                        .targetAddress = isDefined(update.target)
                        ? Option.wrap(Address.reconstruct(update.target))
                        : Option.None;
                }
                else if (update.type === "delete") {
                    graph.unstageBox(graph.findBox(update.uuid).unwrap(() => `Could not find box ${UUID.toString(update.uuid)}`));
                }
            });
            graph.endTransaction();
        }
        checksum(value) {
            if (Arrays.equals(graph.checksum(), value)) {
                return Promise.resolve();
            }
            else {
                return Promise.reject("Checksum mismatch");
            }
        }
    });
};
