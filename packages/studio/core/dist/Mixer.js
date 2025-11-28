import { Arrays, asDefined, EmptyExec, Terminable, Terminator, UUID } from "@opendaw/lib-std";
import { Pointers } from "@opendaw/studio-enums";
import { deferNextFrame } from "@opendaw/lib-dom";
export class Mixer {
    #terminator = new Terminator();
    #states;
    #solo;
    #virtualSolo;
    #deferUpdate;
    constructor(audioUnits) {
        this.#states = UUID.newSet(({ adapter: { uuid } }) => uuid);
        this.#solo = new Set();
        this.#virtualSolo = new Set();
        this.#deferUpdate = this.#terminator.own(deferNextFrame(() => this.#updateStates()));
        this.#terminator.own(audioUnits.catchupAndSubscribe({
            onAdd: (adapter) => {
                const { mute, solo } = adapter.namedParameter;
                const views = [];
                this.#states.add({
                    adapter,
                    views,
                    subscription: Terminable.many(mute.catchupAndSubscribe(owner => {
                        if (owner.getControlledValue()) {
                            views.forEach(view => view.silent(true));
                        }
                        else {
                            this.#deferUpdate.request();
                        }
                    }), solo.catchupAndSubscribe(owner => {
                        if (owner.getControlledValue()) {
                            this.#solo.add(adapter);
                        }
                        else {
                            this.#solo.delete(adapter);
                        }
                        this.#deferUpdate.request();
                    }))
                });
            },
            onRemove: (adapter) => {
                this.#solo.delete(adapter);
                this.#states.removeByKey(adapter.uuid).subscription.terminate();
                this.#deferUpdate.request();
            },
            onReorder: EmptyExec
        }));
    }
    registerChannelStrip({ uuid }, view) {
        this.#states.get(uuid).views.push(view);
        this.#deferUpdate.request();
        return Terminable.create(() => {
            this.#states.opt(uuid).ifSome(({ views }) => Arrays.remove(views, view));
            this.#deferUpdate.request();
        });
    }
    terminate() { this.#terminator.terminate(); }
    #updateStates() {
        this.#virtualSolo.clear();
        this.#processChannelStrips();
        this.#updateChannelStripViews();
    }
    #processChannelStrips() {
        const touched = new Set();
        const processUpstreamChannels = (adapter) => {
            if (touched.has(adapter)) {
                return;
            }
            touched.add(adapter);
            adapter.input.getValue().ifSome(input => {
                if (input.type === "bus") {
                    input.box.input.pointerHub
                        .filter(Pointers.AudioOutput)
                        .map(pointer => this.#resolveAdapter(pointer.box))
                        .forEach((adapter) => {
                        const { namedParameter: { solo } } = adapter;
                        if (!solo.getControlledValue()) {
                            this.#virtualSolo.add(adapter);
                        }
                        processUpstreamChannels(adapter);
                    });
                }
            });
        };
        this.#states.forEach(({ adapter }) => {
            const { namedParameter: { solo } } = adapter;
            if (solo.getControlledValue()) {
                processUpstreamChannels(adapter);
            }
        });
    }
    #resolveAdapter(box) {
        return asDefined(box.accept({
            visitAudioUnitBox: ({ address: { uuid } }) => this.#states.get(uuid).adapter,
            visitAuxSendBox: ({ audioUnit: { targetVertex } }) => this.#states.get(targetVertex.unwrap().address.uuid).adapter
        }), "Could not resolve entry");
    }
    #updateChannelStripViews() {
        this.#states.forEach(({ adapter, views }) => {
            const { mute, solo } = adapter.namedParameter;
            if (mute.getControlledValue()) {
                views.forEach(view => view.silent(true));
            }
            else {
                const isSolo = solo.getControlledValue() || this.#virtualSolo.has(adapter);
                const value = this.#solo.size > 0 && !isSolo && !adapter.isOutput;
                views.forEach(view => view.silent(value));
            }
        });
    }
}
