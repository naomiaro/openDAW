export class Sets {
    static #EMPTY = Object.freeze(new Set());
    static empty = () => Sets.#EMPTY;
}
