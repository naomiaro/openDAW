import { Validator } from "./Validator";
export var Parsing;
(function (Parsing) {
    Parsing.parseTimeSignature = (input) => {
        const [first, second] = input.split("/");
        const numerator = parseInt(first, 10);
        const denominator = parseInt(second, 10);
        return Validator.isTimeSignatureValid(numerator, denominator);
    };
})(Parsing || (Parsing = {}));
