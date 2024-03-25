import PropTypes from "prop-types";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import { useEffect, useState } from "react";
import style from "./Checkbox.module.css";

const ENTER_KEYS = ['Enter', 'NumpadEnter'];

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
const CheckboxBase = ({
    id,
    label,
    isRequired,
    extraAttributes
}) => {
    const [isChecked, setIsChecked] = useState(false);

    /**
     * Diretriz do eMAG:
     * Recomendação 2.1 - Disponibilizar todas as funções da página via teclado
     * 
     * Possibilita marcar/desmarcar o Checkbox através da tecla Enter.     
     * 
     * @param {KeyboardEvent} event 
     */
    const onKeyDown = event => {
        const key = event.key;

        //  verifica se foi pressionado a tecla Enter.
        if (ENTER_KEYS.includes(key)) {
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
    )
}

/**
 * 
 * @param {CheckboxProps} props 
 * @returns 
 */
const Checkbox = ({
    id,
    label,
    isRequired = false,
    ...extraAttributes }) => {
    return (
        <ErrorBoundary fallbackRender={ErrorComponent}>
            <CheckboxBase
                id={id}
                label={label}
                isRequired={isRequired}
                {...extraAttributes} />
        </ErrorBoundary>
    )
}

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
}

export default Checkbox;