import { useState } from "react";
import ComponentErrorList from "../../../components/component-error-list";
import baseStyle from "../../Base.module.css";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import style from "./Range.module.css";

/**
 * @typedef RangeProps
 * @property {string} id
 * @property {string} label
 * @property {string} name
 * @property {boolean} isRequired
 * @property {number} min
 * @property {number} max
 * @property {number} value
 * @property {number} step
 */


/**
 * Campo range configurado com as diretrizes do eMAG. 
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
 * O componente é renderizado apenas se estiver de acordo com as diretrizes do eMAG. Caso não esteja,
 * será renderizado uma lista contendo quais diretrizes foram violadas.
 *   
 * @param {RangeProps} props 
 * @returns 
 */
const Range = ({ id, label, name, min = 0, max = 100, step = 1, value }) => {
    const violations = useFieldValidations(label, id);

    /**
     * Obtém o valor inicial do range
     * @returns {Number}
     */
    const getDefaultValue = () => {
        // Se for value informado via parâmetro é valido, utiliza como valor padrão.
        if (value && (value >= min && value <= max)) {
            return value; 
        }

        // Se o valor minímo informado é menor que o valor máximo, utiliza o valor mínimo como 
        // padrão
        // Ref: https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input/range#value
        if (max < min) {
            return min;
        } else {
            return min + (max - min) / 2;
        }
    }

    const [currentValue, setCurrentValue] = useState(getDefaultValue());

    /**
     * Obtém o valor atual do Range
     * 
     * @param {Event} event 
     */
    const onChange = event => {
        setCurrentValue(event.target.value);
    }

    return (
        <>

            {violations.length == 0 &&
                <div>
                    <label className={style.RangeLabel} htmlFor={id}>
                        {label}
                    </label>

                    <input
                        type="range"
                        name={name}
                        id={id}
                        min={min}
                        max={max}
                        step={step}
                        value={currentValue}
                        onChange={onChange}
                        className={baseStyle.Highlight}
                    />
                    <br />
                    <small>
                        Valor atual: {currentValue}
                    </small>
                </div>
            }

            {violations.length > 0 && <ComponentErrorList errors={violations} />}
        </>
    )
}

export default Range;