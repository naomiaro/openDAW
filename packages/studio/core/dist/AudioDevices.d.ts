export declare class AudioDevices {
    #private;
    static requestPermission(): Promise<undefined>;
    static requestStream(constraints: MediaTrackConstraints): Promise<MediaStream>;
    static updateInputList(): Promise<undefined>;
    static get inputs(): ReadonlyArray<MediaDeviceInfo>;
}
//# sourceMappingURL=AudioDevices.d.ts.map