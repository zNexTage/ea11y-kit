import baseTheme from "../../../stitches.config";

const fieldCss = baseTheme.css({
    display: 'block',
    padding: '5px',
    borderRadius: '2px',
    border: '2px solid $colors$borderColor',
    width: '100%',
    boxSizing: 'border-box'
});

const fieldHightlight = baseTheme.css({
    '&:focus': {
        border: '$sizes$borderSize solid $colors$highlightColor',
        outline: '$sizes$outlineSize solid $colors$highlightColor',
    }
})

const labelCss = baseTheme.css({
    display: 'block'
});

export {
    fieldCss,
    labelCss,
    fieldHightlight
}