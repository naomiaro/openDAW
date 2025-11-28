import { ScriptHostProtocol } from "./ScriptHostProtocol";
import { ScriptExecutionContext } from "./ScriptExecutionProtocol";
export declare class ScriptRunner {
    #private;
    constructor(protocol: ScriptHostProtocol);
    run(jsCode: string, context: ScriptExecutionContext): Promise<void>;
}
//# sourceMappingURL=ScriptRunner.d.ts.map