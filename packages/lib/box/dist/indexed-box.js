import { clamp, panic } from "@opendaw/lib-std";
import { Int32Field } from "./primitive";
export var IndexedBox;
(function (IndexedBox) {
    IndexedBox.insertOrder = (field, insertIndex = Number.MAX_SAFE_INTEGER) => {
        const boxes = IndexedBox.collectIndexedBoxes(field);
        const newIndex = clamp(insertIndex, 0, boxes.length);
        if (newIndex < boxes.length) {
            for (let index = newIndex; index < boxes.length; index++) {
                boxes[index].index.setValue(index + 1);
            }
        }
        return newIndex;
    };
    IndexedBox.removeOrder = (field, removeIndex) => {
        const boxes = IndexedBox.collectIndexedBoxes(field);
        if (removeIndex < boxes.length) {
            for (let index = removeIndex + 1; index < boxes.length; index++) {
                boxes[index].index.setValue(index - 1);
            }
        }
    };
    IndexedBox.moveIndex = (field, startIndex, delta) => {
        const boxes = IndexedBox.collectIndexedBoxes(field);
        const movingBox = boxes[startIndex];
        if (delta < 0) {
            const newIndex = clamp(startIndex + delta, 0, boxes.length - 1);
            for (let index = newIndex; index < startIndex; index++) {
                boxes[index].index.setValue(index + 1);
            }
            movingBox.index.setValue(newIndex);
        }
        else if (delta > 1) {
            const newIndex = clamp(startIndex + (delta - 1), 0, boxes.length - 1);
            for (let index = startIndex; index < newIndex; index++) {
                boxes[index + 1].index.setValue(index);
            }
            movingBox.index.setValue(newIndex);
        }
        else {
            console.warn(`moveIndex had no effect: startIndex: ${startIndex}, delta: ${delta}`);
        }
    };
    IndexedBox.isIndexedBox = (box) => "index" in box && box.index instanceof Int32Field;
    IndexedBox.collectIndexedBoxes = (field, type) => field.pointerHub.incoming()
        .map(({ box }) => IndexedBox.isIndexedBox(box) && (type === undefined || box instanceof type)
        ? box
        : panic(`${box} has no index field`))
        .sort((a, b) => a.index.getValue() - b.index.getValue());
})(IndexedBox || (IndexedBox = {}));
