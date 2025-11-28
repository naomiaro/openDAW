import { createElement, replaceChildren } from "../create-element";
export const Hotspot = ({ render, ref }) => {
    const contents = createElement("div", { style: { display: "contents" } });
    replaceChildren(contents, render());
    ref.addTarget({ update: () => replaceChildren(contents, render()) });
    return contents;
};
