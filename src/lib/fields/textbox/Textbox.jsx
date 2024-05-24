import PropTypes from "prop-types";
import GuidelineViolation from "../../../exceptions/GuidelineViolation/GuidelineViolation";
import { PROVIDE_INSTRUCTIONS_FOR_DATA_ENTRY } from "../../../utils/eMagGuidelineCode";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import React, { useEffect, useState } from "react";
import RequiredAttribute from "../../../exceptions/RequiredAttribute";
import ComponentErrorList from "../../../components/component-error-list";
import { fieldCss, fieldHightlight } from "../shared-styles/Field.style";
import { lightTheme } from "../../../stitches.config";

const AVAILABLE_TYPES = ["email", "number", "password", "search", "text", "url", "date", "datetime-local", "time"];

/**
 *  @typedef TextboxProps
 *  @property {string} label
 *  @property {string} name
 *  @property {string} id
 *  @property {string} placeholder
 *  @property {number} maxLength
 *  @property {boolean} isRequired 
 *  @property {("email"|"number"|"password"|"search"|"text"|"url")} type
 *  @property {HTMLInputElement|null} extraAttributes
 */

/** 
 * Campo de texto configurado com as diretrizes do eMAG. 
 * 
 * Diretrizes adotadas:
 * 
 * Recomendação 4.4 – Possibilitar que o elemento com foco seja visualmente evidente
 * - Ao receber foco é aplicado uma borda vermelha de 2px do tipo solid no campo de texto.
 * Além da borda, foi reforçado o destaque do componente através do atributo outline.
 * 
 * 
 * Recomendação 6.2 – Associar etiquetas aos seus campos: 
 *  - O atributo id é obrigatório, e é utilizado para vincular a label ao campo de texto e identificar o input;
 * 
 * Recomendação 6.5 – Fornecer instruções para entrada de dados: 
 *  - Para os campos obrigatórios é adicionado a informação *campo obrigatório* a frente da label para que
 * leitores de telas possam comunicar ao usuário que o campo precisa ser preenchido;
 *  - O atributo *placeholder* é obrigatório para os campos e deverá apresentar uma dica de preenchimento do campo.
 * A dica é importante para os leitores de tela. 
 * 
 * O componente é renderizado apenas se estiver de acordo com as diretrizes do eMAG. Caso não esteja,
 * será renderizado uma lista contendo quais diretrizes foram violadas.
 * 
 * 
 * @param {TextboxProps} props 
 * @returns {React.JSX.Element} 
 */
const Textbox = ({
    label,
    extraAttributes,
    placeholder,
    id,
    name,
    maxLength,
    isRequired = false,
    type,
}) => {
    const [errors, setErrors] = useState([]);

    const violations = useFieldValidations(label, id);

    useEffect(() => {
        const textFieldViolations = [...violations];

        if (!type || !AVAILABLE_TYPES.includes(type)) {
            textFieldViolations.push(
                new RequiredAttribute(`É necessário especificar o tipo do campo de texto (atributo 'type'). O componente Textbox suporta os tipos: ${AVAILABLE_TYPES.join(", ")}`)
            )
        }

        if (!placeholder) {
            textFieldViolations.push(
                new GuidelineViolation(PROVIDE_INSTRUCTIONS_FOR_DATA_ENTRY, `É necessário especificar uma dica para o campo de texto (placeholder). É importante informar uma dica, pois leitores de tela leem a dica e comunicam aos usuários.`)
            );
        }

        if (!name) {
            textFieldViolations.push(
                new RequiredAttribute(`É necessário especificar o nome (name) do campo. O atributo name é usado como referência quando os dados são enviados (https://www.w3schools.com/tags/att_name.asp).`)
            )
        }

        setErrors([...textFieldViolations]);
    }, [type, placeholder, violations]);

    return (

        <>
            {errors.length === 0 &&
                <div>
                    <label htmlFor={id}>
                        {isRequired ? <>{label}&nbsp;<small>(campo obrigatório)</small></> : label}
                    </label>
                    <input
                        {...extraAttributes}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        name={name}
                        className={`${fieldCss} ${fieldHightlight} ${lightTheme}`}
                        id={id}
                        type={type}
                        required={isRequired || false}
                    />
                </div>
            }
            {errors.length > 0 && <ComponentErrorList errors={errors} />}
        </>
    )
}

Textbox.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    type: PropTypes.oneOf(AVAILABLE_TYPES).isRequired,
    maxLength: PropTypes.number,
    name: PropTypes.string.isRequired,
    extraAttributes: PropTypes.object
}

export default Textbox;