import { AudioRegionBox } from "@opendaw/studio-boxes";
import { Arrays, Attempts, clamp } from "@opendaw/lib-std";
import { UnionBoxTypes } from "./unions";
import { TimeBase } from "@opendaw/lib-dsp";
export var Validator;
(function (Validator) {
    Validator.isTimeSignatureValid = (numerator, denominator) => {
        if (!Number.isInteger(numerator) || numerator < 1 || numerator > 31) {
            return Attempts.err("Numerator needs to be a interger between 1 and 31");
        }
        if (!Number.isInteger(denominator) || denominator < 1 || denominator > 32 || (denominator & (denominator - 1)) !== 0) {
            return Attempts.err("Denominator must be a power of two between 1 and 32");
        }
        return Attempts.ok([numerator, denominator]);
    };
    Validator.MIN_BPM = 30.0;
    Validator.MAX_BPM = 1000.0;
    Validator.clampBpm = (bpm) => Number.isFinite(bpm) ? clamp(bpm, Validator.MIN_BPM, Validator.MAX_BPM) : 120.0;
    Validator.hasOverlappingRegions = (boxGraph) => boxGraph.boxes()
        .some(box => box.accept({
        visitTrackBox: (box) => {
            for (const [current, next] of Arrays.iterateAdjacent(box.regions.pointerHub.incoming()
                .map(({ box }) => UnionBoxTypes.asRegionBox(box))
                .sort(({ position: a }, { position: b }) => a.getValue() - b.getValue()))) {
                if (current instanceof AudioRegionBox && current.timeBase.getValue() === TimeBase.Seconds) {
                    return false;
                }
                if (current.position.getValue() + current.duration.getValue() > next.position.getValue()) {
                    return true;
                }
            }
            return false;
        }
    }) ?? false);
})(Validator || (Validator = {}));
