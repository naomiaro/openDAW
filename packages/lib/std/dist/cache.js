export class Cache {
    #provider;
    #value = null;
    constructor(provider) { this.#provider = provider; }
    invalidate = () => this.#value = null;
    get() {
        if (this.#value === null) {
            this.#value = this.#provider();
        }
        return this.#value;
    }
    terminate() { this.invalidate(); }
}
