import { ByteArrayInput } from "@opendaw/lib-std";
import { Update } from "@opendaw/lib-box";
import { Project } from "../project/Project";
export declare const enum CommitType {
    Init = 0,
    Open = 1,
    Updates = 2,
    NewVersion = 3
}
export declare class Commit {
    #private;
    readonly type: CommitType;
    readonly prevHash: ArrayBuffer;
    readonly thisHash: ArrayBuffer;
    readonly payload: ArrayBuffer;
    readonly date: number;
    static readonly VERSION = 1;
    static createFirst(project: Project): Promise<Commit>;
    static createOpen(prevHash: ArrayBuffer): Promise<Commit>;
    static createUpdate(prevHash: ArrayBuffer, updates: ReadonlyArray<Update>): Promise<Commit>;
    static deserialize(input: ByteArrayInput): Commit;
    private constructor();
    serialize(): ArrayBuffer;
    toString(): string;
}
//# sourceMappingURL=Commit.d.ts.map