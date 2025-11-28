export type Crypto = {
    subtle: {
        digest(algorithm: string, data: ArrayBufferView | ArrayBuffer): Promise<ArrayBuffer>;
    };
    getRandomValues<T extends ArrayBufferView | null>(array: T): T;
};
//# sourceMappingURL=crypto.d.ts.map