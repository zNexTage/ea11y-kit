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
        highlightColor: '#F00',
        borderColor: '#000'
    }
});

const global = globalCss({
    '*':{
        fontFamily:'$fonts$default'
    }
});

global();

export default baseTheme;