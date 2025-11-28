import { Option } from "./option";
export var Editing;
(function (Editing) {
    Editing.Transient = Object.freeze({
        modify: (modifier, _mark) => Option.wrap(modifier()),
        mark: () => { }
    });
})(Editing || (Editing = {}));
