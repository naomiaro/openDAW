import { int, Progress } from "@opendaw/lib-std";
export declare namespace network {
    const limitFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
    const DefaultRetry: (reason: unknown, count: int) => boolean;
    const progress: (progress: Progress.Handler) => (response: Response) => Response;
}
//# sourceMappingURL=network.d.ts.map