import { asEnumValue } from "@opendaw/lib-std";
export var TimeBase;
(function (TimeBase) {
    TimeBase["Musical"] = "musical";
    TimeBase["Seconds"] = "seconds";
})(TimeBase || (TimeBase = {}));
export var TimeBaseConverter;
(function (TimeBaseConverter) {
    function musical(tempoMap, position, property) {
        return new TimeBaseMusicalConverter(tempoMap, position, property);
    }
    TimeBaseConverter.musical = musical;
    function aware(tempoMap, timeBase, position, property) {
        return new TimeBaseAwareConverter(tempoMap, timeBase, position, property);
    }
    TimeBaseConverter.aware = aware;
})(TimeBaseConverter || (TimeBaseConverter = {}));
class TimeBaseAwareConverter {
    #tempoMap;
    #timeBase;
    #position;
    #property;
    constructor(tempoMap, timeBase, position, property) {
        this.#property = property;
        this.#timeBase = timeBase;
        this.#position = position;
        this.#tempoMap = tempoMap;
    }
    toPPQN() {
        const value = this.#property.getValue();
        if (this.getTimeBase() === TimeBase.Musical) {
            return value;
        }
        const position = this.#position.getValue();
        const startSeconds = this.#tempoMap.positionToSeconds(position);
        const endSeconds = startSeconds + value;
        return this.#tempoMap.intervalToPPQN(startSeconds, endSeconds);
    }
    fromPPQN(ppqn) {
        if (this.getTimeBase() === TimeBase.Musical) {
            this.#property.setValue(ppqn);
        }
        else {
            const position = this.#position.getValue();
            const seconds = this.#tempoMap.intervalToSeconds(position, position + ppqn);
            this.#property.setValue(seconds);
        }
    }
    toSeconds() {
        const value = this.#property.getValue();
        if (this.getTimeBase() === TimeBase.Seconds) {
            return value;
        }
        const position = this.#position.getValue();
        return this.#tempoMap.intervalToSeconds(position, position + value);
    }
    toSamples(sampleRate) { return this.toSeconds() * sampleRate; }
    rawValue() { return this.#property.getValue(); }
    getTimeBase() { return asEnumValue(this.#timeBase.getValue(), TimeBase); }
}
class TimeBaseMusicalConverter {
    #tempoMap;
    #position;
    #property;
    constructor(tempoMap, position, property) {
        this.#property = property;
        this.#position = position;
        this.#tempoMap = tempoMap;
    }
    toPPQN() { return this.#property.getValue(); }
    fromPPQN(ppqn) { this.#property.setValue(ppqn); }
    toSeconds() {
        const value = this.#property.getValue();
        const position = this.#position.getValue();
        return this.#tempoMap.intervalToSeconds(position, position + value);
    }
    toSamples(sampleRate) { return this.toSeconds() * sampleRate; }
    rawValue() { return this.#property.getValue(); }
    getTimeBase() { return TimeBase.Musical; }
}
