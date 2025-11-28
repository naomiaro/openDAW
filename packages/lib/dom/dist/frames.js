export var AnimationFrame;
(function (AnimationFrame) {
    const nonrecurring = new Set();
    const recurring = new Set();
    const queue = new Array();
    let id = -1;
    let driver = null;
    AnimationFrame.add = (exec) => {
        recurring.add(exec);
        return { terminate: () => recurring.delete(exec) };
    };
    AnimationFrame.once = (exec) => { nonrecurring.add(exec); };
    AnimationFrame.start = (owner) => {
        if (driver === owner) {
            return;
        }
        driver?.cancelAnimationFrame(id);
        driver = owner;
        id = owner.requestAnimationFrame(exe);
    };
    AnimationFrame.stop = () => {
        driver?.cancelAnimationFrame(id);
        driver = null;
        id = -1;
    };
    AnimationFrame.terminate = () => {
        AnimationFrame.stop();
        queue.length = 0;
        recurring.clear();
        nonrecurring.clear();
    };
    const exe = () => {
        if (recurring.size > 0 || nonrecurring.size > 0) {
            recurring.forEach((exec) => queue.push(exec));
            nonrecurring.forEach((exec) => queue.push(exec));
            nonrecurring.clear();
            queue.forEach((exec) => exec());
            queue.length = 0;
        }
        id = driver?.requestAnimationFrame(exe) ?? -1;
    };
})(AnimationFrame || (AnimationFrame = {}));
export const deferNextFrame = (exec) => new DeferExec(exec);
export class DeferExec {
    #exec;
    #requested = false;
    #disabled = false;
    constructor(exec) { this.#exec = exec; }
    request = () => {
        if (this.#requested || this.#disabled) {
            return;
        }
        this.#requested = true;
        AnimationFrame.once(this.#fire);
    };
    immediate = () => {
        if (this.#disabled) {
            return;
        }
        this.#requested = true;
        this.#fire();
    };
    cancel() { this.#requested = false; }
    terminate() { this.#disabled = true; }
    #fire = () => {
        if (this.#disabled || !this.#requested) {
            return;
        }
        this.#requested = false;
        this.#exec();
    };
}
