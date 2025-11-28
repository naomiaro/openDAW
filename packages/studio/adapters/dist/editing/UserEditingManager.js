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
var _UserEditingManager_terminator, _UserEditingManager_modularSystem, _UserEditingManager_timeline, _UserEditingManager_audioUnit;
import { Terminator } from "@opendaw/lib-std";
import { UserEditing } from "./UserEditing";
export class UserEditingManager {
    constructor(editing) {
        _UserEditingManager_terminator.set(this, void 0);
        _UserEditingManager_modularSystem.set(this, void 0);
        _UserEditingManager_timeline.set(this, void 0);
        _UserEditingManager_audioUnit.set(this, void 0);
        __classPrivateFieldSet(this, _UserEditingManager_terminator, new Terminator(), "f");
        __classPrivateFieldSet(this, _UserEditingManager_modularSystem, __classPrivateFieldGet(this, _UserEditingManager_terminator, "f").own(new UserEditing(editing)), "f");
        __classPrivateFieldSet(this, _UserEditingManager_timeline, __classPrivateFieldGet(this, _UserEditingManager_terminator, "f").own(new UserEditing(editing)), "f");
        __classPrivateFieldSet(this, _UserEditingManager_audioUnit, __classPrivateFieldGet(this, _UserEditingManager_terminator, "f").own(new UserEditing(editing)), "f");
    }
    follow(userInterfaceBox) {
        __classPrivateFieldGet(this, _UserEditingManager_modularSystem, "f").follow(userInterfaceBox.editingModularSystem);
        __classPrivateFieldGet(this, _UserEditingManager_timeline, "f").follow(userInterfaceBox.editingTimelineRegion);
        __classPrivateFieldGet(this, _UserEditingManager_audioUnit, "f").follow(userInterfaceBox.editingDeviceChain);
    }
    get modularSystem() { return __classPrivateFieldGet(this, _UserEditingManager_modularSystem, "f"); }
    get timeline() { return __classPrivateFieldGet(this, _UserEditingManager_timeline, "f"); }
    get audioUnit() { return __classPrivateFieldGet(this, _UserEditingManager_audioUnit, "f"); }
    terminate() { __classPrivateFieldGet(this, _UserEditingManager_terminator, "f").terminate(); }
}
_UserEditingManager_terminator = new WeakMap(), _UserEditingManager_modularSystem = new WeakMap(), _UserEditingManager_timeline = new WeakMap(), _UserEditingManager_audioUnit = new WeakMap();
