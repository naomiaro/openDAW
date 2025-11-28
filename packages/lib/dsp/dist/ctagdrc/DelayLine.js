// Delay Line for lookahead
export class DelayLine {
    #delayBuffer = [];
    #delayBufferSize;
    #delayInSamples;
    #numChannels;
    #writePosition = 0;
    constructor(sampleRate, delayInSeconds, maxBlockSize, numChannels) {
        this.#numChannels = numChannels;
        this.#delayInSamples = Math.floor(sampleRate * delayInSeconds);
        this.#delayBufferSize = maxBlockSize + this.#delayInSamples;
        for (let ch = 0; ch < numChannels; ch++) {
            this.#delayBuffer[ch] = new Float32Array(this.#delayBufferSize);
        }
        this.#writePosition = 0;
    }
    process(buffer, fromIndex, toIndex) {
        if (this.#delayInSamples === 0) {
            return;
        }
        let readPosition = (this.#writePosition - this.#delayInSamples + this.#delayBufferSize) % this.#delayBufferSize;
        for (let ch = 0; ch < this.#numChannels; ch++) {
            const channelData = buffer.getChannel(ch);
            let writePos = this.#writePosition;
            let readPos = readPosition;
            for (let i = fromIndex; i < toIndex; i++) {
                const delayedSample = this.#delayBuffer[ch][readPos];
                this.#delayBuffer[ch][writePos] = channelData[i];
                channelData[i] = delayedSample;
                writePos = (writePos + 1) % this.#delayBufferSize;
                readPos = (readPos + 1) % this.#delayBufferSize;
            }
        }
        this.#writePosition = (this.#writePosition + (toIndex - fromIndex)) % this.#delayBufferSize;
    }
}
