export class ObjectPool {
    #available = [];
    #inUse = new Set();
    #factory;
    constructor(factory, initialSize = 0) {
        this.#factory = factory;
        this.#grow(initialSize);
    }
    acquire() {
        if (this.#available.length === 0) {
            this.#grow(8);
        }
        const instance = this.#available.pop();
        this.#inUse.add(instance);
        return instance;
    }
    release(instance) {
        if (!this.#inUse.has(instance)) {
            throw new Error("Attempted to release an instance that was not acquired from this pool");
        }
        this.#inUse.delete(instance);
        this.#available.push(instance);
    }
    releaseAll() {
        for (const instance of this.#inUse) {
            this.#available.push(instance);
        }
        this.#inUse.clear();
    }
    #grow(count) {
        for (let i = 0; i < count; i++) {
            this.#available.push(this.#factory());
        }
    }
    get inUseCount() { return this.#inUse.size; }
    get totalSize() { return this.#available.length + this.#inUse.size; }
    get availableCount() { return this.#available.length; }
}
