import { styled } from "@stitches/react"
import React from "react";

const ModalDialogBodyStyled = styled("div", {});

/**
 * @typedef BodyProps
 * @property {React.ReactNode} children
 */

/**
 * Define o corpo do Dialog
 * @param {BodyProps} props 
 * @returns 
 */
const Body = ({ children }) => (
    <ModalDialogBodyStyled>
        {children}
    </ModalDialogBodyStyled>
)

export default Body;