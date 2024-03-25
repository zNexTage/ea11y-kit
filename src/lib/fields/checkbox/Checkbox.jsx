import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import style from "./Checkbox.module.css";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import ComponentErrorList from "../../../components/component-error-list";

// Enter e tecla espaço.
const INTERACTION_KEYS = ['Enter', 'NumpadEnter', 'Space'];

/**
 *  @typedef CheckboxProps
 *  @property {string} label
 *  @property {string} id
 *  @property {number} maxLength
 *  @property {boolean} isRequired 
 *  @property {HTMLInputElement|null} extraAttributes
 */

/**
 * 
 * @param {CheckboxProps} props 
 * @returns 
 */
const Checkbox = ({
    id,
    label,
    isRequired,
    extraAttributes
}) => {
    const [isChecked, setIsChecked] = useState(false);

    const violations = useFieldValidations(label, id);

    /**
     * Diretriz do eMAG:
     * Recomendação 2.1 - Disponibilizar todas as funções da página via teclado
     * 
     * Possibilita marcar/desmarcar o Checkbox através da tecla Enter.     
     * 
     * @param {KeyboardEvent} event 
     */
    const onKeyDown = event => {
        const key = event.code;

        //  verifica se foi pressionado a tecla Enter ou espaço.
        if (INTERACTION_KEYS.includes(key)) {
            setIsChecked(!isChecked);
        }
    }

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
                    <label htmlFor={id}>{label}
                        <input
                            {...extraAttributes}
                            required={isRequired}
                            className={style.Checkbox}
                            checked={isChecked}
                            onKeyDown={onKeyDown}
                            onChange={onChange}
                            type="checkbox"
                            name={id}
                            id={id} />

                        {
                            isRequired &&
                            <small>
                                (campo obrigatório)
                            </small>
                        }
                    </label>
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
}

export default Checkbox;