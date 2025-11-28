var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Xml } from "./index";
export class BookSchema {
    title;
    author;
}
__decorate([
    Xml.Attribute("title", Xml.StringRequired),
    __metadata("design:type", String)
], BookSchema.prototype, "title", void 0);
__decorate([
    Xml.Attribute("author", Xml.StringRequired),
    __metadata("design:type", String)
], BookSchema.prototype, "author", void 0);
let ShelfSchema = class ShelfSchema {
    id;
    books;
};
__decorate([
    Xml.Attribute("id", Xml.StringRequired),
    __metadata("design:type", String)
], ShelfSchema.prototype, "id", void 0);
__decorate([
    Xml.ElementRef(BookSchema),
    __metadata("design:type", Array)
], ShelfSchema.prototype, "books", void 0);
ShelfSchema = __decorate([
    Xml.Class("Shelf")
], ShelfSchema);
export { ShelfSchema };
let ReviewSchema = class ReviewSchema {
    score;
    text;
};
__decorate([
    Xml.Attribute("score", Xml.NumberRequired),
    __metadata("design:type", Number)
], ReviewSchema.prototype, "score", void 0);
__decorate([
    Xml.Element("text", String),
    __metadata("design:type", String)
], ReviewSchema.prototype, "text", void 0);
ReviewSchema = __decorate([
    Xml.Class("Review")
], ReviewSchema);
export { ReviewSchema };
let NovelSchema = class NovelSchema extends BookSchema {
    pages;
    review;
};
__decorate([
    Xml.Attribute("pages", Xml.NumberOptional),
    __metadata("design:type", Number)
], NovelSchema.prototype, "pages", void 0);
__decorate([
    Xml.Element("Review", ReviewSchema),
    __metadata("design:type", ReviewSchema)
], NovelSchema.prototype, "review", void 0);
NovelSchema = __decorate([
    Xml.Class("Novel")
], NovelSchema);
export { NovelSchema };
let ComicSchema = class ComicSchema extends BookSchema {
    illustrator;
    review;
};
__decorate([
    Xml.Attribute("illustrator", Xml.StringOptional),
    __metadata("design:type", String)
], ComicSchema.prototype, "illustrator", void 0);
__decorate([
    Xml.Element("Review", ReviewSchema),
    __metadata("design:type", ReviewSchema)
], ComicSchema.prototype, "review", void 0);
ComicSchema = __decorate([
    Xml.Class("Comic")
], ComicSchema);
export { ComicSchema };
let TextbookSchema = class TextbookSchema extends BookSchema {
    edition;
};
__decorate([
    Xml.Attribute("edition", Xml.NumberOptional),
    __metadata("design:type", Number)
], TextbookSchema.prototype, "edition", void 0);
TextbookSchema = __decorate([
    Xml.Class("Textbook")
], TextbookSchema);
export { TextbookSchema };
let SectionSchema = class SectionSchema {
    id;
    name;
    shelves;
};
__decorate([
    Xml.Attribute("id", Xml.StringRequired),
    __metadata("design:type", String)
], SectionSchema.prototype, "id", void 0);
__decorate([
    Xml.Attribute("name", Xml.StringRequired),
    __metadata("design:type", String)
], SectionSchema.prototype, "name", void 0);
__decorate([
    Xml.ElementRef(ShelfSchema),
    __metadata("design:type", Array)
], SectionSchema.prototype, "shelves", void 0);
SectionSchema = __decorate([
    Xml.Class("Section")
], SectionSchema);
export { SectionSchema };
let LibrarySchema = class LibrarySchema {
    name;
    location;
    sections;
};
__decorate([
    Xml.Attribute("name", Xml.StringRequired),
    __metadata("design:type", String)
], LibrarySchema.prototype, "name", void 0);
__decorate([
    Xml.Attribute("location", Xml.StringOptional),
    __metadata("design:type", String)
], LibrarySchema.prototype, "location", void 0);
__decorate([
    Xml.ElementRef(SectionSchema, "Sections"),
    __metadata("design:type", Array)
], LibrarySchema.prototype, "sections", void 0);
LibrarySchema = __decorate([
    Xml.Class("Library")
], LibrarySchema);
export { LibrarySchema };
