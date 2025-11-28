import { Arrays, assert, Option } from "@opendaw/lib-std";
class Modification {
    #updates;
    constructor(updates) { this.#updates = updates; }
    inverse(graph) {
        graph.beginTransaction();
        this.#updates.toReversed().forEach(update => update.inverse(graph));
        graph.endTransaction();
    }
    forward(graph) {
        graph.beginTransaction();
        this.#updates.forEach(update => update.forward(graph));
        graph.endTransaction();
    }
}
export class BoxEditing {
    #graph;
    #pending = [];
    #marked = [];
    #modifying = false;
    #disabled = false;
    #historyIndex = 0;
    constructor(graph) {
        this.#graph = graph;
    }
    get graph() { return this.#graph; }
    isEmpty() { return this.#marked.length === 0 && this.#pending.length === 0; }
    clear() {
        assert(!this.#modifying, "Already modifying");
        Arrays.clear(this.#pending);
        Arrays.clear(this.#marked);
        this.#historyIndex = 0;
    }
    undo() {
        if (this.#disabled) {
            return false;
        }
        if (this.#pending.length > 0) {
            this.mark();
        }
        if (this.#historyIndex === 0) {
            return false;
        }
        const modifications = this.#marked[--this.#historyIndex];
        modifications.toReversed().forEach(step => step.inverse(this.#graph));
        this.#graph.edges().validateRequirements();
        return true;
    }
    redo() {
        if (this.#disabled) {
            return false;
        }
        if (this.#historyIndex === this.#marked.length) {
            return false;
        }
        if (this.#pending.length > 0) {
            console.warn("redo while having pending updates?");
            return false;
        }
        this.#marked[this.#historyIndex++].forEach(step => step.forward(this.#graph));
        this.#graph.edges().validateRequirements();
        return true;
    }
    // TODO This is an option to clarify, if user actions meant to be run by a modifier or not.
    //  See ParameterWrapper. Not the nicest solution. Probably coming back to this sooner or later.
    mustModify() { return !this.#graph.inTransaction(); }
    modify(modifier, mark = true) {
        if (this.#modifying) {
            // we just keep adding new pending updates
            return Option.wrap(modifier());
        }
        if (mark && this.#pending.length > 0) {
            this.mark();
        }
        const result = Option.wrap(this.#modify(modifier));
        if (mark) {
            this.mark();
        }
        return result;
    }
    beginModification() {
        const alreadyIntransaction = this.#graph.inTransaction();
        if (!alreadyIntransaction) {
            this.#graph.beginTransaction();
        }
        this.#modifying = true;
        const complete = () => {
            this.#modifying = false;
            if (!alreadyIntransaction) {
                this.#graph.endTransaction();
                this.#graph.edges().validateRequirements();
            }
        };
        return {
            approve: complete,
            revert: () => {
                this.clearPending();
                complete();
            }
        };
    }
    #modify(modifier) {
        assert(!this.#modifying, "Already modifying");
        this.#modifying = true;
        const updates = [];
        const subscription = this.#graph.subscribeToAllUpdates({ onUpdate: (update) => { updates.push(update); } });
        this.#graph.beginTransaction();
        const result = modifier();
        this.#graph.endTransaction();
        if (updates.length > 0) {
            this.#pending.push(new Modification(updates));
        }
        subscription.terminate();
        this.#modifying = false;
        this.#graph.edges().validateRequirements();
        return result;
    }
    mark() {
        if (this.#pending.length === 0) {
            return;
        }
        if (this.#marked.length - this.#historyIndex > 0) {
            this.#marked.splice(this.#historyIndex);
        }
        this.#marked.push(this.#pending.splice(0));
        this.#historyIndex = this.#marked.length;
    }
    clearPending() {
        if (this.#pending.length === 0) {
            return;
        }
        this.#pending.reverse().forEach(modification => modification.inverse(this.#graph));
        this.#pending.length = 0;
    }
    disable() {
        this.#disabled = true;
    }
}
