import { Html } from "@opendaw/lib-dom";
import { createElement } from "../create-element";
const className = Html.adoptStyleSheet(`
@keyframes fill {
  from {width: 5%;}
  to {width: 95%;}
}

component {
    position: fixed;
    top: 0;
    left: 0;
    width: 5%;
    height: 2px;
    animation: fill 3s ease-in-out forwards;
    z-index: 999999;
}
`, "__preloader__");
export const Preloader = ({ color }) => {
    const element = createElement("div", { className: className, style: { backgroundColor: color ?? "orange" } });
    document.body.appendChild(element);
    return { terminate: () => element.remove() };
};
