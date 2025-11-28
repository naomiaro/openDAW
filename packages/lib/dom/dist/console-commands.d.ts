import { AnyFunc, ObservableValue, Procedure, Provider } from "@opendaw/lib-std";
export type DotPath = string;
export declare namespace ConsoleCommands {
    const exportMethod: (path: DotPath, callback: AnyFunc) => void;
    const exportBoolean: (path: DotPath, init?: boolean) => ObservableValue<boolean>;
    const exportAccessor: (path: DotPath, getter: Provider<unknown>, setter?: Procedure<any>) => void;
}
//# sourceMappingURL=console-commands.d.ts.map