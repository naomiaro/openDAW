import { Exec, Func, Procedure, Provider } from "@opendaw/lib-std";
import { DomElement, JsxValue } from "../types";
export type AwaitProps<T> = {
    factory: Provider<Promise<T>>;
    loading: Provider<JsxValue>;
    success: Func<T, JsxValue>;
    failure: Func<{
        reason: any;
        retry: Exec;
    }, JsxValue>;
    repeat?: Procedure<Exec>;
};
export declare const Await: <T>({ factory, loading, success, failure, repeat }: AwaitProps<T>) => DomElement;
//# sourceMappingURL=Await.d.ts.map