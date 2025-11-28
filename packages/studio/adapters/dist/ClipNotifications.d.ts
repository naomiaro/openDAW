import { UUID } from "@opendaw/lib-std";
export type ClipSequencingUpdates = {
    started: ReadonlyArray<UUID.Bytes>;
    stopped: ReadonlyArray<UUID.Bytes>;
    obsolete: ReadonlyArray<UUID.Bytes>;
};
export type ClipNotification = {
    type: "sequencing";
    changes: ClipSequencingUpdates;
} | {
    type: "waiting";
    clips: ReadonlyArray<UUID.Bytes>;
};
//# sourceMappingURL=ClipNotifications.d.ts.map