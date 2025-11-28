import { clamp, PI_QUART } from "@opendaw/lib-std";
import { Mixing } from "./mixing";
export var StereoMatrix;
(function (StereoMatrix) {
    StereoMatrix.zero = () => ({ ll: 0.0, lr: 0.0, rl: 0.0, rr: 0.0 });
    StereoMatrix.identity = () => ({ ll: 1.0, lr: 0.0, rl: 0.0, rr: 1.0 });
    StereoMatrix.update = (m, { gain, panning, invertL, invertR, stereo, swap }, mixing = Mixing.EqualPower) => {
        const [panL, panR] = StereoMatrix.panningToGains(panning, mixing);
        let lGain = panL * gain;
        let rGain = panR * gain;
        if (invertL)
            lGain *= -1.0;
        if (invertR)
            rGain *= -1.0;
        const mono = Math.max(0.0, -stereo);
        const expand = Math.max(0.0, stereo);
        const midGain = 1.0 - expand;
        const sideGain = 1.0 + expand;
        const monoAmount = mono * 0.5;
        const stereoWidth = 1.0 - mono;
        const m00 = (midGain + sideGain) * 0.5;
        const m01 = (midGain - sideGain) * 0.5;
        const m10 = (midGain - sideGain) * 0.5;
        const m11 = (midGain + sideGain) * 0.5;
        const ll = (lGain * (monoAmount + stereoWidth)) * m00 + (rGain * monoAmount) * m01;
        const rl = (lGain * (monoAmount + stereoWidth)) * m10 + (rGain * monoAmount) * m11;
        const lr = (lGain * monoAmount) * m00 + (rGain * (monoAmount + stereoWidth)) * m01;
        const rr = (lGain * monoAmount) * m10 + (rGain * (monoAmount + stereoWidth)) * m11;
        if (swap) {
            m.ll = rl;
            m.rl = ll;
            m.lr = rr;
            m.rr = lr;
        }
        else {
            m.ll = ll;
            m.lr = lr;
            m.rl = rl;
            m.rr = rr;
        }
    };
    StereoMatrix.panningToGains = (panning, mixing) => {
        const x = clamp(panning, -1.0, 1.0);
        switch (mixing) {
            case Mixing.Linear:
                return [
                    Math.min(1.0 - x, 1.0),
                    Math.min(x + 1.0, 1.0)
                ];
            case Mixing.EqualPower:
                return [
                    Math.cos((x + 1.0) * PI_QUART),
                    Math.sin((x + 1.0) * PI_QUART)
                ];
        }
    };
    StereoMatrix.applyFrame = (m, l, r) => [m.ll * l + m.rl * r, m.lr * l + m.rr * r];
    StereoMatrix.processFrames = (m, source, target, fromIndex, toIndex) => {
        const [src0, src1] = source;
        const [trg0, trg1] = target;
        for (let i = fromIndex; i < toIndex; i++) {
            const l = src0[i];
            const r = src1[i];
            trg0[i] = m.ll * l + m.rl * r;
            trg1[i] = m.lr * l + m.rr * r;
        }
    };
    StereoMatrix.replaceFrames = (m, [ch0, ch1], fromIndex, toIndex) => {
        for (let i = fromIndex; i < toIndex; i++) {
            const l = ch0[i];
            const r = ch1[i];
            ch0[i] = m.ll * l + m.rl * r;
            ch1[i] = m.lr * l + m.rr * r;
        }
    };
})(StereoMatrix || (StereoMatrix = {}));
