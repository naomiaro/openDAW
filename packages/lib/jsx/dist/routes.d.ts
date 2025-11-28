import { Observer, Option, Subscription } from "@opendaw/lib-std";
export declare class RouteLocation {
    #private;
    static get(): RouteLocation;
    private constructor();
    navigateTo(path: string): boolean;
    catchupAndSubscribe(observer: Observer<RouteLocation>): Subscription;
    get path(): string;
}
export type Route = {
    path: string;
};
export declare class RouteMatcher<R extends Route> {
    #private;
    static create<R extends Route>(routes: ReadonlyArray<R>): RouteMatcher<R>;
    static match(route: string, path: string): boolean;
    private constructor();
    resolve(path: string): Option<R>;
}
//# sourceMappingURL=routes.d.ts.map