import PropTypes from "prop-types";
import { fieldHightlight } from "../shared-styles/Field.style";
import { lightTheme } from "../../../stitches.config";
import { styled } from "@stitches/react";
import React from "react";

/**
 * @typedef ButtonProps
 * @property {React.ReactDOM} children
 * @property {import("@stitches/react").CSS} css
 */

/**
 * @typedef {React.HTMLProps<HTMLButtonElement> & ButtonProps} ExtendedButtonProps
 */

const ButtonStyled = styled("button", () => {

});

/**
 * Botão configurado com as diretrizes do eMAG
 * 
 * Recomendação 4.4 – Possibilitar que o elemento com foco seja visualmente evidente
 * - Ao receber foco é aplicado uma borda vermelha de 2px do tipo solid no campo de texto.
 * Além da borda, foi reforçado o destaque do componente através do atributo outline.
 * @param {ExtendedButtonProps} props 
 * @returns 
 */
const Button = ({ type = 'button', children, css, ...rest }) => {
    return (
        <ButtonStyled
            className={`${lightTheme} ${fieldHightlight}`}
            css={css}
            type={type}
            {...rest}
        >
            {children}
        </ButtonStyled>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['submit', 'reset', 'button']).isRequired
}

export default Button;