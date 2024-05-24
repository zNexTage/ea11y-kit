
import { useEffect, useState } from "react";
import GuidelineViolation from "../../../exceptions/GuidelineViolation/GuidelineViolation";
import { PROVIDE_INSTRUCTIONS_FOR_DATA_ENTRY } from "../../../utils/eMagGuidelineCode";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import ComponentErrorList from "../../../components/component-error-list";
import RequiredAttribute from "../../../exceptions/RequiredAttribute";
import { fieldCss, fieldHightlight } from "../shared-styles/Field.style";
import { lightTheme } from "../../../stitches.config";

/**
 * @typedef TextareaProps
 * @property {string} id
 * @property {string} name
 * @property {string} label 
 * @property {string} placeholder 
 * @property {number} rows
 * @property {number} cols
 * @property {boolean} required
 */

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
 * @param {TextareaProps} props 
 * @returns 
 */
const Textarea = ({
    label, id, name, rows = 4, cols = 50, required = false, placeholder
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
                    <textarea
                        required={required}
                        rows={rows}
                        cols={cols}
                        className={`${lightTheme} ${fieldCss} ${fieldHightlight} `}
                        name={name}
                        placeholder={placeholder}
                        id={id}>
                    </textarea>
                </div>
            }

            {errors.length > 0 && <ComponentErrorList errors={errors} />}
        </>
    )
}

export default Textarea;