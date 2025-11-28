export declare namespace OpfsProtocol {
    type Kind = "file" | "directory";
    type Entry = {
        name: string;
        kind: Kind;
    };
}
export interface OpfsProtocol {
    write(path: string, data: Uint8Array): Promise<void>;
    read(path: string): Promise<Uint8Array>;
    delete(path: string): Promise<void>;
    list(path: string): Promise<ReadonlyArray<OpfsProtocol.Entry>>;
}
//# sourceMappingURL=OpfsProtocol.d.ts.map