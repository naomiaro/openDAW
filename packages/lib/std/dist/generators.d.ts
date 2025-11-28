import { Nullable } from "./lang";
export declare namespace Generators {
    function empty<T>(): Generator<T>;
    const next: <T>(generator: Generator<T>) => Nullable<T>;
    function flatten<T>(...generators: Iterable<T>[]): Generator<T>;
}
//# sourceMappingURL=generators.d.ts.map