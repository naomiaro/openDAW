import {Promises} from "./promises"
import {Errors, int, isAbsent, isInstanceOf, Progress} from "@naomiarotest/lib-std"

export namespace network {
    const limit = new Promises.Limit<Response>(4)

    export const limitFetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> =>
        limit.add(() => fetch(input, init))

    export const DefaultRetry = (reason: unknown, count: int) => {
        return !isInstanceOf(reason, Errors.FileNotFound) || count <= 100
    }

    export const progress = (progress: Progress.Handler) => (response: Response): Response => {
        const body = response.body
        if (isAbsent(body)) {return response}
        const total = parseInt(response.headers.get("Content-Length") ?? "0", 10)
        if (total === 0) {return response}
        let loaded = 0
        const reader = body.getReader()
        const stream = new ReadableStream({
            async start(controller) {
                while (true) {
                    const {done, value} = await reader.read()
                    if (done) {
                        controller.close()
                        break
                    }
                    loaded += value.byteLength
                    progress(loaded / total)
                    controller.enqueue(value)
                }
            }
        })
        return new Response(stream, {
            headers: response.headers,
            status: response.status,
            statusText: response.statusText
        })
    }
}