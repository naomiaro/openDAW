export class Maps {
    static createIfAbsent(map, key, factory) {
        let value = map.get(key);
        if (value === undefined) {
            value = factory(key);
            map.set(key, value);
        }
        return value;
    }
}
export class WeakMaps {
    static createIfAbsent(map, key, factory) {
        let value = map.get(key);
        if (value === undefined) {
            value = factory(key);
            map.set(key, value);
        }
        return value;
    }
}
