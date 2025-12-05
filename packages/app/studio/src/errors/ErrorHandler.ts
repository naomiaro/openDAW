import {EmptyExec, Errors, Option, Provider, Terminable, Terminator} from "@naomiarotest/lib-std"
import {AnimationFrame, Browser, Events} from "@naomiarotest/lib-dom"
import {LogBuffer} from "@/errors/LogBuffer.ts"
import {ErrorLog} from "@/errors/ErrorLog.ts"
import {ErrorInfo} from "@/errors/ErrorInfo.ts"
import {Surface} from "@/ui/surface/Surface.tsx"
import {Dialogs} from "@/ui/components/dialogs.tsx"
import {BuildInfo} from "@/BuildInfo"

const extensionErrors = ["script-src blocked eval", "extension"]

export class ErrorHandler {
    readonly #terminator = new Terminator()

    readonly #buildInfo: BuildInfo
    readonly #recover: Provider<Option<Provider<Promise<void>>>>

    #errorThrown: boolean = false

    constructor(buildInfo: BuildInfo, recover: Provider<Option<Provider<Promise<void>>>>) {
        this.#buildInfo = buildInfo
        this.#recover = recover
    }

    processError(scope: string, event: Event): boolean {
        const error = ErrorInfo.extract(event)
        if ("reason" in event) {
            const reason = event.reason
            if (Errors.isAbort(reason)) {
                console.debug(`Abort '${reason.message}'`)
                event.preventDefault()
                return false
            }
            if (reason instanceof Errors.Warning) {
                console.debug(`Warning '${reason.message}'`)
                event.preventDefault()
                Dialogs.info({headline: "Warning", message: reason.message}).then(EmptyExec)
                return false
            }
            const isExtension = extensionErrors.includes(error.message ?? "")
            if (isExtension) {
                event.preventDefault()
                Dialogs.info({
                    headline: "Warning",
                    message: "One of your browser extensions caused an error. Please disable extensions for a more stable experience."
                }).then(EmptyExec)
                return false
            }
        }
        console.debug("processError", scope, event)
        if (this.#errorThrown) {return false}
        this.#errorThrown = true
        AnimationFrame.terminate()
        console.debug("ErrorInfo", error.name, error.message)
        const body = JSON.stringify({
            date: new Date().toISOString(),
            agent: Browser.userAgent,
            build: this.#buildInfo,
            scripts: document.scripts.length,
            error,
            logs: LogBuffer.get()
        } satisfies ErrorLog)
        if (import.meta.env.PROD) {
            fetch("https://logs.opendaw.studio/log.php", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body
            }).then(console.info, console.warn)
        }
        console.error(scope, error.name, error.message, error.stack)
        const isExtension = extensionErrors.includes(error.message ?? "")
        const probablyHasExtension = document.scripts.length > 1
            || isExtension
            || error.stack?.includes("chrome-extension://") === true
        if (Surface.isAvailable()) {
            Dialogs.error({
                scope: scope,
                name: error.name,
                message: error.message ?? "no message",
                probablyHasExtension,
                backupCommand: this.#recover()
            })
        } else {
            alert(`Boot Error in '${scope}': ${error.name}`)
        }
        return true
    }

    install(owner: WindowProxy | Worker | AudioWorkletNode, scope: string): Terminable {
        if (this.#errorThrown) {return Terminable.Empty}
        const lifetime = this.#terminator.own(new Terminator())
        lifetime.ownAll(
            Events.subscribe(owner, "error", event => {
                if (this.processError(scope, event)) {lifetime.terminate()}
            }),
            Events.subscribe(owner, "unhandledrejection", event => {
                if (this.processError(scope, event)) {lifetime.terminate()}
            }),
            Events.subscribe(owner, "messageerror", event => {
                if (this.processError(scope, event)) {lifetime.terminate()}
            }),
            Events.subscribe(owner, "processorerror" as any, event => {
                if (this.processError(scope, event)) {lifetime.terminate()}
            }),
            Events.subscribe(owner, "securitypolicyviolation", (event: SecurityPolicyViolationEvent) => {
                if (this.processError(scope, event)) {lifetime.terminate()}
            })
        )
        return lifetime
    }
}