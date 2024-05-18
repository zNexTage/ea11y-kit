import style from "./Color.module.css";
import baseStyle from "../../Base.module.css";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import ComponentErrorList from "../../../components/component-error-list";
import { useEffect, useState } from "react";
import RequiredAttribute from "../../../exceptions/RequiredAttribute";

/**
 * @typedef ColorProps
 * @property {string} id
 * @property {string} name,
 * @property {string}  label
 * @property {boolean}  required 
 */

/**
 * Campo para seleção de cores
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
 * 
 * @param {ColorProps} props
 * @returns 
 */
const Color = ({
    id,
    name,
    label,
    required
}) => {

    const [errors, setErrors] = useState([]);
    const violations = useFieldValidations(label, id);

    useEffect(() => {
        const errorsAux = [...violations];

        if (!name) {
            errorsAux.push(new RequiredAttribute("É necessário especificar o nome (name) do campo. O atributo name é usado como referência quando os dados são enviados (https://www.w3schools.com/tags/att_name.asp)."))
        }

        setErrors([...errorsAux]);
    }, []);

    return (
        <>
            {
                errors.length === 0 &&
                <div>
                    <label htmlFor={id}>
                        {label} {required && <small>(campo obrigatório)</small>}
                    </label>
                    <input
                        className={`${style.Color} ${baseStyle.Highlight}`}
                        type="color"
                        name={name}
                        id={id}
                    />
                </div>
            }

            {
                errors.length > 0 &&
                <ComponentErrorList errors={errors} />
            }

        </>
    )
}

export default Color;