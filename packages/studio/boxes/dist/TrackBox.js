import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Field, Int32Field, BooleanField, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class TrackBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new TrackBox({
            uuid,
            graph,
            name: "TrackBox",
            pointerRules: {
                accepts: [Pointers.Selection, Pointers.PianoMode],
                mandatory: false,
            },
        }), constructor);
    }
    static ClassName = "TrackBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitTrackBox, this);
    }
    get tracks() {
        return this.getField(1);
    }
    get target() {
        return this.getField(2);
    }
    get regions() {
        return this.getField(3);
    }
    get clips() {
        return this.getField(4);
    }
    get index() {
        return this.getField(10);
    }
    get type() {
        return this.getField(11);
    }
    get enabled() {
        return this.getField(20);
    }
    get excludePianoMode() {
        return this.getField(30);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "tracks",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.TrackCollection, true),
            2: PointerField.create({
                parent: this,
                fieldKey: 2,
                fieldName: "target",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.Automation, true),
            3: Field.hook({
                parent: this,
                fieldKey: 3,
                fieldName: "regions",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.RegionCollection],
                    mandatory: false,
                },
            }),
            4: Field.hook({
                parent: this,
                fieldKey: 4,
                fieldName: "clips",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.ClipCollection],
                    mandatory: false,
                },
            }),
            10: Int32Field.create({
                parent: this,
                fieldKey: 10,
                fieldName: "index",
                deprecated: false,
                pointerRules: NoPointers,
            }, "index", ""),
            11: Int32Field.create({
                parent: this,
                fieldKey: 11,
                fieldName: "type",
                deprecated: false,
                pointerRules: NoPointers,
            }, { values: [0, 1, 2, 3] }, ""),
            20: BooleanField.create({
                parent: this,
                fieldKey: 20,
                fieldName: "enabled",
                deprecated: false,
                pointerRules: NoPointers,
            }, true),
            30: BooleanField.create({
                parent: this,
                fieldKey: 30,
                fieldName: "excludePianoMode",
                deprecated: false,
                pointerRules: NoPointers,
            }, false),
        };
    }
}
