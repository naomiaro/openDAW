import { assert, EmptyExec } from "./lang";
import { Option } from "./option";
export const RuntimeNotifier = (() => {
    let notifierOption = Option.None;
    return ({
        info: (request) => notifierOption.match({
            none: () => Promise.resolve(),
            some: notifier => notifier.info(request)
        }),
        approve: (request) => notifierOption.match({
            none: () => Promise.resolve(true),
            some: notifier => notifier.approve(request)
        }),
        progress: (request) => notifierOption.match({
            none: () => ({ message: "", terminate: EmptyExec }),
            some: notifier => notifier.progress(request)
        }),
        install: (notifier) => {
            assert(notifierOption.isEmpty(), "RuntimeNotification already installed");
            notifierOption = Option.wrap(notifier);
        }
    });
})();
