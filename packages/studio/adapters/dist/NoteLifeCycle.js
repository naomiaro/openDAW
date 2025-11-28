import { NoteSignal } from "./NoteSignal";
export var NoteLifeCycle;
(function (NoteLifeCycle) {
    NoteLifeCycle.start = (send, uuid, pitch, velocity = 1.0) => {
        let playing = true;
        send(NoteSignal.on(uuid, pitch, velocity));
        return {
            terminate: () => {
                if (playing) {
                    send(NoteSignal.off(uuid, pitch));
                    playing = false;
                }
            }
        };
    };
})(NoteLifeCycle || (NoteLifeCycle = {}));
