import { asDefined } from "@opendaw/lib-std";
import { ModuleDelayAdapter } from "./modules/delay";
import { ModularAudioOutputAdapter } from "./modules/audio-output";
import { ModuleGainAdapter } from "./modules/gain";
import { ModuleMultiplierAdapter } from "./modules/multiplier";
import { ModularAudioInputAdapter } from "./modules/audio-input";
export var Modules;
(function (Modules) {
    Modules.isVertexOfModule = (vertex) => vertex.box.accept({
        visitModuleGainBox: () => true,
        visitModuleDelayBox: () => true,
        visitModuleMultiplierBox: () => true,
        visitModularAudioInputBox: () => true,
        visitModularAudioOutputBox: () => true
    }) ?? false;
    Modules.adapterFor = (adapters, box) => asDefined(box.accept({
        visitModuleGainBox: (box) => adapters.adapterFor(box, ModuleGainAdapter),
        visitModuleDelayBox: (box) => adapters.adapterFor(box, ModuleDelayAdapter),
        visitModuleMultiplierBox: (box) => adapters.adapterFor(box, ModuleMultiplierAdapter),
        visitModularAudioInputBox: (box) => adapters.adapterFor(box, ModularAudioInputAdapter),
        visitModularAudioOutputBox: (box) => adapters.adapterFor(box, ModularAudioOutputAdapter)
    }), `Could not find ModuleAdapter for ${box.name}`);
})(Modules || (Modules = {}));
