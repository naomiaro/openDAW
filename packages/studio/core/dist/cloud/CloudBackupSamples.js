import { Arrays, Errors, panic, Progress, RuntimeNotifier, UUID } from "@opendaw/lib-std";
import { network, Promises } from "@opendaw/lib-runtime";
import { SamplePeaks } from "@opendaw/lib-fusion";
import { OpenSampleAPI, SampleStorage } from "../samples";
import { Workers } from "../Workers";
import { WavFile } from "../WavFile";
export class CloudBackupSamples {
    static RemotePath = "samples";
    static RemoteCatalogPath = `${this.RemotePath}/index.json`;
    static areSamplesEqual = ({ uuid: a }, { uuid: b }) => a === b;
    static pathFor(uuid) { return `${this.RemotePath}/${uuid}.wav`; }
    static async start(cloudHandler, progress, log) {
        log("Collecting all sample domains...");
        const [stock, local, cloud] = await Promise.all([
            OpenSampleAPI.get().all(),
            SampleStorage.get().list(),
            cloudHandler.download(CloudBackupSamples.RemoteCatalogPath)
                .then(json => JSON.parse(new TextDecoder().decode(json)))
                .catch(reason => reason instanceof Errors.FileNotFound ? Arrays.empty() : panic(reason))
        ]);
        return new CloudBackupSamples(cloudHandler, { stock, local, cloud }, log).#start(progress);
    }
    #cloudHandler;
    #sampleDomains;
    #log;
    constructor(cloudHandler, sampleDomains, log) {
        this.#cloudHandler = cloudHandler;
        this.#sampleDomains = sampleDomains;
        this.#log = log;
    }
    async #start(progress) {
        const trashed = await SampleStorage.get().loadTrashedIds();
        const [uploadProgress, trashProgress, downloadProgress] = Progress.splitWithWeights(progress, [0.45, 0.10, 0.45]);
        await this.#upload(uploadProgress);
        await this.#trash(trashed, trashProgress);
        await this.#download(trashed, downloadProgress);
    }
    async #upload(progress) {
        const { stock, local, cloud } = this.#sampleDomains;
        const maybeUnsyncedSamples = Arrays.subtract(local, stock, CloudBackupSamples.areSamplesEqual);
        const unsyncedSamples = Arrays.subtract(maybeUnsyncedSamples, cloud, CloudBackupSamples.areSamplesEqual);
        if (unsyncedSamples.length === 0) {
            this.#log("No unsynced samples found.");
            progress(1.0);
            return;
        }
        const uploadedSamples = await Promises.sequentialAll(unsyncedSamples.map((sample, index, { length }) => async () => {
            progress((index + 1) / length);
            this.#log(`Uploading sample '${sample.name}'`);
            const arrayBuffer = await SampleStorage.get().load(UUID.parse(sample.uuid))
                .then(([{ frames: channels, numberOfChannels, numberOfFrames: numFrames, sampleRate }]) => WavFile.encodeFloats({ channels, numberOfChannels, numFrames, sampleRate }));
            const path = CloudBackupSamples.pathFor(sample.uuid);
            await Promises.approvedRetry(() => this.#cloudHandler.upload(path, arrayBuffer), error => ({
                headline: "Upload failed",
                message: `Failed to upload sample '${sample.name}'. '${error}'`,
                approveText: "Retry",
                cancelText: "Cancel"
            }));
            return sample;
        }));
        const catalog = Arrays.merge(cloud, uploadedSamples, CloudBackupSamples.areSamplesEqual);
        await this.#uploadCatalog(catalog);
        progress(1.0);
    }
    async #trash(trashed, progress) {
        const { cloud } = this.#sampleDomains;
        const obsolete = Arrays.intersect(cloud, trashed, (sample, uuid) => sample.uuid === uuid);
        if (obsolete.length === 0) {
            progress(1.0);
            return;
        }
        const approved = await RuntimeNotifier.approve({
            headline: "Delete Samples?",
            message: `Found ${obsolete.length} locally deleted samples. Delete from cloud as well?`,
            approveText: "Yes",
            cancelText: "No"
        });
        if (!approved) {
            progress(1.0);
            return;
        }
        const result = await Promises.sequentialAll(obsolete.map((sample, index, { length }) => async () => {
            progress((index + 1) / length);
            this.#log(`Deleting '${sample.name}'`);
            await this.#cloudHandler.delete(CloudBackupSamples.pathFor(sample.uuid));
            return sample;
        }));
        const catalog = cloud.slice();
        result.forEach((sample) => Arrays.removeIf(catalog, ({ uuid }) => sample.uuid === uuid));
        await this.#uploadCatalog(catalog);
        progress(1.0);
    }
    async #download(trashed, progress) {
        const { cloud, local } = this.#sampleDomains;
        const missingLocally = Arrays.subtract(cloud, local, CloudBackupSamples.areSamplesEqual);
        const download = Arrays.subtract(missingLocally, trashed, (sample, uuid) => sample.uuid === uuid);
        if (download.length === 0) {
            this.#log("No samples to download.");
            progress(1.0);
            return;
        }
        await Promises.sequentialAll(download.map((sample, index, { length }) => async () => {
            progress((index + 1) / length);
            this.#log(`Downloading sample '${sample.name}'`);
            const path = CloudBackupSamples.pathFor(sample.uuid);
            const buffer = await Promises.guardedRetry(() => this.#cloudHandler.download(path), network.DefaultRetry);
            const waveAudio = WavFile.decodeFloats(buffer);
            const audioData = {
                sampleRate: waveAudio.sampleRate,
                numberOfFrames: waveAudio.numFrames,
                numberOfChannels: waveAudio.channels.length,
                frames: waveAudio.channels
            };
            const shifts = SamplePeaks.findBestFit(audioData.numberOfFrames);
            const peaks = await Workers.Peak.generateAsync(Progress.Empty, shifts, audioData.frames, audioData.numberOfFrames, audioData.numberOfChannels);
            await SampleStorage.get().save({
                uuid: UUID.parse(sample.uuid),
                audio: audioData,
                peaks: peaks,
                meta: sample
            });
            return sample;
        }));
        this.#log("Download samples complete.");
        progress(1.0);
    }
    async #uploadCatalog(catalog) {
        this.#log("Uploading sample catalog...");
        const jsonString = JSON.stringify(catalog, null, 2);
        const buffer = new TextEncoder().encode(jsonString).buffer;
        return this.#cloudHandler.upload(CloudBackupSamples.RemoteCatalogPath, buffer);
    }
}
