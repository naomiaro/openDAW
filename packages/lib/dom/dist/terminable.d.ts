import { Func, Terminable } from "@opendaw/lib-std";
export declare namespace TerminatorUtils {
    /**
     * Terminates if the key is no longer referenced to.
     * Make sure that the Terminable does not include other references
     * that would prevent the key from being gc collected.
     * That means the key must not appear in the Terminable!
     * @param key WeakKey
     * @param subscribe Sends a WeakRef to be able to be gc collected
     */
    const watchWeak: <K extends WeakKey>(key: K, subscribe: Func<WeakRef<K>, Terminable>) => K;
}
//# sourceMappingURL=terminable.d.ts.map