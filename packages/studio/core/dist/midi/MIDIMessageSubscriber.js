import { isDefined, isInstanceOf } from "@opendaw/lib-std";
import { Events } from "@opendaw/lib-dom";
import { MidiData } from "@opendaw/lib-midi";
export class MIDIMessageSubscriber {
    static subscribeMessageEvents(access, observer, channel) {
        const listenToMIDIMessages = (input) => isDefined(channel)
            ? Events.subscribe(input, "midimessage", (event) => {
                if (event.data === null || MidiData.readChannel(event.data) !== channel) {
                    return;
                }
                observer(event);
            }) : Events.subscribe(input, "midimessage", observer);
        const connections = Array.from(access.inputs.values())
            .map(input => ([input, listenToMIDIMessages(input)]));
        const stateSubscription = Events.subscribe(access, "statechange", (event) => {
            const port = event.port;
            if (!isInstanceOf(port, MIDIInput)) {
                return;
            }
            for (const [input, subscription] of connections) {
                if (input === port) {
                    // Well, this seems odd, but if you start listening to a midi-input initially,
                    // it will change its state to 'connected', so we clean up the first old subscriptions.
                    subscription.terminate();
                    break;
                }
            }
            if (port.state === "connected") {
                connections.push([port, listenToMIDIMessages(port)]);
            }
        });
        return {
            terminate: () => {
                stateSubscription.terminate();
                connections.forEach(([_, subscription]) => subscription.terminate());
                connections.length = 0;
            }
        };
    }
}
