import { Class, Maybe } from "@opendaw/lib-std";
export declare namespace Xml {
    type Meta = {
        type: "class";
        name: string;
        clazz: Class;
    } | {
        type: "element";
        name: string;
        clazz: Class;
    } | {
        type: "element-ref";
        clazz: Class;
        name: string | null;
    } | {
        type: "attribute";
        name: string;
        validator?: AttributeValidator<unknown>;
    };
    type MetaMap = Map<PropertyKey, Meta>;
    export const Declaration = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>";
    export interface AttributeValidator<T> {
        required: boolean;
        parse(value: string | T): T;
    }
    export const StringRequired: AttributeValidator<string>;
    export const StringOptional: AttributeValidator<string>;
    export const BoolRequired: AttributeValidator<boolean>;
    export const BoolOptional: AttributeValidator<boolean>;
    export const NumberRequired: AttributeValidator<number>;
    export const NumberOptional: AttributeValidator<number>;
    export const Attribute: (name: string, validator?: AttributeValidator<unknown>) => PropertyDecorator;
    export const Element: (name: string, clazz: Class) => PropertyDecorator;
    export const ElementRef: (clazz: Class, nodeName?: string) => PropertyDecorator;
    export const Class: (tagName: string) => ClassDecorator;
    export const element: <T extends {}>(object: T, clazz: Class<T>) => T;
    export const toElement: (tagName: string, object: Record<string, any>) => Element;
    export const pretty: (element: Element) => string;
    export const resolveMeta: (target: Function, propertyKey: PropertyKey) => Maybe<Meta>;
    export const collectMeta: (target: Function) => Maybe<MetaMap>;
    export const parse: <T extends {}>(xml: string, clazz: Class<T>) => T;
    export {};
}
//# sourceMappingURL=index.d.ts.map