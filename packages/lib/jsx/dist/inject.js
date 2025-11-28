import { isDefined, Option } from "@opendaw/lib-std";
import { WeakRefSet } from "./weak";
export var Inject;
(function (Inject) {
    Inject.ref = () => new Ref();
    Inject.value = (initialValue) => new Value(initialValue);
    Inject.classList = (...initialClassNames) => new ClassList(initialClassNames);
    Inject.attribute = (initialAttributeValue) => new Attribute(initialAttributeValue);
    class Ref {
        #target = Option.None;
        get() { return this.#target.unwrap("No target provided"); }
        addTarget(target) { this.#target = Option.wrap(target); }
        hasTarget() { return this.#target.nonEmpty(); }
        terminate() { this.#target = Option.None; }
    }
    Inject.Ref = Ref;
    class Value {
        #targets = new WeakRefSet();
        #value;
        constructor(value) { this.#value = value; }
        get value() { return this.#value; }
        set value(value) {
            if (this.#value === value) {
                return;
            }
            this.#value = value;
            this.#targets.forEach(text => { text.nodeValue = String(value); });
        }
        addTarget(text) { this.#targets.add(text); }
        terminate() { this.#targets.clear(); }
    }
    Inject.Value = Value;
    class ClassList {
        #targets;
        #classes;
        constructor(classes) {
            this.#targets = new WeakRefSet();
            this.#classes = new Set(classes);
        }
        add(className) {
            this.#classes.add(className);
            this.#updateElements();
        }
        remove(className) {
            this.#classes.delete(className);
            this.#updateElements();
        }
        toggle(className, force) {
            if (isDefined(force)) {
                if (force) {
                    this.#classes.add(className);
                }
                else {
                    this.#classes.delete(className);
                }
            }
            else {
                if (this.#classes.has(className)) {
                    this.#classes.delete(className);
                }
                else {
                    this.#classes.add(className);
                }
            }
            this.#updateElements();
        }
        addTarget(target) {
            this.#targets.add(target);
            this.#updateElement(target);
        }
        terminate() { this.#targets.clear(); }
        #updateElements() { this.#targets.forEach(this.#updateElement); }
        #updateElement = (element) => { element.className = Array.from(this.#classes).join(" "); };
    }
    Inject.ClassList = ClassList;
    class Attribute {
        #targets;
        #keys;
        #value;
        constructor(value) {
            this.#targets = new WeakRefSet();
            this.#keys = new WeakMap();
            this.#value = value;
        }
        get value() { return this.#value; }
        set value(value) {
            if (this.#value === value) {
                return;
            }
            this.#value = value;
            this.#updateElements();
        }
        toggle(expected, alternative) {
            this.value = this.value === expected ? alternative : expected;
        }
        addTarget(target, key) {
            this.#targets.add(target);
            this.#keys.set(target, key);
            this.#updateElement(target);
        }
        terminate() { this.#targets.clear(); }
        #updateElements() { this.#targets.forEach(this.#updateElement); }
        #updateElement = (element) => {
            const key = this.#keys.get(element);
            if (key !== undefined) {
                element.setAttribute(key, this.#value);
            }
        };
    }
    Inject.Attribute = Attribute;
})(Inject || (Inject = {}));
