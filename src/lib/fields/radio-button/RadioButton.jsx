import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import ComponentErrorList from "../../../components/component-error-list";
import * as KeyboardKeys from "../../../utils/KeyboardCodes";
import { fieldHightlight } from "../shared-styles/Field.style";
import { lightTheme } from "../../../stitches.config";

const INTERACTION_KEYS = [KeyboardKeys.ENTER, KeyboardKeys.NUMPAD_ENTER];
const FOCUS_OUT_KEYS = [KeyboardKeys.ARROW_DOWN, KeyboardKeys.ARROW_UP];

/**
 * @typedef RadioButtonProps
 * @property {string} id
 * @property {string} name
 * @property {string} label 
 * @property {boolean} isRequired
 * @property {React.HTMLProps<HTMLInputElement>|null} extraAttributes
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
 * será renderizado uma lista contendo quais diretrizes foram violadas. * 
 * 
 * @param {RadioButtonProps} props
 * @returns 
 */
const RadioButton = ({ id, name, label, isRequired = false, extraAttributes }) => {
    const violations = useFieldValidations(label, id);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (extraAttributes?.type) {
            console.warn("Não é possível alterar o type do componente Radio.");
        }
    }, []);

    /**
     * Permite seleção e remoção de seleção via teclado.
     * @param {KeyboardEvent} event 
     */
    const onKeyDown = event => {
        const key = event.code;

        //  verifica se foi pressionado a tecla Enter ou espaço.
        if (INTERACTION_KEYS.includes(key)) {
            setIsChecked(true);
        } else if (FOCUS_OUT_KEYS.includes(key)) { // caso tenha sido pressionada as setas, significa que o usuário vai navegar para o próximo Radio, portanto remove a seleção.
            setIsChecked(false);
        }
    }

    /**
     * Seleciona o radio
     * @param {Event} event 
     */
    const onChange = event => {
        console.log("ID: " + id);
        console.log("State : " + isChecked);
        console.log("Event : " + event.target.checked);
        setIsChecked(event.target.checked);
    }

    return (
        <>
            {violations.length === 0 &&
                <div>
                    <label htmlFor={id}>
                        {label}{isRequired && <>&nbsp;<small>(campo obrigatório)</small></>}
                    </label>
                    <input
                        {...extraAttributes}
                        key={`${id}_${isChecked}`}
                        className={`${lightTheme} ${fieldHightlight} ${extraAttributes?.className}`}
                        type="radio"
                        name={name}
                        id={id}
                        checked={isChecked}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
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
    name: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    extraAttributes: PropTypes.object
}

export default RadioButton;