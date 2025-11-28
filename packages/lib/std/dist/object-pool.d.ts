import { int } from "./lang";
export declare class ObjectPool<T> {
    #private;
    constructor(factory: () => T, initialSize?: number);
    acquire(): T;
    release(instance: T): void;
    releaseAll(): void;
    get inUseCount(): int;
    get totalSize(): int;
    get availableCount(): int;
}
//# sourceMappingURL=object-pool.d.ts.map