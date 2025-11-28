import { int, Procedure, unitValue } from "./lang";
export declare namespace Progress {
    type Handler = Procedure<unitValue>;
    const Empty: Handler;
    const split: (progress: Handler, count: int) => ReadonlyArray<Handler>;
    const splitWithWeights: (progress: Handler, weights: ReadonlyArray<number>) => ReadonlyArray<Handler>;
}
//# sourceMappingURL=progress.d.ts.map