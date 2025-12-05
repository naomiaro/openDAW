import {Messenger} from "@naomiarotest/lib-runtime"
import {OpfsWorker, SamplePeakWorker} from "@naomiarotest/lib-fusion"

const messenger: Messenger = Messenger.for(self)

OpfsWorker.init(messenger)
SamplePeakWorker.install(messenger)
// TODO ScriptExecutor.install(messenger)

messenger.channel("initialize").send("ready")