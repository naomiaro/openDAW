import { RuntimeNotifier } from "@opendaw/lib-std";
import { Communicator, Messenger, Promises } from "@opendaw/lib-runtime";
export class ScriptHost {
    #executor;
    constructor(host, scriptURL) {
        const messenger = Messenger.for(new Worker(scriptURL, { type: "module" }));
        Communicator.executor(messenger.channel("scripting-host"), host);
        this.#executor = Communicator.sender(messenger.channel("scripting-execution"), dispatcher => new class {
            executeScript(script, context) {
                return dispatcher.dispatchAndReturn(this.executeScript, script, context);
            }
        });
    }
    async executeScript(script, context) {
        const progressUpdater = RuntimeNotifier.progress({ headline: "Executing Script..." });
        const { status, error } = await Promises.tryCatch(this.#executor.executeScript(script, context));
        progressUpdater.terminate();
        if (status === "rejected") {
            console.warn(error);
            await RuntimeNotifier.info({ headline: "The script caused an error", message: String(error) });
        }
    }
}
