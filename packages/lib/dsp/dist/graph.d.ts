export type Edge<V> = [V, V];
export declare class Graph<V> {
    #private;
    constructor();
    addVertex(vertex: V): void;
    removeVertex(vertex: V): void;
    getPredecessors(vertex: V): ReadonlyArray<V>;
    predecessors(): Map<V, V[]>;
    vertices(): ReadonlyArray<V>;
    addEdge([source, target]: Edge<V>): void;
    removeEdge([source, target]: Edge<V>): void;
    isEmpty(): boolean;
}
export declare class TopologicalSort<V> {
    #private;
    constructor(graph: Graph<V>);
    update(): void;
    sorted(): ReadonlyArray<V>;
    hasLoops(): boolean;
}
//# sourceMappingURL=graph.d.ts.map