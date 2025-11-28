import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, Field, Int32Field, Float32Field, } from "@opendaw/lib-box";
import { Signature } from "./Signature";
import { LoopArea } from "./LoopArea";
import { MarkerTrack } from "./MarkerTrack";
import { Pointers } from "@opendaw/studio-enums";
export class TimelineBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new TimelineBox({
            uuid,
            graph,
            name: "TimelineBox",
            pointerRules: NoPointers,
        }), constructor);
    }
    static ClassName = "TimelineBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitTimelineBox, this);
    }
    get root() {
        return this.getField(1);
    }
    get signature() {
        return this.getField(10);
    }
    get loopArea() {
        return this.getField(11);
    }
    get deprecatedMarkerTrack() {
        return this.getField(20);
    }
    get markerTrack() {
        return this.getField(21);
    }
    get durationInPulses() {
        return this.getField(30);
    }
    get bpm() {
        return this.getField(31);
    }
    initializeFields() {
        return {
            1: Field.hook({
                parent: this,
                fieldKey: 1,
                fieldName: "root",
                deprecated: false,
                pointerRules: { accepts: [Pointers.Timeline], mandatory: true },
            }),
            10: Signature.create({
                parent: this,
                fieldKey: 10,
                fieldName: "signature",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            11: LoopArea.create({
                parent: this,
                fieldKey: 11,
                fieldName: "loopArea",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            20: Field.hook({
                parent: this,
                fieldKey: 20,
                fieldName: "deprecatedMarkerTrack",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.MarkerTrack],
                    mandatory: false,
                },
            }),
            21: MarkerTrack.create({
                parent: this,
                fieldKey: 21,
                fieldName: "markerTrack",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            30: Int32Field.create({
                parent: this,
                fieldKey: 30,
                fieldName: "durationInPulses",
                deprecated: false,
                pointerRules: NoPointers,
            }, "positive", "ppqn", 491520),
            31: Float32Field.create({
                parent: this,
                fieldKey: 31,
                fieldName: "bpm",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: 30, max: 999, scaling: "exponential" }, "bpm", 120),
        };
    }
}
