import { Procedure, Progress, UUID } from "@opendaw/lib-std";
import { Soundfont } from "@opendaw/studio-adapters";
import { CloudHandler } from "./CloudHandler";
export declare class CloudBackupSoundfonts {
    #private;
    static readonly RemotePath = "soundfonts";
    static readonly RemoteCatalogPath: string;
    static readonly areSoundfontsEqual: ({ uuid: a }: Soundfont, { uuid: b }: Soundfont) => boolean;
    static pathFor(uuid: UUID.String): string;
    static start(cloudHandler: CloudHandler, progress: Progress.Handler, log: Procedure<string>): Promise<void>;
    private constructor();
}
//# sourceMappingURL=CloudBackupSoundfonts.d.ts.map