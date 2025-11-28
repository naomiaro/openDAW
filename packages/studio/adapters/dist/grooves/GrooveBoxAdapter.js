export var GrooveAdapter;
(function (GrooveAdapter) {
    GrooveAdapter.checkType = (adapter) => adapter !== null && typeof adapter === "object" && "type" in adapter && adapter.type === "groove-adapter";
})(GrooveAdapter || (GrooveAdapter = {}));
