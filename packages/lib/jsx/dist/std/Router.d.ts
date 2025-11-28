import { Exec, Provider, Terminable, TerminableOwner } from "@opendaw/lib-std";
import { JsxValue } from "../types";
export type PageContext<SERVICE = never> = {
    service: SERVICE;
    lifecycle: TerminableOwner;
    path: string;
    error: string;
};
export type PageFactory<SERVICE = never> = (context: PageContext<SERVICE>) => JsxValue | Promise<JsxValue>;
export type RouterConstruct<SERVICE = never> = {
    runtime: TerminableOwner;
    service: SERVICE;
    routes: Array<{
        path: string;
        factory: PageFactory<SERVICE>;
    }>;
    fallback: PageFactory<SERVICE>;
    error?: PageFactory<SERVICE>;
    preloader?: Provider<Terminable>;
    onshow?: Exec;
};
export declare const Router: <SERVICE = never>({ runtime, service, routes, fallback, preloader, error, onshow }: RouterConstruct<SERVICE>) => HTMLDivElement;
//# sourceMappingURL=Router.d.ts.map