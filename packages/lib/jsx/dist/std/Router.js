import { createElement, replaceChildren } from "../create-element";
import { isDefined, Option, safeExecute, Terminator } from "@opendaw/lib-std";
import { RouteLocation, RouteMatcher } from "../routes";
export const Router = ({ runtime, service, routes, fallback, preloader, error, onshow }) => {
    const routing = RouteMatcher.create(routes);
    const resolvePageFactory = (path) => routing
        .resolve(path)
        .mapOr(route => route.factory, () => fallback);
    const container = createElement("div", { style: { display: "contents" } });
    let loading = Option.None;
    let showing = Option.None;
    const fetchPage = async (pageFactory, path) => {
        if (loading.nonEmpty()) {
            const request = loading.unwrap();
            request.preloader.ifSome(lifecycle => lifecycle.terminate());
            request.state = "cancelled";
            loading = Option.None;
        }
        const lifecycle = new Terminator();
        const pageResult = pageFactory({
            service,
            lifecycle,
            path,
            error: ""
        });
        const content = pageResult instanceof Promise ? pageResult : Promise.resolve(pageResult);
        const request = {
            path,
            content,
            lifecycle,
            preloader: Option.wrap(safeExecute(preloader)),
            state: "loading"
        };
        loading = Option.wrap(request);
        let element;
        try {
            element = await content;
        }
        catch (reason) {
            console.warn(reason);
            if (isDefined(error)) {
                return fetchPage(error, path);
            }
            else {
                alert(`Could not load page (${reason})`);
            }
        }
        if (request.state === "cancelled") {
            request.lifecycle.terminate();
        }
        else if (request.path === path) {
            if (showing.nonEmpty()) {
                showing.unwrap().lifecycle.terminate();
                showing = Option.None;
            }
            if (loading.nonEmpty()) {
                loading.unwrap().preloader.ifSome(lifecycle => lifecycle.terminate());
                loading = Option.None;
            }
            replaceChildren(container, element);
            showing = Option.wrap(request);
            safeExecute(onshow);
        }
    };
    runtime.own(RouteLocation.get()
        .catchupAndSubscribe((location) => {
        if (showing.unwrapOrNull()?.path === location.path) {
            return;
        }
        return fetchPage(resolvePageFactory(location.path), location.path);
    }));
    return container;
};
