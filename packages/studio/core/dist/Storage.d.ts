import { UUID } from "@opendaw/lib-std";
export declare abstract class Storage<ITEM extends {
    uuid: UUID.String;
} & META, META, NEW, PARTS> {
    readonly folder: string;
    protected constructor(folder: string);
    abstract save(item: NEW): Promise<void>;
    abstract load(uuid: UUID.Bytes): Promise<PARTS>;
    deleteItem(uuid: UUID.Bytes): Promise<void>;
    loadTrashedIds(): Promise<Array<UUID.String>>;
    saveTrashedIds(ids: ReadonlyArray<UUID.String>): Promise<void>;
    list(): Promise<ReadonlyArray<ITEM>>;
}
//# sourceMappingURL=Storage.d.ts.map