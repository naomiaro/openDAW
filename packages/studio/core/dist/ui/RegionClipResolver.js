import { asDefined, assert, mod, panic } from "@opendaw/lib-std";
import { EventCollection, TimeBase } from "@opendaw/lib-dsp";
import { AudioRegionBoxAdapter, RegionEditing, TrackType, UnionAdapterTypes } from "@opendaw/studio-adapters";
import { RegionModifyStrategies } from "./RegionModifyStrategies";
// AudioRegions in absolute time-domain are allowed to overlap. Their duration changes when the tempo changes,
// but we do not truncate them to keep the original durations.
const allowOverlap = (region) => region instanceof AudioRegionBoxAdapter && region.timeBase !== TimeBase.Musical;
export class RegionClipResolver {
    static fromSelection(tracks, adapters, strategy, deltaIndex = 0) {
        const clipResolvers = new Map(tracks.map(track => ([track.listIndex, new RegionClipResolver(strategy, track)])));
        adapters.forEach(adapter => {
            const index = adapter.trackBoxAdapter.unwrap().listIndex + deltaIndex;
            asDefined(clipResolvers.get(index), `Cannot find clip resolver for index(${index})`)
                .addMask(adapter);
        });
        const tasks = Array.from(clipResolvers.values()).flatMap(resolver => resolver.#createSolver());
        return () => tasks.forEach(task => task());
    }
    static fromRange(track, position, complete) {
        // IdentityIncludeOrigin will include selected regions
        const clipResolver = new RegionClipResolver(RegionModifyStrategies.IdentityIncludeOrigin, track);
        clipResolver.addMaskRange(position, complete);
        return clipResolver.#createSolver();
    }
    static validateTracks(tracks) {
        for (const track of tracks) {
            this.validateTrack(track);
        }
    }
    static validateTrack(track) {
        const array = track.regions.collection.asArray();
        if (array.length === 0) {
            return;
        }
        try {
            let prev = array[0];
            assert(prev.duration > 0, `duration(${prev.duration}) must be positive`);
            for (let i = 1; i < array.length; i++) {
                const next = array[i];
                assert(next.duration > 0, `duration(${next.duration}) must be positive`);
                if (!allowOverlap(prev) && prev.complete > next.position) {
                    return panic("Overlapping detected after clipping");
                }
                prev = next;
            }
        }
        catch (error) {
            console.error(JSON.stringify({
                track: TrackType[track.type],
                regions: array.map(x => ({ p: x.position, d: x.duration }))
            }));
            throw error;
        }
    }
    static sortAndJoinMasks(masks) {
        if (masks.length === 0) {
            return panic("No clip-masks to solve");
        }
        if (masks.length === 1) {
            return [masks[0]];
        }
        // Sort by position (start time) - create a copy to avoid mutating input
        const sorted = [...masks].sort(EventCollection.DefaultComparator);
        const merged = [];
        let current = sorted[0];
        for (let i = 1; i < sorted.length; i++) {
            const next = sorted[i];
            // Check if the next mask overlaps or is adjacent to the current
            if (next.position <= current.complete) {
                // Merge: extend current to cover both ranges
                current = {
                    type: "range",
                    position: current.position,
                    complete: Math.max(current.complete, next.complete)
                };
            }
            else {
                // No overlap or adjacency: save current and move to next
                merged.push(current);
                current = next;
            }
        }
        merged.push(current);
        return merged;
    }
    #strategy;
    #ground;
    #masks;
    constructor(strategy, ground) {
        this.#strategy = strategy;
        this.#ground = ground;
        this.#masks = [];
    }
    addMask(region) {
        const strategy = this.#strategy.selectedModifyStrategy();
        this.addMaskRange(strategy.readPosition(region), strategy.readComplete(region));
    }
    addMaskRange(position, complete) {
        this.#masks.push({ type: "range", position, complete });
    }
    #createSolver() {
        const tasks = this.#createTasksFromMasks(RegionClipResolver.sortAndJoinMasks(this.#masks));
        this.#masks.length = 0;
        return () => this.#executeTasks(tasks);
    }
    #createTasksFromMasks(masks) {
        const tasks = [];
        masks.forEach(({ position, complete }) => {
            for (const region of this.#ground.regions.collection.iterateRange(position, complete)) {
                if (region.isSelected && !this.#strategy.showOrigin()) {
                    continue;
                }
                else if (region.duration <= 0) {
                    return panic(`Invalid duration(${region.duration})`);
                }
                else if (region.complete <= position || region.position >= complete) {
                    return panic("Not overlapping");
                }
                const positionIn = region.position >= position;
                const completeIn = region.complete <= complete;
                if (positionIn && completeIn) {
                    tasks.push({ type: "delete", region });
                }
                else if (!positionIn && !completeIn) {
                    tasks.push({ type: "separate", region, begin: position, end: complete });
                }
                else if (completeIn) {
                    tasks.push({ type: "complete", region, position });
                }
                else {
                    tasks.push({ type: "start", region, position: complete });
                }
            }
        });
        return tasks;
    }
    #executeTasks(tasks) {
        tasks
            .toSorted(({ type: a }, { type: b }) => {
            if (a === "delete" && b !== "delete") {
                return 1;
            }
            if (b === "delete" && a !== "delete") {
                return -1;
            }
            return 0;
        })
            .forEach(task => {
            const { type, region } = task;
            switch (type) {
                case "delete":
                    region.box.delete();
                    break;
                case "start":
                    if (UnionAdapterTypes.isLoopableRegion(region)) {
                        const delta = task.position - region.position;
                        region.box.position.setValue(region.position + delta);
                        region.box.duration.setValue(region.duration - delta);
                        region.box.loopOffset.setValue(mod(region.loopOffset + delta, region.loopDuration));
                    }
                    else {
                        return panic("Not yet implemented");
                    }
                    break;
                case "complete":
                    if (UnionAdapterTypes.isLoopableRegion(region)) {
                        region.box.duration.setValue(task.position - task.region.position);
                    }
                    else {
                        return panic("Not yet implemented");
                    }
                    break;
                case "separate":
                    RegionEditing.clip(region, task.begin, task.end);
                    break;
            }
        });
    }
}
