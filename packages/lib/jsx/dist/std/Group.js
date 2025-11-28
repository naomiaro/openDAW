import { createElement } from "../create-element";
export const Group = ({ onInit }, children) => (createElement("div", { onInit: onInit, style: { display: "contents" } }, children));
