import { Arrays, Errors, panic, Progress, RuntimeNotifier, UUID } from "@opendaw/lib-std";
import { network, Promises } from "@opendaw/lib-runtime";
import { OpenSoundfontAPI, SoundfontStorage } from "../soundfont";
export class CloudBackupSoundfonts {
    static RemotePath = "soundfonts";
    static RemoteCatalogPath = `${this.RemotePath}/index.json`;
    static areSoundfontsEqual = ({ uuid: a }, { uuid: b }) => a === b;
    static pathFor(uuid) { return `${this.RemotePath}/${uuid}.wav`; }
    static async start(cloudHandler, progress, log) {
        log("Collecting all soundfont domains...");
        const [stock, local, cloud] = await Promise.all([
            OpenSoundfontAPI.get().all(),
            SoundfontStorage.get().list(),
            cloudHandler.download(CloudBackupSoundfonts.RemoteCatalogPath)
                .then(json => JSON.parse(new TextDecoder().decode(json)))
                .catch(reason => reason instanceof Errors.FileNotFound ? Arrays.empty() : panic(reason))
        ]);
        return new CloudBackupSoundfonts(cloudHandler, { stock, local, cloud }, log).#start(progress);
    }
    #cloudHandler;
    #soundfontDomains;
    #log;
    constructor(cloudHandler, soundfontDomains, log) {
        this.#cloudHandler = cloudHandler;
        this.#soundfontDomains = soundfontDomains;
        this.#log = log;
    }
    async #start(progress) {
        const trashed = await SoundfontStorage.get().loadTrashedIds();
        const [uploadProgress, trashProgress, downloadProgress] = Progress.splitWithWeights(progress, [0.45, 0.10, 0.45]);
        await this.#upload(uploadProgress);
        await this.#trash(trashed, trashProgress);
        await this.#download(trashed, downloadProgress);
    }
    async #upload(progress) {
        const { stock, local, cloud } = this.#soundfontDomains;
        const maybeUnsyncedSoundfonts = Arrays.subtract(local, stock, CloudBackupSoundfonts.areSoundfontsEqual);
        const unsyncedSoundfonts = Arrays.subtract(maybeUnsyncedSoundfonts, cloud, CloudBackupSoundfonts.areSoundfontsEqual);
        if (unsyncedSoundfonts.length === 0) {
            this.#log("No unsynced soundfonts found.");
            progress(1.0);
            return;
        }
        const uploadedSoundfonts = await Promises.sequentialAll(unsyncedSoundfonts.map((soundfont, index, { length }) => async () => {
            progress((index + 1) / length);
            this.#log(`Uploading soundfont '${soundfont.name}'`);
            const arrayBuffer = await SoundfontStorage.get().load(UUID.parse(soundfont.uuid))
                .then(([file, _meta]) => file);
            const path = CloudBackupSoundfonts.pathFor(soundfont.uuid);
            await Promises.approvedRetry(() => this.#cloudHandler.upload(path, arrayBuffer), error => ({
                headline: "Upload failed",
                message: `Failed to upload soundfont '${soundfont.name}'. '${error}'`,
                approveText: "Retry",
                cancelText: "Cancel"
            }));
            return soundfont;
        }));
        const catalog = Arrays.merge(cloud, uploadedSoundfonts, CloudBackupSoundfonts.areSoundfontsEqual);
        await this.#uploadCatalog(catalog);
        progress(1.0);
    }
    async #trash(trashed, progress) {
        const { cloud } = this.#soundfontDomains;
        const obsolete = Arrays.intersect(cloud, trashed, (soundfont, uuid) => soundfont.uuid === uuid);
        if (obsolete.length === 0) {
            progress(1.0);
            return;
        }
        const approved = await RuntimeNotifier.approve({
            headline: "Delete Soundfonts?",
            message: `Found ${obsolete.length} locally deleted soundfonts. Delete from cloud as well?`,
            approveText: "Yes",
            cancelText: "No"
        });
        if (!approved) {
            progress(1.0);
            return;
        }
        const result = await Promises.sequentialAll(obsolete.map((soundfont, index, { length }) => async () => {
            progress((index + 1) / length);
            this.#log(`Deleting '${soundfont.name}'`);
            await this.#cloudHandler.delete(CloudBackupSoundfonts.pathFor(soundfont.uuid));
            return soundfont;
        }));
        const catalog = cloud.slice();
        result.forEach((soundfont) => Arrays.removeIf(catalog, ({ uuid }) => soundfont.uuid === uuid));
        await this.#uploadCatalog(catalog);
        progress(1.0);
    }
    async #download(trashed, progress) {
        const { cloud, local } = this.#soundfontDomains;
        const missingLocally = Arrays.subtract(cloud, local, CloudBackupSoundfonts.areSoundfontsEqual);
        const download = Arrays.subtract(missingLocally, trashed, (soundfont, uuid) => soundfont.uuid === uuid);
        if (download.length === 0) {
            this.#log("No soundfonts to download.");
            progress(1.0);
            return;
        }
        await Promises.sequentialAll(download.map((soundfont, index, { length }) => async () => {
            progress((index + 1) / length);
            this.#log(`Downloading soundfont '${soundfont.name}'`);
            const path = CloudBackupSoundfonts.pathFor(soundfont.uuid);
            const buffer = await Promises.guardedRetry(() => this.#cloudHandler.download(path), network.DefaultRetry);
            await SoundfontStorage.get().save({
                uuid: UUID.parse(soundfont.uuid),
                file: buffer,
                meta: { ...soundfont, size: buffer.byteLength }
            });
            return soundfont;
        }));
        this.#log("Download soundfonts complete.");
        progress(1.0);
    }
    async #uploadCatalog(catalog) {
        this.#log("Uploading soundfonts catalog...");
        const jsonString = JSON.stringify(catalog, null, 2);
        const buffer = new TextEncoder().encode(jsonString).buffer;
        return this.#cloudHandler.upload(CloudBackupSoundfonts.RemoteCatalogPath, buffer);
    }
}
