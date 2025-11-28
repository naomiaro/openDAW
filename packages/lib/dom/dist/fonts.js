export const loadFont = async (properties) => {
    try {
        const response = await fetch(properties.src, { credentials: "omit" });
        const fontData = await response.arrayBuffer();
        const fontFace = new FontFace(properties["font-family"], fontData, {
            display: "block",
            weight: String(properties["font-weight"]),
            style: properties["font-style"]
        });
        await fontFace.load();
        document.fonts.add(fontFace);
        console.debug(`font-family: '${fontFace.family}'`);
    }
    catch (error) {
        console.error(error);
    }
};
// suggested by claude.ai to compensate variants on Mac/Windows
export const getFontSizeForHeight = (context, fontFamily, fontSize) => {
    context.font = `${fontSize}px ${fontFamily}, sans-serif`;
    const metrics = context.measureText("M"); // Use 'M' or your typical character
    const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    return (fontSize / actualHeight) * fontSize;
};
