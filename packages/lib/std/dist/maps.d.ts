import { Func } from "./lang";
export declare class Maps {
    static createIfAbsent<K, V>(map: Map<K, V>, key: K, factory: Func<K, V>): V;
}
export declare class WeakMaps {
    static createIfAbsent<K extends object, V>(map: WeakMap<K, V>, key: K, factory: Func<K, V>): V;
}
//# sourceMappingURL=maps.d.ts.map