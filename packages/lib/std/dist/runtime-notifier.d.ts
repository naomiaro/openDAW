import { Exec, unitValue } from "./lang";
import { ObservableValue } from "./observables";
import { Terminable } from "./terminable";
export declare namespace RuntimeNotification {
    type InfoRequest = {
        headline?: string;
        message: string;
        okText?: string;
        origin?: Element;
        abortSignal?: AbortSignal;
    };
    type ApproveRequest = {
        headline?: string;
        message: string;
        approveText?: string;
        cancelText?: string;
        origin?: Element;
        abortSignal?: AbortSignal;
    };
    type ProgressRequest = {
        headline: string;
        message?: string;
        progress?: ObservableValue<unitValue>;
        cancel?: Exec;
        origin?: Element;
    };
    interface ProgressUpdater extends Terminable {
        set message(value: string);
    }
    interface Installer {
        install(notifier: Notifier): void;
    }
    interface Notifier {
        info(request: InfoRequest): Promise<void>;
        approve(request: ApproveRequest): Promise<boolean>;
        progress(request: ProgressRequest): ProgressUpdater;
    }
}
export declare const RuntimeNotifier: RuntimeNotification.Notifier & RuntimeNotification.Installer;
//# sourceMappingURL=runtime-notifier.d.ts.map