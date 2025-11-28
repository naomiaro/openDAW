import { Arrays, asDefined, assert } from "@opendaw/lib-std";
export class Graph {
    #vertices;
    #predecessors;
    constructor() {
        this.#vertices = [];
        this.#predecessors = new Map();
    }
    addVertex(vertex) {
        assert(!this.#vertices.includes(vertex), "Vertex already exists");
        this.#vertices.push(vertex);
        assert(!this.#predecessors.has(vertex), "Predecessor already exists");
        this.#predecessors.set(vertex, []);
    }
    removeVertex(vertex) {
        Arrays.remove(this.#vertices, vertex);
        const found = this.#predecessors.delete(vertex);
        assert(found, "Predecessor does not exists");
    }
    getPredecessors(vertex) { return this.#predecessors.get(vertex) ?? Arrays.empty(); }
    predecessors() { return this.#predecessors; }
    vertices() { return this.#vertices; }
    addEdge([source, target]) {
        const vertexPredecessors = asDefined(this.#predecessors.get(target), `[add] Edge has unannounced vertex. (${target})`);
        assert(!vertexPredecessors.includes(source), `${source} is already marked.`);
        vertexPredecessors.push(source);
    }
    removeEdge([source, target]) {
        const vertexPredecessors = asDefined(this.#predecessors.get(target), `[remove] Edge has unannounced vertex. (${target})`);
        assert(vertexPredecessors.includes(source), `${source} is not marked.`);
        Arrays.remove(vertexPredecessors, source);
    }
    isEmpty() { return this.#vertices.length === 0; }
}
export class TopologicalSort {
    #graph;
    #sorted;
    #visited;
    #withLoops;
    #successors;
    constructor(graph) {
        this.#graph = graph;
        this.#sorted = [];
        this.#visited = new Set();
        this.#withLoops = new Set();
        this.#successors = new Map();
    }
    update() {
        this.#prepare();
        this.#graph.vertices().forEach(vertex => this.#visit(vertex));
    }
    sorted() { return this.#sorted; }
    hasLoops() { return this.#withLoops.size !== 0; }
    #prepare() {
        this.#clear();
        const addTo = new Map();
        for (const vert of this.#graph.vertices()) {
            this.#successors.set(vert, new Set());
            addTo.set(vert, new Set());
        }
        for (const vert2 of this.#graph.vertices()) {
            for (const vert1 of this.#graph.getPredecessors(vert2)) {
                asDefined(this.#successors.get(vert1), `Could not find Successor for ${vert1}`).add(vert2);
            }
        }
        let change;
        do {
            change = false;
            for (const vert of this.#graph.vertices()) {
                asDefined(addTo.get(vert)).clear();
                for (const vert1 of asDefined(this.#successors.get(vert))) {
                    for (const vert2 of asDefined(this.#successors.get(vert1))) {
                        if (!this.#successors.get(vert)?.has(vert2)) {
                            change = true;
                            asDefined(addTo.get(vert)).add(vert2);
                        }
                    }
                }
            }
            for (const vert of this.#graph.vertices()) {
                const vs = asDefined(this.#successors.get(vert));
                asDefined(addTo.get(vert)).forEach(n1 => vs.add(n1));
            }
        } while (change);
    }
    #visit(vert) {
        if (this.#visited.has(vert)) {
            return;
        }
        this.#visited.add(vert);
        for (const n1 of this.#graph.getPredecessors(vert)) {
            if (asDefined(this.#successors.get(vert)).has(n1)) {
                this.#withLoops.add(vert);
                this.#withLoops.add(n1);
                continue;
            }
            this.#visit(n1);
        }
        this.#sorted.push(vert);
    }
    #clear() {
        Arrays.clear(this.#sorted);
        this.#visited.clear();
        this.#withLoops.clear();
        this.#successors.clear();
    }
}
