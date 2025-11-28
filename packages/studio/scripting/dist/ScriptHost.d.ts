import { ScriptExecutionContext, ScriptExecutionProtocol } from "./ScriptExecutionProtocol";
import { ScriptHostProtocol } from "./ScriptHostProtocol";
export declare class ScriptHost implements ScriptExecutionProtocol {
    #private;
    constructor(host: ScriptHostProtocol, scriptURL: string);
    executeScript(script: string, context: ScriptExecutionContext): Promise<void>;
}
//# sourceMappingURL=ScriptHost.d.ts.map