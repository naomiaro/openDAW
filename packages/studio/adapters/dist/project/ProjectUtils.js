import { Arrays, asInstanceOf, assert, ByteArrayInput, isInstanceOf, Predicates, SetMultimap, UUID } from "@opendaw/lib-std";
import { AudioFileBox, AudioUnitBox, AuxSendBox, SelectionBox, SoundfontFileBox, TrackBox } from "@opendaw/studio-boxes";
import { IndexedBox, PointerField } from "@opendaw/lib-box";
import { UnionBoxTypes } from "../unions";
import { AudioUnitOrdering } from "../factories/AudioUnitOrdering";
export var ProjectUtils;
(function (ProjectUtils) {
    const isSameGraph = ({ graph: a }, { graph: b }) => a === b;
    const compareIndex = (a, b) => a.index.getValue() - b.index.getValue();
    const excludeTimelinePredicate = (box) => box.accept({
        visitTrackBox: (_box) => true
    }) === true;
    ProjectUtils.extractAudioUnits = (audioUnitBoxes, { boxGraph, mandatoryBoxes: { primaryAudioBus, rootBox } }, options = {}) => {
        assert(Arrays.satisfy(audioUnitBoxes, isSameGraph), "AudioUnits must share the same BoxGraph");
        // TODO Implement include options.
        assert(!options.includeAux && !options.includeBus, "Options are not yet implemented");
        const excludeBox = options?.excludeTimeline === true ? excludeTimelinePredicate : Predicates.alwaysFalse;
        const dependencies = audioUnitBoxes
            .flatMap(box => Array.from(box.graph.dependenciesOf(box, { alwaysFollowMandatory: true, excludeBox }).boxes))
            .filter(box => box.name !== SelectionBox.ClassName && box.name !== AuxSendBox.ClassName);
        const uuidMap = generateTransferMap(audioUnitBoxes, dependencies, rootBox.audioUnits.address.uuid, primaryAudioBus.address.uuid);
        copy(uuidMap, boxGraph, audioUnitBoxes, dependencies);
        reorderAudioUnits(uuidMap, audioUnitBoxes, rootBox);
        console.debug("inTransaction", boxGraph.inTransaction());
        return audioUnitBoxes.map(source => asInstanceOf(rootBox.graph
            .findBox(uuidMap.get(source.address.uuid).target)
            .unwrap("Target Track has not been copied"), AudioUnitBox));
    };
    ProjectUtils.extractRegions = (regionBoxes, { boxGraph, mandatoryBoxes: { primaryAudioBus, rootBox } }, insertPosition = 0.0) => {
        assert(Arrays.satisfy(regionBoxes, isSameGraph), "Region smust be from the same BoxGraph");
        const regionBoxSet = new Set(regionBoxes);
        const trackBoxSet = new Set();
        const audioUnitBoxSet = new SetMultimap();
        // Collect AudioUnits and Tracks
        regionBoxes.forEach(regionBox => {
            const trackBox = asInstanceOf(regionBox.regions.targetVertex.unwrap().box, TrackBox);
            trackBoxSet.add(trackBox);
            const audioUnitBox = asInstanceOf(trackBox.tracks.targetVertex.unwrap().box, AudioUnitBox);
            audioUnitBoxSet.add(audioUnitBox, trackBox);
        });
        console.debug(`Found ${audioUnitBoxSet.keyCount()} audioUnits`);
        console.debug(`Found ${trackBoxSet.size} tracks`);
        const audioUnitBoxes = [...audioUnitBoxSet.keys()];
        const excludeBox = box => (isInstanceOf(box, TrackBox) && !trackBoxSet.has(box))
            || (UnionBoxTypes.isRegionBox(box) && !regionBoxSet.has(box));
        const dependencies = audioUnitBoxes
            .flatMap(box => Array.from(box.graph.dependenciesOf(box, { excludeBox, alwaysFollowMandatory: true }).boxes))
            .filter(box => box.name !== SelectionBox.ClassName && box.name !== AuxSendBox.ClassName);
        const uuidMap = generateTransferMap(audioUnitBoxes, dependencies, rootBox.audioUnits.address.uuid, primaryAudioBus.address.uuid);
        copy(uuidMap, boxGraph, audioUnitBoxes, dependencies);
        reorderAudioUnits(uuidMap, audioUnitBoxes, rootBox);
        // reorder track indices
        audioUnitBoxSet.forEach((_, trackBoxes) => [...trackBoxes]
            .sort(compareIndex)
            .forEach((source, index) => {
            const box = boxGraph
                .findBox(uuidMap.get(source.address.uuid).target)
                .unwrap("Target Track has not been copied");
            asInstanceOf(box, TrackBox).index.setValue(index);
        }));
        // move new regions to the target position
        const minPosition = regionBoxes.reduce((min, region) => Math.min(min, region.position.getValue()), Number.MAX_VALUE);
        const delta = insertPosition - minPosition;
        regionBoxes.forEach((source) => {
            const box = boxGraph
                .findBox(uuidMap.get(source.address.uuid).target)
                .unwrap("Target Track has not been copied");
            const position = UnionBoxTypes.asRegionBox(box).position;
            position.setValue(position.getValue() + delta);
        });
    };
    const generateTransferMap = (audioUnitBoxes, dependencies, rootBoxUUID, masterBusBoxUUID) => {
        const uuidMap = UUID.newSet(({ source }) => source);
        uuidMap.addMany([
            ...audioUnitBoxes
                .filter(({ output: { targetAddress } }) => targetAddress.nonEmpty())
                .map(box => ({
                source: box.output.targetAddress.unwrap().uuid,
                target: masterBusBoxUUID
            })),
            ...audioUnitBoxes
                .map(box => ({
                source: box.collection.targetAddress.unwrap("AudioUnitBox was not connected to a RootBox").uuid,
                target: rootBoxUUID
            })),
            ...audioUnitBoxes
                .map(box => ({
                source: box.address.uuid,
                target: UUID.generate()
            })),
            ...dependencies
                .map(({ address: { uuid }, name }) => ({
                source: uuid,
                target: name === AudioFileBox.ClassName || name === SoundfontFileBox.ClassName
                    ? uuid
                    : UUID.generate()
            }))
        ]);
        return uuidMap;
    };
    const copy = (uuidMap, boxGraph, audioUnitBoxes, dependencies) => {
        PointerField.decodeWith({
            map: (_pointer, newAddress) => newAddress.map(address => uuidMap.opt(address.uuid).match({
                none: () => address,
                some: ({ target }) => address.moveTo(target)
            }))
        }, () => {
            audioUnitBoxes
                .forEach((source) => {
                const input = new ByteArrayInput(source.toArrayBuffer());
                const key = source.name;
                const uuid = uuidMap.get(source.address.uuid).target;
                boxGraph.createBox(key, uuid, box => box.read(input));
            });
            dependencies
                .forEach((source) => {
                const input = new ByteArrayInput(source.toArrayBuffer());
                const key = source.name;
                const uuid = uuidMap.get(source.address.uuid).target;
                if (source instanceof AudioFileBox || source instanceof SoundfontFileBox) {
                    // Those boxes keep their UUID. So if they are already in the graph, we can just read them.
                    if (boxGraph.findBox(source.address.uuid).nonEmpty()) {
                        source.read(input);
                        return;
                    }
                }
                boxGraph.createBox(key, uuid, box => box.read(input));
            });
        });
    };
    const reorderAudioUnits = (uuidMap, audioUnitBoxes, rootBox) => audioUnitBoxes
        .toSorted(compareIndex)
        .map(source => (asInstanceOf(rootBox.graph
        .findBox(uuidMap.get(source.address.uuid).target)
        .unwrap("Target Track has not been copied"), AudioUnitBox)))
        .forEach((target) => IndexedBox.collectIndexedBoxes(rootBox.audioUnits, AudioUnitBox).toSorted((a, b) => {
        const orderA = AudioUnitOrdering[a.type.getValue()];
        const orderB = AudioUnitOrdering[b.type.getValue()];
        const orderDifference = orderA - orderB;
        return orderDifference === 0 ? b === target ? -1 : 1 : orderDifference;
    }).forEach((box, index) => box.index.setValue(index)));
})(ProjectUtils || (ProjectUtils = {}));
