export interface Protocol {
    sendShareLock(lock: SharedArrayBuffer): void;
    sendUpdateData(data: ArrayBufferLike): void;
    sendUpdateStructure(structure: ArrayBufferLike): void;
}
//# sourceMappingURL=Protocol.d.ts.map