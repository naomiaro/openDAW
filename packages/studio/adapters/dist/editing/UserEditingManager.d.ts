import { Terminable } from "@opendaw/lib-std";
import { BoxEditing } from "@opendaw/lib-box";
import { UserInterfaceBox } from "@opendaw/studio-boxes";
import { UserEditing } from "./UserEditing";
export declare class UserEditingManager implements Terminable {
    #private;
    constructor(editing: BoxEditing);
    follow(userInterfaceBox: UserInterfaceBox): void;
    get modularSystem(): UserEditing;
    get timeline(): UserEditing;
    get audioUnit(): UserEditing;
    terminate(): void;
}
//# sourceMappingURL=UserEditingManager.d.ts.map