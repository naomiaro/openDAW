import { Maybe, Provider } from "./lang";
import { Option } from "./option";
export interface Editing {
    modify<R>(modifier: Provider<Maybe<R>>, mark?: boolean): Option<R>;
    mark(): void;
}
export declare namespace Editing {
    const Transient: Editing;
}
//# sourceMappingURL=editing.d.ts.map