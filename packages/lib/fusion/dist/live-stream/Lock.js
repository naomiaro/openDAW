export var Lock;
(function (Lock) {
    Lock[Lock["WRITE"] = 0] = "WRITE";
    Lock[Lock["READ"] = 1] = "READ";
})(Lock || (Lock = {}));
