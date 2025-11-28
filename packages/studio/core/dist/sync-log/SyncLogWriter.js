import { isDefined, Terminable } from "@opendaw/lib-std";
import { Commit } from "./Commit";
export class SyncLogWriter {
    static attach(project, observer, lastCommit) {
        console.debug("SyncLogWriter.attach", project.rootBox.created.getValue(), isDefined(lastCommit) ? "append" : "new");
        return project.own(new SyncLogWriter(project, observer, lastCommit));
    }
    #observer;
    #subscription;
    #transactionSubscription = Terminable.Empty;
    #lastPromise;
    constructor(project, observer, lastCommit) {
        this.#observer = observer;
        this.#lastPromise = Promise.resolve(lastCommit ?? Commit.createFirst(project).then(commit => {
            this.#observer(commit);
            return commit;
        }));
        this.#appendCommit(previous => Commit.createOpen(previous.thisHash));
        this.#subscription = this.#listen(project.boxGraph);
    }
    terminate() {
        console.debug("SyncLogWriter.terminate");
        this.#subscription.terminate();
    }
    #appendCommit(factory) {
        return this.#lastPromise = this.#lastPromise.then(async (previous) => {
            const commit = await factory(previous);
            this.#observer(commit);
            return commit;
        });
    }
    #listen(boxGraph) {
        let updates = [];
        return boxGraph.subscribeTransaction({
            onBeginTransaction: () => this.#transactionSubscription =
                boxGraph.subscribeToAllUpdatesImmediate({ onUpdate: (update) => updates.push(update) }),
            onEndTransaction: () => {
                this.#transactionSubscription.terminate();
                this.#transactionSubscription = Terminable.Empty;
                if (updates.length === 0) {
                    return;
                }
                const ref = updates;
                updates = [];
                this.#appendCommit(previous => Commit.createUpdate(previous.thisHash, ref));
            }
        });
    }
}
