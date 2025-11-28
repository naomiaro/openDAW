export declare namespace Objects {
    const empty: <K extends keyof any, V>() => Readonly<Record<K, V>>;
    type Disjoint<U, V> = keyof U & keyof V extends never ? V : never;
    const mergeNoOverlap: <U extends {}, V extends {}>(u: U, v: Disjoint<U, V>) => U & V;
    const include: <T, K extends readonly (keyof T)[]>(obj: T, ...keys: K) => Pick<T, K[number]>;
    const exclude: <T extends {}, K extends keyof T>(obj: T, ...keys: Array<K>) => Omit<T, K>;
    const overwrite: <T extends {}>(target: T, patch: Partial<T>) => T;
}
//# sourceMappingURL=objects.d.ts.map