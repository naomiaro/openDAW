import { Stringifiable, Terminable } from "@opendaw/lib-std";
export declare namespace Inject {
    export const ref: <T>() => Ref<T>;
    export const value: <T extends Stringifiable>(initialValue: T) => Value<T>;
    export const classList: (...initialClassNames: Array<string>) => ClassList;
    export const attribute: (initialAttributeValue: string) => Attribute;
    interface Injector<T> extends Terminable {
        addTarget(target: T, ...args: Array<unknown>): void;
    }
    export class Ref<T> implements Injector<T> {
        #private;
        get(): T;
        addTarget(target: T): void;
        hasTarget(): boolean;
        terminate(): void;
    }
    export class Value<T extends Stringifiable = Stringifiable> implements Injector<Text> {
        #private;
        constructor(value: T);
        get value(): T;
        set value(value: T);
        addTarget(text: Text): void;
        terminate(): void;
    }
    export class ClassList implements Injector<Element> {
        #private;
        constructor(classes: Array<string>);
        add(className: string): void;
        remove(className: string): void;
        toggle(className: string, force?: boolean): void;
        addTarget(target: Element): void;
        terminate(): void;
    }
    export class Attribute implements Injector<Element> {
        #private;
        constructor(value: string);
        get value(): string;
        set value(value: string);
        toggle(expected: string, alternative: string): void;
        addTarget(target: Element, key: string): void;
        terminate(): void;
    }
    export {};
}
//# sourceMappingURL=inject.d.ts.map