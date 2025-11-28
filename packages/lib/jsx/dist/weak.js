export class WeakRefSet {
    #set = new Set();
    add(value) { this.#set.add(new WeakRef(value)); }
    forEach(callback) {
        for (const weakRef of this.#set) {
            const value = weakRef.deref();
            if (value === undefined) {
                this.#set.delete(weakRef);
            }
            else {
                callback(value);
            }
        }
    }
    clear() { this.#set.clear(); }
}
