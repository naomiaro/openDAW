import { Iterables, Listeners, Option, panic } from "@opendaw/lib-std";
import { Address } from "./address";
export class PointerHub {
    static validate(pointer, target) {
        if (pointer.address.equals(target.address)) {
            return Option.wrap(`PointerField cannot point to itself: ${pointer}`);
        }
        if (!target.pointerRules.accepts.some((type) => type === pointer.pointerType)) {
            const accepting = target.pointerRules.accepts.join(", ");
            return Option.wrap(`${String(pointer.pointerType)} does not satisfy any of the allowed types (${accepting}).`);
        }
        return Option.None;
    }
    #vertex;
    #listeners;
    constructor(vertex) {
        this.#vertex = vertex;
        this.#listeners = new Listeners();
    }
    subscribe(listener, ...filter) {
        return this.#addFilteredListener(this.#listeners, listener, filter);
    }
    catchupAndSubscribe(listener, ...filter) {
        const added = Address.newSet(pointer => pointer.address);
        added.addMany(this.filter(...filter));
        added.forEach(pointer => listener.onAdded(pointer));
        // This takes track of the listener notification state.
        // It is possible that the pointer has been added, but it has not been notified yet.
        // That would cause the listener.onAdd method to be invoked twice.
        return this.subscribe({
            onAdded: (pointer) => {
                if (added.add(pointer)) {
                    listener.onAdded(pointer);
                }
            },
            onRemoved: (pointer) => {
                added.removeByKey(pointer.address);
                listener.onRemoved(pointer);
            }
        }, ...filter);
    }
    filter(...types) {
        return (types.length === 0 ? this.incoming() : Iterables.filter(this.incoming().values(), (pointerField) => types.some((type) => type === pointerField.pointerType)));
    }
    size() { return this.incoming().length; }
    isEmpty() { return this.size() === 0; }
    nonEmpty() { return this.size() > 0; }
    contains(pointer) { return this.incoming().some(incoming => pointer.address.equals(incoming.address)); }
    incoming() { return this.#vertex.graph.edges().incomingEdgesOf(this.#vertex).slice(); }
    onAdded(pointerField) {
        const issue = PointerHub.validate(pointerField, this.#vertex);
        if (issue.nonEmpty()) {
            return panic(issue.unwrap());
        }
        this.#listeners.proxy.onAdded(pointerField);
    }
    onRemoved(pointerField) {
        this.#listeners.proxy.onRemoved(pointerField);
    }
    toString() {
        return `{Pointers ${this.#vertex.address}, pointers: ${this.incoming().values()
            .map((pointerField) => pointerField.toString())}}`;
    }
    #addFilteredListener(listeners, listener, filter) {
        return listeners.subscribe({
            onAdded: (pointer) => {
                if (filter.length === 0 || filter.some((type) => type === pointer.pointerType)) {
                    listener.onAdded(pointer);
                }
            },
            onRemoved: (pointer) => {
                if (filter.length === 0 || filter.some((type) => type === pointer.pointerType)) {
                    listener.onRemoved(pointer);
                }
            }
        });
    }
}
