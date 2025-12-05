import {isDefined, tryCatch} from "@naomiarotest/lib-std"

export type ErrorInfo = {
    name: string
    message?: string
    stack?: string
}

export namespace ErrorInfo {
    const MAX_STACK_SIZE = 1000

    export const extract = (event: Event): ErrorInfo => {
        if (event instanceof ErrorEvent && event.error instanceof Error) {
            return {
                name: event.error.name || "Error",
                message: event.error.message,
                stack: event.error.stack?.slice(0, MAX_STACK_SIZE)
            }
        } else if (event instanceof PromiseRejectionEvent) {
            let reason = event.reason
            if (reason instanceof Error) {
                if (!isDefined(reason.stack)) {
                    try {
                        // noinspection ExceptionCaughtLocallyJS
                        throw reason
                    } catch (error) {
                        if (error instanceof Error) {
                            reason = {...reason, stack: error.stack?.slice(0, MAX_STACK_SIZE)}
                        }
                    }
                }
                return {
                    name: reason.name || "UnhandledRejection",
                    message: reason.message,
                    stack: reason.stack?.slice(0, MAX_STACK_SIZE)
                }
            } else {
                return {
                    name: "UnhandledRejection",
                    message: typeof reason === "string" ? reason : JSON.stringify(reason)
                }
            }
        } else if (event instanceof MessageEvent) {
            return {
                name: "MessageError",
                message: typeof event.data === "string" ? event.data : JSON.stringify(event.data)
            }
        } else if (event.type === "processorerror") {
            return {name: "ProcessorError", message: "N/A"}
        } else if (event instanceof SecurityPolicyViolationEvent) {
            return {name: "SecurityPolicyViolation", message: `${event.violatedDirective} blocked ${event.blockedURI}`}
        } else {
            const {status, value} = tryCatch(() => JSON.stringify(event))
            if (status === "success") {
                return {name: "UnknownError", message: value}
            }
            return {name: "UnknownError", message: String(event)}
        }
    }
}