import { assert, nextPowOf2 } from "@opendaw/lib-std";
export class Delay {
    #delaySize;
    #delayBuffer;
    #interpolationLength;
    #writePosition = 0 | 0;
    #currentOffset = 0 | 0;
    #pFeedback = 0.7;
    #pWetLevel = 0.75;
    #pDryLevel = 0.75;
    #deltaOffset = 0.0;
    #targetOffset = 0.0;
    #alphaPosition = 0 | 0;
    #processed = false;
    #interpolating = false;
    constructor(maxFrames, interpolationLength) {
        const pow2Size = nextPowOf2(maxFrames);
        this.#delaySize = pow2Size;
        this.#delayBuffer = new Float32Array(pow2Size);
        this.#interpolationLength = interpolationLength;
    }
    reset() {
        this.#writePosition = 0;
        if (this.#processed) {
            this.#delayBuffer.fill(0.0);
            this.#processed = false;
            this.#interpolating = false;
        }
        this.#initDelayTime();
    }
    set offset(value) {
        assert(value >= 0 && value < this.#delaySize, "Out of bounds");
        if (this.#targetOffset === value) {
            return;
        }
        this.#targetOffset = value;
        if (this.#processed) {
            this.#updateDelayTime();
        }
        else {
            this.#initDelayTime();
        }
    }
    get offset() { return this.#targetOffset; }
    set feedback(value) { this.#pFeedback = value; }
    get feedback() { return this.#pFeedback; }
    mix(wet, dry) {
        this.#pWetLevel = wet;
        this.#pDryLevel = dry;
    }
    process(input, output, fromIndex, toIndex) {
        if (this.#interpolating) {
            this.#processInterpolate(input, output, fromIndex, toIndex);
        }
        else {
            this.#processSteady(input, output, fromIndex, toIndex);
        }
        this.#processed = true;
    }
    #processSteady(input, output, fromIndex, toIndex) {
        const delayMask = this.#delaySize - 1;
        const delayBuffer = this.#delayBuffer;
        const feedback = this.#pFeedback;
        const pWetLevel = this.#pWetLevel;
        const pDryLevel = this.#pDryLevel;
        let writePosition = this.#writePosition;
        let readPosition = writePosition - Math.floor(this.#currentOffset);
        if (readPosition < 0) {
            readPosition += this.#delaySize;
        }
        for (let i = fromIndex; i < toIndex; ++i) {
            const inp = input[i];
            const dly = delayBuffer[readPosition];
            delayBuffer[writePosition] = inp + dly * feedback + 1.0e-18 - 1.0e-18;
            output[i] = dly * pWetLevel + inp * pDryLevel;
            readPosition = ++readPosition & delayMask;
            writePosition = ++writePosition & delayMask;
        }
        this.#writePosition = writePosition;
    }
    #processInterpolate(input, output, fromIndex, toIndex) {
        const delayMask = this.#delaySize - 1;
        const delayBuffer = this.#delayBuffer;
        const feedback = this.#pFeedback;
        const pWetLevel = this.#pWetLevel;
        const pDryLevel = this.#pDryLevel;
        let writePosition = this.#writePosition;
        for (let i = fromIndex; i < toIndex; ++i) {
            if (this.#alphaPosition > 0) {
                this.#currentOffset += this.#deltaOffset;
                this.#alphaPosition--;
            }
            else {
                this.#currentOffset = this.#targetOffset;
                this.#interpolating = false;
            }
            let readPosition = writePosition - this.#currentOffset;
            if (readPosition < 0) {
                readPosition += this.#delaySize;
            }
            const readPositionInt = readPosition | 0;
            const alpha = readPosition - readPositionInt;
            const inp = input[i];
            const dl0 = delayBuffer[readPositionInt];
            const dln = delayBuffer[(readPositionInt + 1) & delayMask] - dl0;
            const dly = dl0 + alpha * dln;
            delayBuffer[writePosition] = inp + dly * feedback + 1.0e-18 - 1.0e-18;
            output[i] = dly * pWetLevel + inp * pDryLevel;
            writePosition = ++writePosition & delayMask;
        }
        this.#writePosition = writePosition;
    }
    #initDelayTime() {
        this.#currentOffset = this.#targetOffset;
        this.#alphaPosition = 0;
        this.#interpolating = false;
    }
    #updateDelayTime() {
        if (this.#targetOffset !== this.#currentOffset) {
            this.#alphaPosition = this.#interpolationLength;
            this.#deltaOffset = (this.#targetOffset - this.#currentOffset) / this.#alphaPosition;
            this.#interpolating = true;
        }
    }
}
