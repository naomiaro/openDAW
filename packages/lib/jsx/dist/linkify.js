import { createElement } from "./create-element";
export const linkify = (text, target) => text
    .split(/(https?:\/\/\S+|www\.\S+)/g)
    .map((part, i) => i % 2
    ? createElement("a", { href: part.startsWith("http") ? part : `https://${part}`, target: target }, part)
    : part);
