import { asInstanceOf, isDefined, UUID } from "@opendaw/lib-std";
import { AudioUnitBox } from "@opendaw/studio-boxes";
import { CaptureMidi } from "./CaptureMidi";
import { CaptureAudio } from "./CaptureAudio";
export class CaptureDevices {
    #project;
    #subscription;
    #captures;
    #captureSubscriptions;
    constructor(project) {
        this.#project = project;
        this.#captures = UUID.newSet(({ uuid }) => uuid);
        this.#captureSubscriptions = UUID.newSet(({ uuid }) => uuid);
        this.#subscription = this.#project.rootBox.audioUnits.pointerHub.catchupAndSubscribe({
            onAdded: ({ box }) => {
                const uuid = box.address.uuid;
                const audioUnitBox = asInstanceOf(box, AudioUnitBox);
                const subscription = audioUnitBox.capture.catchupAndSubscribe(pointer => {
                    this.#captures.removeByKeyIfExist(uuid)?.terminate();
                    pointer.targetVertex.ifSome(({ box }) => {
                        const capture = box.accept({
                            visitCaptureMidiBox: (box) => new CaptureMidi(this, audioUnitBox, box),
                            visitCaptureAudioBox: (box) => new CaptureAudio(this, audioUnitBox, box)
                        });
                        if (isDefined(capture)) {
                            this.#captures.add(capture);
                        }
                    });
                });
                this.#captureSubscriptions.add({ uuid, subscription });
            },
            onRemoved: ({ box: { address: { uuid } } }) => {
                this.#captures.removeByKeyIfExist(uuid)?.terminate();
                this.#captureSubscriptions.get(uuid).subscription.terminate();
            }
        });
    }
    get project() { return this.#project; }
    get(uuid) { return this.#captures.opt(uuid); }
    setArm(subject, exclusive) {
        const arming = !subject.armed.getValue();
        subject.armed.setValue(arming);
        if (arming && exclusive) {
            this.#captures.values()
                .filter(capture => subject !== capture)
                .forEach(capture => capture.armed.setValue(false));
        }
    }
    filterArmed() {
        return this.#captures.values()
            .filter(capture => capture.armed.getValue() && capture.audioUnitBox.input.pointerHub.nonEmpty());
    }
    terminate() {
        this.#subscription.terminate();
        this.#captures.forEach(capture => capture.terminate());
        this.#captures.clear();
    }
}
