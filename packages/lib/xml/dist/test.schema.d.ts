export declare abstract class BookSchema {
    readonly title: string;
    readonly author: string;
}
export declare class ShelfSchema {
    readonly id: string;
    readonly books?: BookSchema[];
}
export declare class ReviewSchema {
    readonly score: number;
    readonly text?: string;
}
export declare class NovelSchema extends BookSchema {
    readonly pages?: number;
    readonly review?: ReviewSchema;
}
export declare class ComicSchema extends BookSchema {
    readonly illustrator?: string;
    readonly review?: ReviewSchema;
}
export declare class TextbookSchema extends BookSchema {
    readonly edition?: number;
}
export declare class SectionSchema {
    readonly id: string;
    readonly name: string;
    readonly shelves: ShelfSchema[];
}
export declare class LibrarySchema {
    readonly name: string;
    readonly location?: string;
    readonly sections: SectionSchema[];
}
//# sourceMappingURL=test.schema.d.ts.map