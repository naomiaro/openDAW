import "@opendaw/lib-std";
import { ObjectField, Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class DeviceUserInterface extends ObjectField {
    static create(construct) {
        return new DeviceUserInterface(construct);
    }
    constructor(construct) {
        super(construct);
    }
    get elements() {
        return this.getField(1);
    }
    initializeFields() {
        return {
            1: Field.hook({
                parent: this,
                fieldKey: 1,
                fieldName: "elements",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.DeviceUserInterface],
                    mandatory: false,
                },
            }),
        };
    }
}
