
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import GuidelineViolation from "../../../exceptions/GuidelineViolation/GuidelineViolation";
import { PROVIDE_INSTRUCTIONS_FOR_DATA_ENTRY } from "../../../utils/eMagGuidelineCode";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import ComponentErrorList from "../../../helper-components/component-error-list";
import RequiredAttribute from "../../../exceptions/RequiredAttribute";
import { fieldCss, fieldHightlight } from "../shared-styles/Field.style";
import { lightTheme } from "../../../stitches.config";
import { styled } from "@stitches/react";

/**
 * @typedef TextareaProps
 * @property {import("@stitches/react").CSS} css
 */

/**
 * @typedef {TextareaProps & React.HTMLProps<HTMLTextAreaElement>} ExtendedTextareaProps
 */

const TextareaStyled = styled("textarea", {});

/**
 * Campo de texto com múltiplas linhas pré-configurado com as diretrizes do eMAG.
 * 
 * Recomendação 4.4 – Possibilitar que o elemento com foco seja visualmente evidente
 * - Ao receber foco é aplicado uma borda vermelha de 2px do tipo solid no campo de texto.
 * Além da borda, foi reforçado o destaque do componente através do atributo outline.
 * 
 * Recomendação 6.2 – Associar etiquetas aos seus campos: 
 *  - O atributo id é obrigatório, e é utilizado para vincular a label ao campo de texto e identificar o input;
 * 
 * Recomendação 6.5 – Fornecer instruções para entrada de dados: 
 *  - Para os campos obrigatórios é adicionado a informação *campo obrigatório* a frente da label para que
 * leitores de telas possam comunicar ao usuário que o campo precisa ser preenchido;
 * - O atributo *placeholder* é obrigatório para os campos e deverá apresentar uma dica de preenchimento do campo.
 * A dica é importante para os leitores de tela. 
 * @param {ExtendedTextareaProps} props 
 * @returns 
 */
const Textarea = ({
    label, id, name, rows = 4, cols = 50, required = false, placeholder, css, ...rest
}) => {
    const [errors, setErrors] = useState([]);

    const violations = useFieldValidations(label, id);

    useEffect(() => {
        const textFieldViolations = [...violations];

        if (!name) {
            textFieldViolations.push(
                new RequiredAttribute("É necessário especificar o nome (name) do campo. O atributo name é usado como referência quando os dados são enviados (https://www.w3schools.com/tags/att_name.asp).")
            );
        }

        if (!placeholder) {
            textFieldViolations.push(
                new GuidelineViolation(PROVIDE_INSTRUCTIONS_FOR_DATA_ENTRY, `É necessário especificar uma dica para o campo de texto (placeholder). É importante informar uma dica, pois leitores de tela leem a dica e comunicam aos usuários.`)
            );
        }

        setErrors([...textFieldViolations]);
    }, [placeholder, violations]);

    return (
        <>
            {errors.length == 0 &&
                <div>
                    <label htmlFor={id}>
                        {label} {required && <small>(campo obrigatório)</small>}
                    </label>
                    <TextareaStyled
                        {...rest}
                        required={required}
                        rows={rows}
                        cols={cols}
                        className={`${lightTheme} ${fieldCss} ${fieldHightlight} `}
                        css={css}
                        name={name}
                        placeholder={placeholder}
                        id={id}>
                    </TextareaStyled>
                </div>
            }

            {errors.length > 0 && <ComponentErrorList whichComponent="Textarea" errors={errors} />}
        </>
    )
}

Textarea.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
    required: PropTypes.bool,
    css: PropTypes.object
}

export default Textarea;