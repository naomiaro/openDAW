import { ProjectImpl } from "./ProjectImpl";
import { ProjectUnpacker } from "../ProjectUnpacker";
export class ApiImpl {
    #protocol;
    constructor(protocol) { this.#protocol = protocol; }
    newProject(name) {
        return new ProjectImpl(this, name ?? `Scripted Project`);
    }
    async getProject() {
        const { buffer, name } = await this.#protocol.fetchProject();
        return ProjectUnpacker.unpack(this, buffer, name);
    }
    openProject(buffer, name) {
        this.#protocol.openProject(buffer, name);
    }
    addSample(data, name) {
        return this.#protocol.addSample(data, name);
    }
}
