export declare namespace Keyboard {
    const isControlKey: ({ ctrlKey, metaKey }: {
        ctrlKey: boolean;
        metaKey: boolean;
    }) => boolean;
    const isCopyKey: ({ altKey }: {
        altKey: boolean;
    }) => boolean;
    const GlobalShortcut: Readonly<{
        isDelete: (event: KeyboardEvent) => boolean;
        isSelectAll: (event: KeyboardEvent) => boolean;
        isDeselectAll: (event: KeyboardEvent) => boolean;
    }>;
}
//# sourceMappingURL=keyboard.d.ts.map