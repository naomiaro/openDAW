export var RegionModifyStrategies;
(function (RegionModifyStrategies) {
    RegionModifyStrategies.Identity = Object.freeze({
        showOrigin: () => false,
        selectedModifyStrategy: () => RegionModifyStrategy.Identity,
        unselectedModifyStrategy: () => RegionModifyStrategy.Identity
    });
    RegionModifyStrategies.IdentityIncludeOrigin = Object.freeze({
        showOrigin: () => true,
        selectedModifyStrategy: () => RegionModifyStrategy.Identity,
        unselectedModifyStrategy: () => RegionModifyStrategy.Identity
    });
})(RegionModifyStrategies || (RegionModifyStrategies = {}));
export var RegionModifyStrategy;
(function (RegionModifyStrategy) {
    RegionModifyStrategy.Identity = Object.freeze({
        readPosition: (region) => region.position,
        readComplete: (region) => region.complete,
        readLoopOffset: (region) => region.loopOffset,
        readLoopDuration: (region) => region.loopDuration,
        readMirror: (region) => region.isMirrowed,
        translateTrackIndex: (value) => value,
        iterateRange: (regions, from, to) => regions.iterateRange(from, to)
    });
})(RegionModifyStrategy || (RegionModifyStrategy = {}));
