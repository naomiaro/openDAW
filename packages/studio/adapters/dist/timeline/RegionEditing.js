import { mod, panic } from "@opendaw/lib-std";
import { UnionAdapterTypes } from "../UnionAdapterTypes";
export var RegionEditing;
(function (RegionEditing) {
    RegionEditing.cut = (region, cut, consolidate) => {
        if (region.position >= cut || cut >= region.complete) {
            return;
        }
        if (UnionAdapterTypes.isLoopableRegion(region)) {
            const { position, complete, loopOffset, loopDuration } = region;
            region.box.duration.setValue(cut - position);
            region.copyTo({
                position: cut,
                duration: complete - cut,
                loopOffset: mod(loopOffset + (cut - position), loopDuration),
                consolidate
            });
        }
        else {
            return panic("Not yet implemented");
        }
    };
    RegionEditing.clip = (region, begin, end) => {
        if (UnionAdapterTypes.isLoopableRegion(region)) {
            const { position, complete, loopOffset, loopDuration } = region;
            if (complete - end <= 0) {
                return panic(`duration will zero or negative(${complete - end})`);
            }
            region.box.duration.setValue(begin - position);
            region.copyTo({
                position: end,
                duration: complete - end,
                loopOffset: mod(loopOffset + (end - position), loopDuration)
            });
        }
        else {
            return panic("Not yet implemented");
        }
    };
})(RegionEditing || (RegionEditing = {}));
