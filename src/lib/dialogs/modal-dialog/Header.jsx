import { styled } from "@stitches/react";
import Button from "../../fields/button/Button";

const ModalDialogHeaderContainerStyled = styled("div", {});

const ModalDialogHeaderStyled = styled("div", {});

/**
 * @typedef HeaderProps
 * @property {string} title
 * @property {React.ReactNode} children
 * @property {(event:React.MouseEvent<HTMLButtonElement>)=> void} onCloseClick
 * @property {import("@stitches/react").CSS} css
 * @property {import("@stitches/react").CSS} closeButtonCss
 */

/**
 * Cabeçalho do dialog
 * @param {HeaderProps} props
 * @returns 
 */
const Header = ({ title, children, onCloseClick, css, closeButtonCss }) => (
    <ModalDialogHeaderContainerStyled css={css}>
        <ModalDialogHeaderStyled css={{
            display: "flex",
            justifyContent: "space-between",
        }}>
            <h1>
                {title}
            </h1>

            <div>
                <Button
                    css={closeButtonCss}
                    onClick={onCloseClick}>
                    <b>x</b>
                </Button>
            </div>
        </ModalDialogHeaderStyled>

        {children}
    </ModalDialogHeaderContainerStyled>
)

export default Header;