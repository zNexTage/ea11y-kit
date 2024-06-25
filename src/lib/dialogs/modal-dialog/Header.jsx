import { styled } from "@stitches/react";
import Button from "../../fields/button/Button";

const ModalDialogHeaderContainerStyled = styled("div", {});

const ModalDialogHeaderStyled = styled("div", {});

/**
 * @typedef HeaderProps
 * @property {string} title
 * @property {React.ReactNode} children
 * @property {(event:React.MouseEvent<HTMLButtonElement>)=> void} onCloseClick
 */

/**
 * Cabeçalho do dialog
 * @param {HeaderProps} props
 * @returns 
 */
const Header = ({ title, children, onCloseClick }) => (
    <ModalDialogHeaderContainerStyled>
        <ModalDialogHeaderStyled css={{
            display: "flex",
            justifyContent: "space-between",
        }}>
            <h1>
                {title}
            </h1>

            <div>
                <Button onClick={onCloseClick}>
                    <b>x</b>
                </Button>
            </div>
        </ModalDialogHeaderStyled>

        {children}
    </ModalDialogHeaderContainerStyled>
)

export default Header;