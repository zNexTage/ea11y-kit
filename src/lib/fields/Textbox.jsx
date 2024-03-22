import PropTypes from "prop-types";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import GuidelineViolation from "../../exceptions/GuidelineViolation/GuidelineViolation";
import style from "./Textbox.module.css";

const AVAILABLE_TYPES = ["email", "number", "password", "search", "text", "url"];

/**
 *  @typedef TextboxProps
 *  @property {string} label
 *  @property {string} id
 *  @property {number} maxLength
 *  @property {boolean} isRequired 
 *  @property {("email"|"number"|"password"|"search"|"text"|"url")} type
 *  @property {HTMLInputElement|null} extraAttributes
 */

/** *
 * @param {TextboxProps} props 
 * @returns 
 */
const TextboxBase = ({
    label,
    extraAttributes,
    id,
    maxLength,
    isRequired = false,
    type
}) => {

    if (!label) {
        throw new GuidelineViolation(6.2, "Associar etiquetas aos seus campos", "Um campo de texto deve possuir uma label (etiqueta) que indique ao usuário o que ele deve inserir no campo. A label é importante para ajudar usuários com qualquer tipo de dificuldade visual, pois os leitores de tela irão ler o campo quando o usuário estiver focado no campo de texto.")
    }

    if (!id) {
        throw new GuidelineViolation(6.2, "Associar etiquetas aos seus campos", "Para que a label (etiqueta) seja associado a um campo de texto e contextualize um campo de texto, é necessário informar a propriedade id.");
    }

    if (!type || !AVAILABLE_TYPES.includes(type)) {
        throw new Error(`É necessário especificar o tipo do campo de texto. Os tipos disponíveis são: ${AVAILABLE_TYPES.join(", ")}`);
    }


    return (
        <div>
            <label htmlFor={id}>
                {label}
            </label>
            <input
                {...extraAttributes}
                maxLength={maxLength}
                className={`${style.textbox} ${extraAttributes?.className}`}
                id={id}
                type={type}
                required={isRequired}
            />
        </div>
    )
}

/** *
 * @param {TextboxProps} props 
 * @returns 
 */
const Textbox = ({
    label,
    id,
    type,
    maxLength,
    isRequired = false
}) => (
    <ErrorBoundary fallbackRender={ErrorComponent}>
        <TextboxBase
            label={label}
            id={id}
            type={type}
            isRequired={isRequired}
            maxLength={maxLength}
        />
    </ErrorBoundary>
)

Textbox.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    type: PropTypes.oneOf(AVAILABLE_TYPES).isRequired,
    maxLength: PropTypes.number
}

export default Textbox;