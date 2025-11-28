import { isAbsent } from "@opendaw/lib-std";
export var ConstrainDOM;
(function (ConstrainDOM) {
    ConstrainDOM.resolveString = (constrain) => {
        if (isAbsent(constrain)) {
            return undefined;
        }
        if (typeof constrain === "string") {
            return constrain;
        }
        if (Array.isArray(constrain)) {
            return constrain.join(",");
        }
        if (typeof constrain === "object") {
            if (typeof constrain.exact === "string") {
                return constrain.exact;
            }
            if (Array.isArray(constrain.exact)) {
                return constrain.exact.join(",");
            }
            if (typeof constrain.ideal === "string") {
                return constrain.ideal;
            }
            if (Array.isArray(constrain.ideal)) {
                return constrain.ideal.join(",");
            }
        }
        return undefined;
    };
})(ConstrainDOM || (ConstrainDOM = {}));
