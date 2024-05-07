import { useEffect } from "react";
import PropTypes from "prop-types";
import baseStyle from "../../Base.module.css";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import ComponentErrorList from "../../../components/component-error-list";

/**
 * @typedef RadioButtonProps
 * @property {string} id
 * @property {string} name
 * @property {string} label 
 * @property {boolean} isRequired
 * @property {HTMLInputElement|null} extraAttributes
 */

/**
 * Campo radio configurado com as diretrizes do eMAG. 
 * 
 * Recomendação 4.4 – Possibilitar que o elemento com foco seja visualmente evidente
 * - Ao receber foco é aplicado uma borda vermelha de 2px do tipo solid no campo de texto.
 * Além da borda, foi reforçado o destaque do componente através do atributo outline.
 * 
 * Recomendação 6.2 – Associar etiquetas aos seus campos: 
 * - O atributo id é obrigatório, e é utilizado para vincular a label ao campo de texto e identificar o input;
 *  
 * Recomendação 6.5 – Fornecer instruções para entrada de dados: 
 *  - Para os campos obrigatórios é adicionado a informação *campo obrigatório* a frente da label para que
 * leitores de telas possam comunicar ao usuário que o campo precisa ser selecionado;
 * 
 *  O componente é renderizado apenas se estiver de acordo com as diretrizes do eMAG. Caso não esteja,
 * será renderizado uma lista contendo quais diretrizes foram violadas.
 * 
 * @param {RadioButtonProps} props
 * @returns 
 */
const RadioButton = ({ id, name, label, isRequired = false, extraAttributes }) => {
    const violations = useFieldValidations(label, id);

    useEffect(() => {
        if (extraAttributes?.type) {
            console.warn("Não é possível alterar o type do componente Radio.");
        }
    }, []);

    return (
        <>
            {violations.length === 0 &&
                <div>
                    <label htmlFor={id}>
                        {label}{isRequired && <>&nbsp;<small>(campo obrigatório)</small></>}
                    </label>
                    <input
                        {...extraAttributes}
                        className={`${baseStyle.Highlight} ${extraAttributes?.className}`}
                        type="radio"
                        name={name}
                        id={id}
                        required={isRequired}
                    />
                </div>
            }

            {violations.length > 0 && <ComponentErrorList errors={violations} />}
        </>
    )
}

RadioButton.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    extraAttributes: PropTypes.object
}

export default RadioButton;