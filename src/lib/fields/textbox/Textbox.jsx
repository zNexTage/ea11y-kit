import PropTypes from "prop-types";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import GuidelineViolation from "../../../exceptions/GuidelineViolation/GuidelineViolation";
import style from "./Textbox.module.css";
import { PROVIDE_INSTRUCTIONS_FOR_DATA_ENTRY } from "../../../utils/eMagGuidelineCode";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import { useEffect } from "react";
import AggregateError from "../../../exceptions/AggregateError";
import RequiredAttribute from "../../../exceptions/RequiredAttribute";

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
    type,
}) => {
    const violations = useFieldValidations(label, id);

    useEffect(() => {
        const textFieldViolations = [...violations];

        if (!type || !AVAILABLE_TYPES.includes(type)) {
            textFieldViolations.push(
                new RequiredAttribute(`É necessário especificar o tipo do campo de texto (atributo 'type'). Os tipos disponíveis são: ${AVAILABLE_TYPES.join(", ")}`)
            )
        }

        if (!placeholder) {
            const violation = new GuidelineViolation(PROVIDE_INSTRUCTIONS_FOR_DATA_ENTRY, `É necessário especificar uma dica para o campo de texto (placeholder). É importante informar uma dica, pois leitores de tela leem a dica e comunicam aos usuários.`);

            textFieldViolations.push(
                new GuidelineViolation(violation)
            );
        }

        if (textFieldViolations.length > 0) {
            throw new AggregateError(textFieldViolations);
        }
    }, [type, placeholder, violations]);


    //TODO: criar atributo `name`.

    return (
        <div>
            <label htmlFor={id}>
                {isRequired ? label : <>{label}&nbsp;<small>(campo obrigatório)</small></>}
            </label>
            <input
                {...extraAttributes}
                placeholder={placeholder}
                maxLength={maxLength}
                name={id}
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
    isRequired = false,
    extraAttributes
}) => (
    <ErrorBoundary fallbackRender={ErrorComponent}>
        <TextboxBase
            {...extraAttributes}
            label={label}
            id={id}
            placeholder={placeholder}
            type={type}
            name={id}
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