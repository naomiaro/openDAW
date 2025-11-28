import { PPQN } from "./ppqn";
export var Fraction;
(function (Fraction) {
    Fraction.builder = () => new Builder();
    Fraction.toDouble = ([n, d]) => n / d;
    Fraction.toPPQN = ([n, d]) => PPQN.fromSignature(n, d);
    class Builder {
        #list = [];
        add(fraction) {
            this.#list.push(fraction);
            return this;
        }
        asArray() { return this.#list; }
        asAscendingArray() { return this.#list.toSorted((a, b) => Fraction.toDouble(a) - Fraction.toDouble(b)); }
        asDescendingArray() { return this.#list.toSorted((a, b) => Fraction.toDouble(b) - Fraction.toDouble(a)); }
    }
})(Fraction || (Fraction = {}));
