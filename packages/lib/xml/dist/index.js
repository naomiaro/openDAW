import { asDefined, assert, isDefined, panic, WeakMaps } from "@opendaw/lib-std";
export var Xml;
(function (Xml) {
    const ClassMap = new Map();
    const MetaClassMap = new WeakMap();
    Xml.Declaration = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>";
    Xml.StringRequired = { required: true, parse: value => value };
    Xml.StringOptional = { required: false, parse: value => value };
    Xml.BoolRequired = {
        required: true,
        parse: value => typeof value === "boolean" ? value : value?.toLowerCase() === "true"
    };
    Xml.BoolOptional = {
        required: false,
        parse: value => typeof value === "boolean" ? value : value?.toLowerCase() === "true"
    };
    Xml.NumberRequired = {
        required: true, parse: value => {
            const number = Number(value);
            return isNaN(number) ? panic("NumberRequired") : number;
        }
    };
    Xml.NumberOptional = { required: false, parse: value => Number(value) };
    Xml.Attribute = (name, validator) => (target, propertyKey) => WeakMaps.createIfAbsent(MetaClassMap, target.constructor, () => new Map())
        .set(propertyKey, { type: "attribute", name, validator });
    Xml.Element = (name, clazz) => (target, propertyKey) => WeakMaps.createIfAbsent(MetaClassMap, target.constructor, () => new Map())
        .set(propertyKey, { type: "element", name, clazz });
    Xml.ElementRef = (clazz, nodeName) => (target, propertyKey) => WeakMaps.createIfAbsent(MetaClassMap, target.constructor, () => new Map())
        .set(propertyKey, { type: "element-ref", clazz, name: nodeName ?? null });
    Xml.Class = (tagName) => {
        return (constructor) => {
            assert(!ClassMap.has(tagName), `${tagName} is already registered as a class.`);
            ClassMap.set(tagName, constructor);
            WeakMaps.createIfAbsent(MetaClassMap, constructor, () => new Map())
                .set("class", { type: "class", name: tagName, clazz: constructor });
        };
    };
    Xml.element = (object, clazz) => {
        assert(clazz.length === 0, "constructor cannot have arguments");
        return Object.freeze(Object.create(clazz.prototype, Object.fromEntries(Object.entries(object).map(([key, value]) => [key, { value, enumerable: true }]))));
    };
    Xml.toElement = (tagName, object) => {
        const doc = document.implementation.createDocument(null, null);
        const getClassTagName = (constructor) => {
            const tagMeta = MetaClassMap.get(constructor)?.get("class");
            if (tagMeta?.type === "class") {
                return tagMeta.name;
            }
            return panic(`Missing @Xml.Class decorator on ${constructor.name}`);
        };
        const visit = (tagName, object) => {
            const element = doc.createElement(tagName);
            Object.entries(object).forEach(([key, value]) => {
                if (!isDefined(value))
                    return;
                const meta = Xml.resolveMeta(object.constructor, key);
                if (!isDefined(meta))
                    return;
                if (meta.type === "attribute") {
                    assert(typeof value === "number" || typeof value === "string" || typeof value === "boolean", `Attribute value must be a primitive for ${key} = ${value}`);
                    meta.validator?.parse?.call(null, value);
                    element.setAttribute(meta.name, String(value));
                }
                else if (meta.type === "element") {
                    if (Array.isArray(value)) {
                        if (value.length === 0)
                            return;
                        const wrapper = doc.createElement(meta.name);
                        value.forEach(item => {
                            if (!isDefined(item))
                                return;
                            const itemTagName = getClassTagName(item.constructor);
                            wrapper.appendChild(visit(itemTagName, item));
                        });
                        element.appendChild(wrapper);
                    }
                    else if (typeof value === "string") {
                        const child = doc.createElement(meta.name);
                        child.textContent = value;
                        element.appendChild(child);
                    }
                    else {
                        element.appendChild(visit(meta.name, value));
                    }
                }
                else if (meta.type === "element-ref") {
                    if (!Array.isArray(value))
                        return panic("ElementRef must be an array of items.");
                    if (value.length === 0)
                        return;
                    const validItems = value.filter(isDefined);
                    if (validItems.length === 0)
                        return;
                    if (meta.name) {
                        const firstItemTagName = getClassTagName(validItems[0].constructor);
                        if (meta.name === firstItemTagName) {
                            // Direct elements case
                            validItems.forEach(item => element.appendChild(visit(meta.name, item)));
                        }
                        else {
                            // Wrapper case
                            const wrapper = doc.createElement(meta.name);
                            validItems.forEach(item => wrapper.appendChild(visit(getClassTagName(item.constructor), item)));
                            element.appendChild(wrapper);
                        }
                    }
                    else {
                        // No meta.name, use class tag names directly
                        validItems.forEach(item => element.appendChild(visit(getClassTagName(item.constructor), item)));
                    }
                }
            });
            return element;
        };
        return visit(tagName, object);
    };
    Xml.pretty = (element) => {
        const PADDING = "  "; // 2 spaces
        const reg = /(>)(<)(\/*)/g;
        const xml = new XMLSerializer()
            .serializeToString(element)
            .replace(reg, "$1\n$2$3");
        let pad = 0;
        return xml.split("\n").map(line => {
            let indent = 0;
            if (line.match(/.+<\/\w[^>]*>$/)) {
                indent = 0;
            }
            else if (line.match(/^<\/\w/) && pad > 0) {
                pad -= 1;
            }
            else if (line.match(/^<\w[^>]*[^\/]>.*$/)) {
                indent = 1;
            }
            else {
                indent = 0;
            }
            const padding = PADDING.repeat(pad);
            pad += indent;
            return padding + line;
        }).join("\n");
    };
    Xml.resolveMeta = (target, propertyKey) => Xml.collectMeta(target)?.get(propertyKey);
    Xml.collectMeta = (target) => {
        const metaMap = new Map();
        while (isDefined(target)) {
            const meta = MetaClassMap.get(target);
            if (isDefined(meta)) {
                for (const [key, value] of meta.entries()) {
                    metaMap.set(key, value);
                }
            }
            target = Object.getPrototypeOf(target);
        }
        return metaMap.size > 0 ? metaMap : undefined;
    };
    const findChildByName = (parent, name) => {
        for (const child of parent.children) {
            if (child.nodeName === name) {
                return child;
            }
        }
        return null;
    };
    const findAllChildrenByName = (parent, name) => {
        const result = [];
        for (const child of parent.children) {
            if (child.nodeName === name) {
                result.push(child);
            }
        }
        return result;
    };
    Xml.parse = (xml, clazz) => {
        const deserialize = (element, clazz) => {
            const instance = Object.create(clazz.prototype);
            const classMeta = asDefined(Xml.collectMeta(clazz));
            const classMetaDict = Array.from(classMeta).reduce((acc, [key, metaInfo]) => {
                acc[key] = metaInfo;
                return acc;
            }, {});
            const keys = [...classMeta.keys()].filter(key => key !== "class");
            for (const key of keys) {
                const meta = classMetaDict[key];
                if (meta.type === "attribute") {
                    const attribute = element.getAttribute(meta.name);
                    if (isDefined(attribute)) {
                        Object.defineProperty(instance, key, {
                            value: meta.validator?.parse?.call(null, attribute) ?? attribute,
                            enumerable: true
                        });
                    }
                    else {
                        meta.validator?.required && panic(`Missing attribute '${meta.name}'`);
                        Object.defineProperty(instance, key, { value: undefined, enumerable: true });
                    }
                }
                else if (meta.type === "element") {
                    const { name, clazz: elementClazz } = meta;
                    if (elementClazz === Array) {
                        const wrapperElement = findChildByName(element, name);
                        if (wrapperElement) {
                            const items = Array.from(wrapperElement.children).map(child => {
                                const clazz = ClassMap.get(child.nodeName);
                                if (!clazz) {
                                    console.warn(`Could not find class for '${child.nodeName}', skipping`);
                                    return null;
                                }
                                return deserialize(child, clazz);
                            }).filter(item => item !== null);
                            Object.defineProperty(instance, key, { value: items, enumerable: true });
                        }
                        else {
                            Object.defineProperty(instance, key, { value: [], enumerable: true });
                        }
                    }
                    else if (elementClazz === String) {
                        const textElement = findChildByName(element, name);
                        const textContent = textElement?.textContent;
                        Object.defineProperty(instance, key, { value: textContent, enumerable: true });
                    }
                    else {
                        const child = findChildByName(element, name);
                        if (child) {
                            Object.defineProperty(instance, key, {
                                value: deserialize(child, elementClazz),
                                enumerable: true
                            });
                        }
                        else {
                            Object.defineProperty(instance, key, { value: undefined, enumerable: true });
                        }
                    }
                }
                else if (meta.type === "element-ref") {
                    if (meta.name) {
                        const directElements = findAllChildrenByName(element, meta.name);
                        if (directElements.length > 0 && directElements[0].children.length === 0) {
                            // Direct elements case
                            const items = directElements.map(child => {
                                const clazz = ClassMap.get(child.nodeName);
                                if (!clazz)
                                    return null;
                                return deserialize(child, clazz);
                            }).filter(item => item !== null);
                            Object.defineProperty(instance, key, { value: items, enumerable: true });
                        }
                        else {
                            // Wrapper case
                            const wrapperElement = findChildByName(element, meta.name);
                            if (wrapperElement && wrapperElement.children.length > 0) {
                                const items = Array.from(wrapperElement.children).map(child => {
                                    const clazz = ClassMap.get(child.nodeName);
                                    if (!clazz)
                                        return null;
                                    if (!(clazz === meta.clazz || clazz.prototype instanceof meta.clazz)) {
                                        return null;
                                    }
                                    return deserialize(child, clazz);
                                }).filter(item => item !== null);
                                Object.defineProperty(instance, key, { value: items, enumerable: true });
                            }
                            else {
                                Object.defineProperty(instance, key, { value: [], enumerable: true });
                            }
                        }
                    }
                    else {
                        // No meta.name, collect all matching children directly
                        const items = Array.from(element.children).map(child => {
                            const clazz = ClassMap.get(child.nodeName);
                            if (!clazz)
                                return null;
                            if (!(clazz === meta.clazz || clazz.prototype instanceof meta.clazz)) {
                                return null;
                            }
                            return deserialize(child, clazz);
                        }).filter(item => item !== null);
                        Object.defineProperty(instance, key, { value: items, enumerable: true });
                    }
                }
            }
            return instance;
        };
        const xmlDoc = new DOMParser().parseFromString(xml.trimStart(), "application/xml").documentElement;
        return deserialize(xmlDoc, clazz);
    };
})(Xml || (Xml = {}));
