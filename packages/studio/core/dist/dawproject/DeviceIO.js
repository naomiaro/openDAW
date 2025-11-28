import { assert, ByteArrayInput, ByteArrayOutput, panic, UUID } from "@opendaw/lib-std";
import { PointerField } from "@opendaw/lib-box";
import { AudioFileBox } from "@opendaw/studio-boxes";
import { DeviceBoxUtils } from "@opendaw/studio-adapters";
export var DeviceIO;
(function (DeviceIO) {
    DeviceIO.exportDevice = (box) => {
        const dependencies = Array.from(box.graph.dependenciesOf(box).boxes);
        const output = ByteArrayOutput.create();
        output.writeString("openDAW:device");
        output.writeInt(1); // format version
        const writeBox = (box) => {
            UUID.toDataOutput(output, box.address.uuid);
            output.writeString(box.name);
            const arrayBuffer = box.toArrayBuffer();
            output.writeInt(arrayBuffer.byteLength);
            output.writeBytes(new Int8Array(arrayBuffer));
        };
        writeBox(box);
        output.writeInt(dependencies.length);
        dependencies.forEach(dep => writeBox(dep));
        return output.toArrayBuffer();
    };
    DeviceIO.importDevice = (boxGraph, buffer) => {
        const input = new ByteArrayInput(buffer);
        const header = input.readString();
        const version = input.readInt();
        assert(header === "openDAW:device", `wrong header: ${header}`);
        assert(version === 1, `wrong version: ${version}`);
        const mapping = UUID.newSet(({ source }) => source);
        const rawBoxes = [];
        const readRawBox = () => {
            const uuid = UUID.fromDataInput(input);
            const key = input.readString();
            const length = input.readInt();
            const array = new Int8Array(length);
            input.readBytes(array);
            mapping.add({ source: uuid, target: key === AudioFileBox.ClassName ? uuid : UUID.generate() });
            return { uuid, key, input: new ByteArrayInput(array.buffer) };
        };
        rawBoxes.push(readRawBox());
        const numDeps = input.readInt();
        for (let i = 0; i < numDeps; i++) {
            rawBoxes.push(readRawBox());
        }
        // We are going to award all boxes with new UUIDs.
        // Therefore, we need to map all internal pointer targets.
        return PointerField.decodeWith({
            map: (_pointer, newAddress) => newAddress.map(address => mapping.opt(address.uuid).match({
                none: () => address,
                some: ({ target }) => address.moveTo(target)
            }))
        }, () => {
            const [main, ...deps] = rawBoxes;
            const { key, uuid, input } = main;
            const box = boxGraph.createBox(key, mapping.get(uuid).target, box => box.read(input));
            if (!DeviceBoxUtils.isDeviceBox(box)) {
                return panic(`${box.name} is not a DeviceBox`);
            }
            deps.forEach(({ key, uuid, input }) => boxGraph.createBox(key, mapping.get(uuid).target, box => box.read(input)));
            return box;
        });
    };
})(DeviceIO || (DeviceIO = {}));
