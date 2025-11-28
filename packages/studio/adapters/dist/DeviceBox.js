import { Pointers } from "@opendaw/studio-enums";
import { BooleanField, Int32Field, PointerField, StringField } from "@opendaw/lib-box";
import { isDefined, isInstanceOf, panic } from "@opendaw/lib-std";
export var DeviceBoxUtils;
(function (DeviceBoxUtils) {
    DeviceBoxUtils.isDeviceBox = (box) => "host" in box && isInstanceOf(box.host, PointerField) &&
        "label" in box && isInstanceOf(box.label, StringField) &&
        "enabled" in box && isInstanceOf(box.enabled, BooleanField) &&
        "minimized" in box && isInstanceOf(box.minimized, BooleanField);
    DeviceBoxUtils.isInstrumentDeviceBox = (box) => DeviceBoxUtils.isDeviceBox(box) && box.host.pointerType === Pointers.InstrumentHost;
    DeviceBoxUtils.isEffectDeviceBox = (box) => DeviceBoxUtils.isDeviceBox(box) && "index" in box && isInstanceOf(box.index, Int32Field) &&
        (box.host.pointerType === Pointers.MidiEffectHost || box.host.pointerType === Pointers.AudioEffectHost);
    DeviceBoxUtils.lookupHostField = (box) => isDefined(box) && "host" in box && isInstanceOf(box.host, PointerField)
        ? box.host : panic(`Could not find 'host' field in '${box?.name}'`);
    DeviceBoxUtils.lookupLabelField = (box) => isDefined(box) && "label" in box && isInstanceOf(box.label, StringField)
        ? box.label : panic(`Could not find 'label' field in '${box?.name}'`);
    DeviceBoxUtils.lookupEnabledField = (box) => isDefined(box) && "enabled" in box && isInstanceOf(box.enabled, BooleanField)
        ? box.enabled : panic(`Could not find 'enabled' field in '${box?.name}'`);
    DeviceBoxUtils.lookupMinimizedField = (box) => isDefined(box) && "minimized" in box && isInstanceOf(box.minimized, BooleanField)
        ? box.minimized : panic(`Could not find 'minimized' field in '${box?.name}'`);
    DeviceBoxUtils.lookupIndexField = (box) => isDefined(box) && "index" in box && isInstanceOf(box.index, Int32Field)
        ? box.index : panic(`Could not find 'index' field in '${box?.name}'`);
})(DeviceBoxUtils || (DeviceBoxUtils = {}));
