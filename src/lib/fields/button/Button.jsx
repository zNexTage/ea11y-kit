import { fieldHightlight } from "../shared-styles/Field.style";
import { lightTheme } from "../../../stitches.config";

/**
 * @typedef ButtonProps
 * @property {string} text
 * @property { 'submit' | 'reset' | 'button'} type 
 */


/**
 * Botão configurado com as diretrizes do eMAG
 * 
 * Recomendação 4.4 – Possibilitar que o elemento com foco seja visualmente evidente
 * - Ao receber foco é aplicado uma borda vermelha de 2px do tipo solid no campo de texto.
 * Além da borda, foi reforçado o destaque do componente através do atributo outline.
 * @param {ButtonProps} props 
 * @returns 
 */
const Button = ({ text = 'Enviar', type = 'button' }) => {
    return (
        <button className={`${lightTheme} ${fieldHightlight}`} type={type}>
            {text}
        </button>
    )
}

export default Button;