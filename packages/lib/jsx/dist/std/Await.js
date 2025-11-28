import { safeExecute } from "@opendaw/lib-std";
import { createElement, replaceChildren } from "../create-element";
export const Await = ({ factory, loading, success, failure, repeat }) => {
    const contents = createElement("div", { style: { display: "contents" } });
    const start = () => {
        replaceChildren(contents, loading());
        factory().then(result => replaceChildren(contents, success(result)), reason => replaceChildren(contents, failure({ reason, retry: () => start() })));
    };
    start();
    safeExecute(repeat, start);
    return contents;
};
