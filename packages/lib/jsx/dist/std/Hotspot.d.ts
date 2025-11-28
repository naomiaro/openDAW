import { Exec, Provider } from "@opendaw/lib-std";
import { DomElement, JsxValue } from "../types";
import { Inject } from "../inject";
export type HotspotUpdater = {
    update: Exec;
};
export type HotSpotProps = {
    render: Provider<JsxValue>;
    ref: Inject.Ref<HotspotUpdater>;
};
export declare const Hotspot: ({ render, ref }: HotSpotProps) => DomElement;
//# sourceMappingURL=Hotspot.d.ts.map