// Level Detector (Ballistics)
import { CrestFactor } from "./CrestFactor";
import { SmoothingFilter } from "./SmoothingFilter";
export class LevelDetector {
    #sampleRate;
    #crestFactor;
    #attackSmoothingFilter;
    #releaseSmoothingFilter;
    #attackTimeInSeconds = 0.01;
    #alphaAttack = 0.0;
    #releaseTimeInSeconds = 0.14;
    #alphaRelease = 0.0;
    #state01 = 0.0;
    #state02 = 0.0;
    #autoAttack = false;
    #autoRelease = false;
    constructor(sampleRate) {
        this.#sampleRate = sampleRate;
        this.#crestFactor = new CrestFactor(sampleRate);
        this.#attackSmoothingFilter = new SmoothingFilter(sampleRate);
        this.#releaseSmoothingFilter = new SmoothingFilter(sampleRate);
        this.#alphaAttack = Math.exp(-1.0 / (sampleRate * this.#attackTimeInSeconds));
        this.#alphaRelease = Math.exp(-1.0 / (sampleRate * this.#releaseTimeInSeconds));
        this.#state01 = 0.0;
        this.#state02 = 0.0;
    }
    setAttack(attack) {
        if (attack !== this.#attackTimeInSeconds) {
            this.#attackTimeInSeconds = attack;
            this.#alphaAttack = Math.exp(-1.0 / (this.#sampleRate * this.#attackTimeInSeconds));
        }
    }
    setRelease(release) {
        if (release !== this.#releaseTimeInSeconds) {
            this.#releaseTimeInSeconds = release;
            this.#alphaRelease = Math.exp(-1.0 / (this.#sampleRate * this.#releaseTimeInSeconds));
        }
    }
    setAutoAttack(isEnabled) {
        this.#autoAttack = isEnabled;
    }
    setAutoRelease(isEnabled) {
        this.#autoRelease = isEnabled;
    }
    #processPeakBranched(input) {
        // Smooth branched peak detector
        if (input < this.#state01) {
            this.#state01 = this.#alphaAttack * this.#state01 + (1 - this.#alphaAttack) * input;
        }
        else {
            this.#state01 = this.#alphaRelease * this.#state01 + (1 - this.#alphaRelease) * input;
        }
        return this.#state01;
    }
    applyBallistics(src, fromIndex, toIndex) {
        // Apply ballistics to src buffer
        for (let i = fromIndex; i < toIndex; ++i) {
            src[i] = this.#processPeakBranched(src[i]);
        }
    }
    processCrestFactor(src, fromIndex, toIndex) {
        if (this.#autoAttack || this.#autoRelease) {
            // Crest factor calculation
            this.#crestFactor.process(src, fromIndex, toIndex);
            this.#attackSmoothingFilter.process(this.#crestFactor.getAvgAttack());
            this.#releaseSmoothingFilter.process(this.#crestFactor.getAvgRelease());
            if (this.#autoAttack)
                this.setAttack(this.#attackSmoothingFilter.getState());
            if (this.#autoRelease)
                this.setRelease(this.#releaseSmoothingFilter.getState());
        }
    }
}
