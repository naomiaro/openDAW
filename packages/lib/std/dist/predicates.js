export var Predicates;
(function (Predicates) {
    Predicates.alwaysTrue = () => true;
    Predicates.alwaysFalse = () => false;
    Predicates.definedPredicate = (value) => value !== null && value !== undefined;
})(Predicates || (Predicates = {}));
