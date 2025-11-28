import { assert } from "./lang";
//
// SHA-256
//
export var Hash;
(function (Hash) {
    Hash.fromBuffers = async (...buffers) => {
        const totalLength = buffers.reduce((sum, buf) => sum + buf.byteLength, 0);
        const mergedArray = new Uint8Array(totalLength);
        let offset = 0;
        for (const buffer of buffers) {
            mergedArray.set(new Uint8Array(buffer), offset);
            offset += buffer.byteLength;
        }
        return await crypto.subtle.digest("SHA-256", mergedArray);
    };
    Hash.equals = (a, b) => {
        assert(a.byteLength === 32, "First hash has invalid length");
        assert(b.byteLength === 32, "Second hash has invalid length");
        const viewA = new Uint8Array(a);
        const viewB = new Uint8Array(b);
        for (let i = 0; i < 32; i++) {
            if (viewA[i] !== viewB[i]) {
                return false;
            }
        }
        return true;
    };
    Hash.toString = (buffer) => Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("");
})(Hash || (Hash = {}));
