import { Promises } from "./promises";
import { Errors, isAbsent, isInstanceOf } from "@opendaw/lib-std";
export var network;
(function (network) {
    const limit = new Promises.Limit(4);
    network.limitFetch = (input, init) => limit.add(() => fetch(input, init));
    network.DefaultRetry = (reason, count) => {
        return !isInstanceOf(reason, Errors.FileNotFound) || count <= 100;
    };
    network.progress = (progress) => (response) => {
        const body = response.body;
        if (isAbsent(body)) {
            return response;
        }
        const total = parseInt(response.headers.get("Content-Length") ?? "0", 10);
        if (total === 0) {
            return response;
        }
        let loaded = 0;
        const reader = body.getReader();
        const stream = new ReadableStream({
            async start(controller) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        controller.close();
                        break;
                    }
                    loaded += value.byteLength;
                    progress(loaded / total);
                    controller.enqueue(value);
                }
            }
        });
        return new Response(stream, {
            headers: response.headers,
            status: response.status,
            statusText: response.statusText
        });
    };
})(network || (network = {}));
