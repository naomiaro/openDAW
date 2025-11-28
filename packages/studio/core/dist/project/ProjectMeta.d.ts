import { JSONValue } from "@opendaw/lib-std";
export type ProjectMeta = {
    name: string;
    artist: string;
    description: string;
    tags: Array<string>;
    created: Readonly<string>;
    modified: string;
    notepad?: string;
    radioToken?: string;
} & JSONValue;
export declare namespace ProjectMeta {
    const init: (name?: string) => ProjectMeta;
    const copy: (meta: ProjectMeta) => ProjectMeta;
}
//# sourceMappingURL=ProjectMeta.d.ts.map