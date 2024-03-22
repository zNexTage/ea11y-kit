import PropTypes from "prop-types";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import GuidelineViolation from "../../../exceptions/GuidelineViolation/GuidelineViolation";
import style from "./Textbox.module.css";
import { ASSOCIATE_TAGS_WITH_YOUR_FIELDS, PROVIDE_INSTRUCTIONS_FOR_DATA_ENTRY } from "../../../utils/eMagGuidelineCode";

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
    placeholder,
    id,
    maxLength,
    isRequired = false,
    type
}) => {

    if (!label) {
        throw new GuidelineViolation(ASSOCIATE_TAGS_WITH_YOUR_FIELDS, "Um campo de texto deve possuir uma label (etiqueta) que indique ao usuário o que ele deve inserir no campo. A label é importante para ajudar usuários com qualquer tipo de dificuldade visual, pois os leitores de tela irão ler o campo quando o usuário estiver focado no campo de texto.")
    }

    if (!id) {
        throw new GuidelineViolation(ASSOCIATE_TAGS_WITH_YOUR_FIELDS, "Para que a label (etiqueta) seja associado a um campo de texto e contextualize um campo de texto, é necessário informar a propriedade id.");
    }

    if (!type || !AVAILABLE_TYPES.includes(type)) {
        throw new Error(`É necessário especificar o tipo do campo de texto. Os tipos disponíveis são: ${AVAILABLE_TYPES.join(", ")}`);
    }

    if(!placeholder){
        throw new GuidelineViolation(PROVIDE_INSTRUCTIONS_FOR_DATA_ENTRY, `É necessário especificar uma dica para o campo de texto (placeholder). É importante informar uma dica, pois leitores de tela leem a dica e comunicam aos usuários.`);
    }


    return (
        <div>
            <label htmlFor={id}>
                {isRequired ? label : <>{label}&nbsp;<small>(campo obrigatório)</small></>}
            </label>
            <input
                {...extraAttributes}
                placeholder={placeholder}
                maxLength={maxLength}
                className={`${style.textbox} ${extraAttributes?.className}`}
                id={id}
                type={type}
                required={isRequired}
            />
        </div>
    )
}

/** 
 * Campo de texto configurado com as diretrizes do eMAG. 
 * Recomendação 6.2 – Associar etiquetas aos seus campos: 
 *  - O atributo id é obrigatório, e é utilizado para vincular a label ao campo de texto e identificar o input;
 * Recomendação 6.5 – Fornecer instruções para entrada de dados: 
 *  - Para os campos obrigatórios, é adicionado a informação *campo obrigatório* a frente da label para que
 * leitores de telas possam comunicar ao usuário que o campo precisa ser preenchido;
 *  - O atributo *placeholder* é obrigatório para os campos e deverá apresentar uma dica de preenchimento do campo.
 * A dica é importante para os leitores de tela.
 * @param {TextboxProps} props 
 * @returns 
 */
const Textbox = ({
    label,
    id,
    placeholder,
    type,
    maxLength,
    isRequired = false
}) => (
    <ErrorBoundary fallbackRender={ErrorComponent}>
        <TextboxBase
            label={label}
            id={id}
            placeholder={placeholder}
            type={type}
            isRequired={isRequired}
            maxLength={maxLength}
        />
    </ErrorBoundary>
)

Textbox.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    type: PropTypes.oneOf(AVAILABLE_TYPES).isRequired,
    maxLength: PropTypes.number
}

export default Textbox;