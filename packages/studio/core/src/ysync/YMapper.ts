import {
    Address,
    ArrayField,
    Box,
    Field,
    Fields,
    ObjectField,
    PointerField,
    PrimitiveField,
    Vertex
} from "@naomiarotest/lib-box"
import * as Y from "yjs"
import {asDefined, asInstanceOf, assert, isDefined, JSONValue, UUID} from "@naomiarotest/lib-std"

export namespace YMapper {
    export const createBoxMap = (box: Box): Y.Map<unknown> => {
        const map = new Y.Map()
        map.set("name", box.name)
        map.set("fields", createDeepMap(box.record()))
        return map
    }

    export const applyFromBoxMap = (box: Box, source: Y.Map<unknown>): void => {
        const writeBranch = (vertex: Vertex, map: Y.Map<unknown>) => {
            vertex.fields().forEach(field => {
                const value: unknown = map.get(String(field.fieldKey))
                field.accept({
                    visitArrayField: <FIELD extends Field>(field: ArrayField<FIELD>) =>
                        writeBranch(field, asInstanceOf(value, Y.Map)),
                    visitObjectField: <FIELDS extends Fields>(field: ObjectField<FIELDS>) =>
                        writeBranch(field, asInstanceOf(value, Y.Map)),
                    // those will panic if the type is a mismatch
                    visitPointerField: (field: PointerField) => field.fromJSON(value as JSONValue),
                    visitPrimitiveField: (field: PrimitiveField) => field.fromJSON(value as JSONValue)
                })
            })
        }
        writeBranch(box, source)
    }

    export const pathToAddress = ([uuidAsString, _, ...fieldKeysFromPath]: ReadonlyArray<string | number>, leafKey: string): Address => {
        assert(isDefined(uuidAsString), "Invalid path")
        const fieldKeys = new Int16Array(fieldKeysFromPath.length + 1)
        fieldKeysFromPath.forEach((key, index) => fieldKeys[index] = Number(key))
        fieldKeys[fieldKeysFromPath.length] = Number(leafKey)
        return new Address(UUID.parse(String(uuidAsString)), fieldKeys)
    }

    export const findMap = (map: Y.Map<unknown>, fieldKeys: ReadonlyArray<string | number>): Y.Map<unknown> =>
        fieldKeys.reduce((map, key) => asDefined(map.get(String(key)), "Could not findMap") as Y.Map<unknown>, map)

    const createDeepMap = (struct: Readonly<Record<string, Field>>): Y.Map<unknown> => Object.entries(struct)
        .reduce((map, [key, field]) => {
            field.accept({
                visitPrimitiveField: (field: PrimitiveField): unknown => map.set(key, field.toJSON() ?? null),
                visitPointerField: (field: PointerField): unknown => map.set(key, field.toJSON() ?? null),
                visitArrayField: (field: ArrayField): unknown => map.set(key, createDeepMap(field.record())),
                visitObjectField: (field: ObjectField<any>): unknown => map.set(key, createDeepMap(field.record()))
            })
            return map
        }, new Y.Map())
}