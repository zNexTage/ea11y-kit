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
 *  @property {("email"|"number"|"password"|"search"|"text"|"url")} type
 */

/** *
 * @param {TextboxProps} props 
 * @returns 
 */
const TextboxBase = ({
    label,
    id,
    type
}) => {

    if (!label) {
        throw new GuidelineViolation(6.2, "Associar etiquetas aos seus campos", "Um campo de texto deve possuir uma label (etiqueta) que indique ao usuário o que ele deve inserir no campo. A label é importante para ajudar usuários com qualquer tipo de dificuldade visual, pois os leitores de tela irão ler o campo quando o usuário estiver focado no campo de texto.")
    }

    if (!id) {
        throw new GuidelineViolation(6.2, "Associar etiquetas aos seus campos", "Para que a label (etiqueta) seja associado a um campo de texto e contextualize um campo de texto, é necessário informar a propriedade id.");
    }

    if(!type || !AVAILABLE_TYPES.includes(type)){
        throw new Error(`É necessário especificar o tipo do campo de texto. Os tipos disponíveis são: ${AVAILABLE_TYPES.join(", ")}`);
    }

    return (
        <div>
            <label htmlFor={id}>
                {label}
            </label>
            <input className={style.textbox} id={id} type={type} />
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
    type
}) => (
    <ErrorBoundary fallbackRender={ErrorComponent}>
        <TextboxBase
            label={label}
            id={id}
            type={type}
        />
    </ErrorBoundary>
)

Textbox.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(AVAILABLE_TYPES).isRequired
}

export default Textbox;