var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ModularAdapter_terminator, _ModularAdapter_listeners, _ModularAdapter_context, _ModularAdapter_box, _ModularAdapter_modules, _ModularAdapter_connections;
import { asDefined, ifDefined, Listeners, Terminator, UUID } from "@opendaw/lib-std";
import { ModuleConnectionAdapter } from "./connection";
import { Pointers } from "@opendaw/studio-enums";
import { Modules } from "./module";
import { ModularDeviceBoxAdapter } from "../devices/audio-effects/ModularDeviceBoxAdapter";
export class ModularAdapter {
    constructor(context, box) {
        _ModularAdapter_terminator.set(this, new Terminator());
        _ModularAdapter_listeners.set(this, void 0);
        _ModularAdapter_context.set(this, void 0);
        _ModularAdapter_box.set(this, void 0);
        _ModularAdapter_modules.set(this, void 0);
        _ModularAdapter_connections.set(this, void 0);
        __classPrivateFieldSet(this, _ModularAdapter_context, context, "f");
        __classPrivateFieldSet(this, _ModularAdapter_box, box, "f");
        __classPrivateFieldSet(this, _ModularAdapter_listeners, __classPrivateFieldGet(this, _ModularAdapter_terminator, "f").own(new Listeners()), "f");
        __classPrivateFieldSet(this, _ModularAdapter_modules, UUID.newSet(adapter => adapter.uuid), "f");
        __classPrivateFieldSet(this, _ModularAdapter_connections, UUID.newSet(adapter => adapter.uuid), "f");
        const addModule = (pointer) => {
            const adapter = Modules.adapterFor(__classPrivateFieldGet(this, _ModularAdapter_context, "f").boxAdapters, pointer.box);
            const added = __classPrivateFieldGet(this, _ModularAdapter_modules, "f").add(adapter);
            // assert(added, `Could not add ${pointer}`)
            // TODO Implement catchupAndSubscribeTransactual that deals with that situation
            if (!added) {
                return;
            }
            __classPrivateFieldGet(this, _ModularAdapter_listeners, "f").proxy.onModuleAdded(adapter);
        };
        const removeModule = (pointer) => __classPrivateFieldGet(this, _ModularAdapter_listeners, "f").proxy.onModuleRemoved(__classPrivateFieldGet(this, _ModularAdapter_modules, "f").removeByKey(pointer.address.uuid));
        const addConnection = (pointer) => {
            const adapter = __classPrivateFieldGet(this, _ModularAdapter_context, "f").boxAdapters.adapterFor(pointer.box, ModuleConnectionAdapter);
            const added = __classPrivateFieldGet(this, _ModularAdapter_connections, "f").add(adapter);
            // assert(added, `Could not add ${pointer}`)
            // TODO Implement catchupAndSubscribeTransactual that deals with that situation
            if (!added) {
                return;
            }
            __classPrivateFieldGet(this, _ModularAdapter_listeners, "f").proxy.onConnectionAdded(adapter);
        };
        const removeConnection = (pointer) => __classPrivateFieldGet(this, _ModularAdapter_listeners, "f").proxy.onConnectionRemoved(__classPrivateFieldGet(this, _ModularAdapter_connections, "f").removeByKey(pointer.address.uuid));
        __classPrivateFieldGet(this, _ModularAdapter_box, "f").modules.pointerHub.filter(Pointers.ModuleCollection).forEach(addModule);
        __classPrivateFieldGet(this, _ModularAdapter_box, "f").connections.pointerHub.filter(Pointers.ConnectionCollection).forEach(addConnection);
        __classPrivateFieldGet(this, _ModularAdapter_terminator, "f").own(__classPrivateFieldGet(this, _ModularAdapter_box, "f").modules.pointerHub
            .subscribe({ onAdded: addModule, onRemoved: removeModule }, Pointers.ModuleCollection));
        __classPrivateFieldGet(this, _ModularAdapter_terminator, "f").own(__classPrivateFieldGet(this, _ModularAdapter_box, "f").connections.pointerHub
            .subscribe({ onAdded: addConnection, onRemoved: removeConnection }, Pointers.ConnectionCollection));
    }
    catchupAndSubscribe(listener) {
        ifDefined(listener.onModuleAdded, fn => __classPrivateFieldGet(this, _ModularAdapter_modules, "f").forEach(adapter => fn(adapter)));
        ifDefined(listener.onConnectionAdded, fn => __classPrivateFieldGet(this, _ModularAdapter_connections, "f").forEach(adapter => fn(adapter)));
        return __classPrivateFieldGet(this, _ModularAdapter_listeners, "f").subscribe(listener);
    }
    get box() { return __classPrivateFieldGet(this, _ModularAdapter_box, "f"); }
    get address() { return __classPrivateFieldGet(this, _ModularAdapter_box, "f").address; }
    get uuid() { return __classPrivateFieldGet(this, _ModularAdapter_box, "f").address.uuid; }
    get editingField() { return __classPrivateFieldGet(this, _ModularAdapter_box, "f").editing; }
    get labelField() { return __classPrivateFieldGet(this, _ModularAdapter_box, "f").label; }
    get modules() { return __classPrivateFieldGet(this, _ModularAdapter_modules, "f").values(); }
    get connections() { return __classPrivateFieldGet(this, _ModularAdapter_connections, "f").values(); }
    get device() {
        return __classPrivateFieldGet(this, _ModularAdapter_context, "f").boxAdapters
            .adapterFor(asDefined(__classPrivateFieldGet(this, _ModularAdapter_box, "f").device.pointerHub.incoming().at(0), "No device found").box, ModularDeviceBoxAdapter);
    }
    terminate() {
        console.debug(`terminate ${this}`);
        __classPrivateFieldGet(this, _ModularAdapter_terminator, "f").terminate();
    }
}
_ModularAdapter_terminator = new WeakMap(), _ModularAdapter_listeners = new WeakMap(), _ModularAdapter_context = new WeakMap(), _ModularAdapter_box = new WeakMap(), _ModularAdapter_modules = new WeakMap(), _ModularAdapter_connections = new WeakMap();
