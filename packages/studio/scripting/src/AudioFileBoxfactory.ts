import {AudioFileBox} from "@naomiarotest/studio-boxes"
import {UUID} from "@naomiarotest/lib-std"
import {BoxGraph} from "@naomiarotest/lib-box"

export namespace AudioFileBoxfactory {
    export const create = (boxGraph: BoxGraph, sample: Sample): AudioFileBox =>
        AudioFileBox.create(boxGraph, UUID.parse(sample.uuid), box => {
            box.fileName.setValue(sample.name)
            box.startInSeconds.setValue(0)
            box.endInSeconds.setValue(sample.duration)
        })
}