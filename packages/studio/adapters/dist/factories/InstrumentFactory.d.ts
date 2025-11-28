import { BoxGraph, Field } from "@opendaw/lib-box";
import { IconSymbol, Pointers } from "@opendaw/studio-enums";
import { BoxIO } from "@opendaw/studio-boxes";
import { InstrumentBox } from "./InstrumentBox";
import { TrackType } from "../timeline/TrackType";
export interface InstrumentFactory<A = any, INST extends InstrumentBox = InstrumentBox> {
    defaultName: string;
    defaultIcon: IconSymbol;
    description: string;
    trackType: TrackType;
    create: (boxGraph: BoxGraph<BoxIO.TypeMap>, host: Field<Pointers.InstrumentHost | Pointers.AudioOutput>, name: string, icon: IconSymbol, attachment?: A) => INST;
}
//# sourceMappingURL=InstrumentFactory.d.ts.map