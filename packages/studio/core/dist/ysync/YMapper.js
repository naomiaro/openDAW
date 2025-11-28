import { Address } from "@opendaw/lib-box";
import * as Y from "yjs";
import { asDefined, asInstanceOf, assert, isDefined, UUID } from "@opendaw/lib-std";
export var YMapper;
(function (YMapper) {
    YMapper.createBoxMap = (box) => {
        const map = new Y.Map();
        map.set("name", box.name);
        map.set("fields", createDeepMap(box.record()));
        return map;
    };
    YMapper.applyFromBoxMap = (box, source) => {
        const writeBranch = (vertex, map) => {
            vertex.fields().forEach(field => {
                const value = map.get(String(field.fieldKey));
                field.accept({
                    visitArrayField: (field) => writeBranch(field, asInstanceOf(value, Y.Map)),
                    visitObjectField: (field) => writeBranch(field, asInstanceOf(value, Y.Map)),
                    // those will panic if the type is a mismatch
                    visitPointerField: (field) => field.fromJSON(value),
                    visitPrimitiveField: (field) => field.fromJSON(value)
                });
            });
        };
        writeBranch(box, source);
    };
    YMapper.pathToAddress = ([uuidAsString, _, ...fieldKeysFromPath], leafKey) => {
        assert(isDefined(uuidAsString), "Invalid path");
        const fieldKeys = new Int16Array(fieldKeysFromPath.length + 1);
        fieldKeysFromPath.forEach((key, index) => fieldKeys[index] = Number(key));
        fieldKeys[fieldKeysFromPath.length] = Number(leafKey);
        return new Address(UUID.parse(String(uuidAsString)), fieldKeys);
    };
    YMapper.findMap = (map, fieldKeys) => fieldKeys.reduce((map, key) => asDefined(map.get(String(key)), "Could not findMap"), map);
    const createDeepMap = (struct) => Object.entries(struct)
        .reduce((map, [key, field]) => {
        field.accept({
            visitPrimitiveField: (field) => map.set(key, field.toJSON() ?? null),
            visitPointerField: (field) => map.set(key, field.toJSON() ?? null),
            visitArrayField: (field) => map.set(key, createDeepMap(field.record())),
            visitObjectField: (field) => map.set(key, createDeepMap(field.record()))
        });
        return map;
    }, new Y.Map());
})(YMapper || (YMapper = {}));
