import { styled } from "@stitches/react";

/**
 * Representa o elemento tr.
 */
const Row = styled("tr", {
    "&:nth-child(even)": {
        backgroundColor: "#dddddd"
    }
});

export default Row;