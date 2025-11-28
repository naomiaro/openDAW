import { dbToGain } from "@opendaw/lib-dsp";
export var AudioUtils;
(function (AudioUtils) {
    AudioUtils.findLastNonSilentSample = (buffer, thresholdDb = -72.0) => {
        const threshold = dbToGain(thresholdDb);
        const numChannels = buffer.numberOfChannels;
        const length = buffer.length;
        let lastNonSilentSample = 0;
        for (let channel = 0; channel < numChannels; channel++) {
            const channelData = buffer.getChannelData(channel);
            for (let i = length - 1; i >= 0; i--) {
                if (Math.abs(channelData[i]) > threshold) {
                    lastNonSilentSample = Math.max(lastNonSilentSample, i);
                    break;
                }
            }
        }
        return lastNonSilentSample + 1;
    };
})(AudioUtils || (AudioUtils = {}));
