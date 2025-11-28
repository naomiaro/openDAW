export var ControlType;
(function (ControlType) {
    ControlType[ControlType["NOTE_ON"] = 144] = "NOTE_ON";
    ControlType[ControlType["NOTE_OFF"] = 128] = "NOTE_OFF";
    ControlType[ControlType["NOTE_AFTER_TOUCH"] = 160] = "NOTE_AFTER_TOUCH";
    ControlType[ControlType["CONTROLLER"] = 176] = "CONTROLLER";
    ControlType[ControlType["PROGRAM_CHANGE"] = 192] = "PROGRAM_CHANGE";
    ControlType[ControlType["CHANNEL_AFTER_TOUCH"] = 208] = "CHANNEL_AFTER_TOUCH";
    ControlType[ControlType["PITCH_BEND"] = 224] = "PITCH_BEND";
})(ControlType || (ControlType = {}));
