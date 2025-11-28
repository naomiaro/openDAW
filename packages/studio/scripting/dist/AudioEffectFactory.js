import { DelayDeviceBox } from "@opendaw/studio-boxes";
import { Unhandled, UUID } from "@opendaw/lib-std";
export class AudioEffectFactory {
    static write(boxGraph, audioUnitBox, effect) {
        switch (effect.key) {
            case "delay": {
                return DelayDeviceBox.create(boxGraph, UUID.generate(), box => {
                    box.delay.setValue(effect.delay);
                    box.feedback.setValue(effect.feedback);
                    box.cross.setValue(effect.cross);
                    box.filter.setValue(effect.filter);
                    box.dry.setValue(effect.dry);
                    box.wet.setValue(effect.wet);
                    box.enabled.setValue(effect.enabled);
                    box.label.setValue(effect.label); // TODO uniquify?
                    box.host.refer(audioUnitBox.audioEffects);
                });
            }
            default:
                return Unhandled(effect.key);
        }
    }
}
