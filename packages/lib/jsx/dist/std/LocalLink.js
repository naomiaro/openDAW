import { TerminatorUtils } from "@opendaw/lib-dom";
import { createElement } from "../create-element";
import { RouteLocation, RouteMatcher } from "../routes";
export const LocalLink = ({ href }) => TerminatorUtils
    .watchWeak(createElement("a", { href: href, onclick: (event) => {
        event.preventDefault();
        RouteLocation.get().navigateTo(href);
    }, link: true }), weakRef => RouteLocation.get().catchupAndSubscribe(location => weakRef.deref()?.classList.toggle("active", RouteMatcher.match(location.path, href))));
