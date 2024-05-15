import ComponentErrorList from "../../../components/component-error-list";
import RequiredAttribute from "../../../exceptions/RequiredAttribute";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import baseFieldStyle from "../BaseField.module.css";
import React, { useEffect, useState } from "react";

/** 
 * @typedef WeekProps
 * @property {string} id
 * @property {string} name
 * @property {string} label
 * @property {boolean} required
 */



/**
 * Campo de entrada para informar uma semana configurado com as diretrizes do eMAG.
 * 
 * Diretrizes adotadas:
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
 * 
 * @param {WeekProps} props 
 * @returns {React.JSX.Element}
 */
const Week = ({ id, label, name, required = false }) => {

    const violations = useFieldValidations(label, id);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const errorsAux = [...violations];

        if (!name) {
            errorsAux.push(
                new RequiredAttribute(`É necessário especificar o tipo do campo de texto (atributo 'name')`)
            )
        }

        setErrors(errorsAux);
    }, []);

    return (
        <>
            {errors.length == 0 &&
                <div>
                    <label htmlFor={id}>
                        {label} {required && <small>(campo obrigatório)</small>}
                    </label>

                    <input
                        type="week"
                        name={name}
                        id={id}
                        className={baseFieldStyle.field}
                    />
                </div>
            }

            {errors.length > 0 && <ComponentErrorList errors={errors} />}
        </>
    )
}

export default Week;