import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import ComponentErrorList from "../../../components/component-error-list";
import * as KeyboardKeys from "../../../utils/KeyboardCodes";
import { fieldHightlight } from "../shared-styles/Field.style";
import { lightTheme } from "../../../stitches.config";

// Enter e tecla espaço.
const INTERACTION_KEYS = [KeyboardKeys.ENTER, KeyboardKeys.NUMPAD_ENTER];

/**
 *  @typedef CheckboxProps
 *  @property {string} label
 *  @property {string} id
 *  @property {boolean} isRequired 
 *  @property {HTMLInputElement|null} extraAttributes
 */

/**
 * Campo selecionavel configurado com as diretrizes do eMAG. 
 * 
 * Diretrizes adotadas:
 * 
 * - Recomendação 2.1 - Disponibilizar todas as funções da página via teclado: É possível selecionar e remover a seleção
 * através da tecla espaço e enter.
 * 
 * - Recomendação 4.4 – Possibilitar que o elemento com foco seja visualmente evidente
 *  - Ao receber foco é aplicado uma borda vermelha de 2px do tipo solid no checkbox.
 * Além da borda, foi reforçado o destaque do componente através do atributo outline.
 *  
 * - Recomendação 6.2 – Associar etiquetas aos seus campos: 
 *  - O atributo id é obrigatório, e é utilizado para vincular a label ao checkbox e identificar o input;
 * 
 * - Recomendação 6.5 – Fornecer instruções para entrada de dados: 
 *  - Para os campos obrigatórios é adicionado a informação *campo obrigatório* a frente da label para que
 * leitores de telas possam comunicar ao usuário que o campo precisa ser preenchido;
 * 
 * @param {CheckboxProps} props 
 * @returns 
 */
const Checkbox = ({
    id,
    label,
    extraAttributes
}) => {
    const [isChecked, setIsChecked] = useState(false);

    const violations = useFieldValidations(label, id);

    /**
     * Marca/desmarca o checkbox através da interação pelo mouse.
     * @param {MouseEvent} event 
     */
    const onChange = event => {
        setIsChecked(!isChecked);
    }

    useEffect(() => {
        if (extraAttributes && extraAttributes.type !== "checkbox") {
            console.warn(`Não é possível alterar atributo type do Checkbox.`);
        }
    }, [extraAttributes]);


    return (
        <>
            {violations.length == 0 &&
                <div>
                    <label htmlFor={id}>
                        {label}
                    </label>
                    <input
                        {...extraAttributes}
                        role="checkbox"
                        className={`${lightTheme} ${fieldHightlight}`}
                        checked={isChecked}
                        onChange={onChange}
                        type="checkbox"
                        name={id}
                        id={id} />
                </div>
            }
            {violations.length > 0 && <ComponentErrorList errors={violations} />}
        </>
    )
}

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    extraAttributes: PropTypes.object
}

export default Checkbox;