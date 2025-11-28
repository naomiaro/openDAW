var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { isDefined, Lazy, Notifier, Option } from "@opendaw/lib-std";
export class RouteLocation {
    static get() { return new RouteLocation(); }
    #notifier = new Notifier();
    constructor() {
        window.addEventListener("popstate", () => this.#notifier.notify(this));
        this.#setCanonical();
    }
    navigateTo(path) {
        if (this.path === path) {
            return false;
        }
        history.pushState(null, "", path);
        this.#setCanonical();
        this.#notifier.notify(this);
        return true;
    }
    catchupAndSubscribe(observer) {
        observer(this);
        return this.#notifier.subscribe(observer);
    }
    get path() { return location.pathname; }
    #setCanonical() {
        const url = location.href;
        let link = document.querySelector("link[rel=\"canonical\"]");
        if (isDefined(link)) {
            link.setAttribute("href", url);
        }
        else {
            link = document.createElement("link");
            link.setAttribute("rel", "canonical");
            link.setAttribute("href", url);
            document.head.appendChild(link);
        }
    }
}
__decorate([
    Lazy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", RouteLocation)
], RouteLocation, "get", null);
export class RouteMatcher {
    static create(routes) {
        return new RouteMatcher(routes);
    }
    static match(route, path) {
        if (!path.startsWith("/") || !route.startsWith("/")) {
            return false;
        }
        const routeSegments = route.split("/");
        const pathSegments = path.split("/");
        for (let i = 1; i < pathSegments.length; i++) {
            if (routeSegments[i] === "*") {
                return true;
            }
            if (pathSegments[i] !== routeSegments[i]) {
                return false;
            }
        }
        return true;
    }
    #routes;
    constructor(routes) {
        this.#routes = routes.toSorted((a, b) => {
            if (a.path < b.path) {
                return -1;
            }
            if (a.path > b.path) {
                return 1;
            }
            return 0;
        });
    }
    resolve(path) {
        return Option.wrap(this.#routes.find(route => RouteMatcher.match(route.path, path)));
    }
}
