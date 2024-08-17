import { createStitches, globalCss } from "@stitches/react";

const baseTheme = createStitches({
    theme: {
        fonts: {
            default: 'sans-serif'
        },
        sizes: {
            borderSize: "1px",
            outlineSize: "2px"
        },

    },

});

export const lightTheme = baseTheme.createTheme({
    colors: {
        highlightColor: '#0000FF',
        borderColor: '#000'
    }
});

const global = globalCss({
    '*': {
        fontFamily: '$fonts$default',
        margin: 0,
        padding: 0
    }
});

global();

export default baseTheme;