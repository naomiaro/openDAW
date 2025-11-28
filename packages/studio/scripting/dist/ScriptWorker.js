import { Communicator, Messenger } from "@opendaw/lib-runtime";
import { ScriptRunner } from "./ScriptRunner";
const messenger = Messenger.for(self);
const hostProtocol = Communicator.sender(messenger.channel("scripting-host"), dispatcher => new class {
    openProject(buffer, name) {
        dispatcher.dispatchAndForget(this.openProject, buffer, name);
    }
    fetchProject() {
        return dispatcher.dispatchAndReturn(this.fetchProject);
    }
    addSample(data, name) {
        return dispatcher.dispatchAndReturn(this.addSample, data, name);
    }
});
Communicator.executor(messenger.channel("scripting-execution"), new class {
    #scriptExecutor = new ScriptRunner(hostProtocol);
    // TODO We might return information about the script execution, e.g. warnings
    executeScript(script, context) {
        return this.#scriptExecutor.run(script, context);
    }
});
