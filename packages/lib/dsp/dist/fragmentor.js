export class Fragmentor {
    static *iterate(p0, p1, stepSize) {
        let index = Math.ceil(p0 / stepSize);
        let position = index * stepSize;
        while (position < p1) {
            yield position;
            position = ++index * stepSize;
        }
    }
    static *iterateWithIndex(p0, p1, stepSize) {
        let index = Math.ceil(p0 / stepSize);
        let position = index * stepSize;
        while (position < p1) {
            yield { position, index };
            position = ++index * stepSize;
        }
    }
}
