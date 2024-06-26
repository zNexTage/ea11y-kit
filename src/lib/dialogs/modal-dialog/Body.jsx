import { styled } from "@stitches/react"
import React from "react";

const ModalDialogBodyStyled = styled("div", {});

/**
 * @typedef BodyProps
 * @property {React.ReactNode} children
 * @property {import("@stitches/react").CSS} css
 */

/**
 * Define o corpo do Dialog
 * @param {BodyProps} props 
 * @returns 
 */
const Body = ({ children, css }) => (
    <ModalDialogBodyStyled css={css}>
        {children}
    </ModalDialogBodyStyled>
)

export default Body;