import {Predicate} from "@naomiarotest/lib-std"
import {Box, Vertex} from "@naomiarotest/lib-box"
import {SelectableVertex} from "./SelectableVertex"

export const isVertexOfBox = (predicate: Predicate<Box>): Predicate<SelectableVertex> => (vertex: Vertex) => predicate(vertex.box)