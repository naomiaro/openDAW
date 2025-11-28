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
var _UserEditing_editing, _UserEditing_notifier, _UserEditing_subscription, _UserEditing_pointer;
import { Notifier, Option } from "@opendaw/lib-std";
export class UserEditing {
    constructor(editing) {
        _UserEditing_editing.set(this, void 0);
        _UserEditing_notifier.set(this, void 0);
        _UserEditing_subscription.set(this, Option.None);
        _UserEditing_pointer.set(this, Option.None);
        __classPrivateFieldSet(this, _UserEditing_editing, editing, "f");
        __classPrivateFieldSet(this, _UserEditing_notifier, new Notifier(), "f");
    }
    catchupAndSubscribe(observer) {
        observer(this.get());
        return __classPrivateFieldGet(this, _UserEditing_notifier, "f").subscribe(observer);
    }
    follow(pointer) {
        __classPrivateFieldSet(this, _UserEditing_pointer, Option.wrap(pointer), "f");
        __classPrivateFieldGet(this, _UserEditing_subscription, "f").ifSome(subscription => subscription.terminate());
        __classPrivateFieldSet(this, _UserEditing_subscription, Option.wrap(pointer
            .catchupAndSubscribe(pointer => __classPrivateFieldGet(this, _UserEditing_notifier, "f").notify(pointer.targetVertex))), "f");
    }
    edit(target) {
        __classPrivateFieldGet(this, _UserEditing_pointer, "f").ifSome(pointer => __classPrivateFieldGet(this, _UserEditing_editing, "f").modify(() => pointer.refer(target)));
    }
    isEditing(vertex) {
        return __classPrivateFieldGet(this, _UserEditing_pointer, "f").match({
            none: () => false,
            some: pointer => pointer.targetVertex.contains(vertex)
        });
    }
    get() { return __classPrivateFieldGet(this, _UserEditing_pointer, "f").flatMap(pointer => pointer.targetVertex); }
    clear() { __classPrivateFieldGet(this, _UserEditing_pointer, "f").ifSome(pointer => __classPrivateFieldGet(this, _UserEditing_editing, "f").modify(() => pointer.defer())); }
    terminate() {
        __classPrivateFieldSet(this, _UserEditing_pointer, Option.None, "f");
        __classPrivateFieldGet(this, _UserEditing_subscription, "f").ifSome(subscription => subscription.terminate());
        __classPrivateFieldSet(this, _UserEditing_subscription, Option.None, "f");
        __classPrivateFieldGet(this, _UserEditing_notifier, "f").notify(Option.None);
        __classPrivateFieldGet(this, _UserEditing_notifier, "f").terminate();
    }
}
_UserEditing_editing = new WeakMap(), _UserEditing_notifier = new WeakMap(), _UserEditing_subscription = new WeakMap(), _UserEditing_pointer = new WeakMap();
