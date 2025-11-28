export var Generators;
(function (Generators) {
    function* empty() { return; }
    Generators.empty = empty;
    Generators.next = (generator) => {
        const { value, done } = generator.next();
        return done ? null : value;
    };
    function* flatten(...generators) {
        for (const generator of generators) {
            for (const value of generator) {
                yield value;
            }
        }
    }
    Generators.flatten = flatten;
})(Generators || (Generators = {}));
