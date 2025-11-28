import { byte, int } from "@opendaw/lib-std";
export declare namespace MidiKeys {
    const BlackKeyIndices: number[];
    const BlackKeyBits: number;
    const Names: {
        English: string[];
        German: string[];
        Solfege: string[];
        French: string[];
        Spanish: string[];
        Japanese: string[];
    };
    const isBlackKey: (note: int) => boolean;
    const toFullString: (note: int) => string;
    const keyboardTracking: (note: byte, amount: number) => number;
    interface Scale {
        get bits(): int;
        has(key: int): boolean;
        equals(other: Scale): boolean;
    }
    interface PredefinedScale extends Scale {
        readonly name: string;
    }
    const StockScales: ReadonlyArray<PredefinedScale>;
}
//# sourceMappingURL=midi-keys.d.ts.map