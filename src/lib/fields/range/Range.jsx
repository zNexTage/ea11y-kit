import { useState } from "react";
import ComponentErrorList from "../../../components/component-error-list";
import baseStyle from "../../Base.module.css";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import PropTypes from "prop-types";
import style from "./Range.module.css";

/**
 * @typedef RangeProps
 * @property {string} id 
 * @property {string} label
 * @property {string} name
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
     * Obtém o valor inicial do range.
     * 
     * O valor padrão está entre o mínimo e o máximo especificados, a menos que o valor máximo seja menor que o mínimo, caso em que o padrão é definido como o atributo de valor mínimo
     * Ref: https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input/range#value
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
                        // TODO: Verificar se é necessário utilizar os atributos abaixo
                        // aria-valuemin={min}
                        // aria-valuemax={max}
                        // aria-valuenow={currentValue}
                        value={currentValue}
                        onChange={onChange}
                        className={baseStyle.Highlight}
                        aria-describedby={`${id}_value`} // Esse componente está vinculado ao <small> que demonstra o valor atual.
                    />
                    <br />
                    <small
                        id={`${id}_value`}
                        aria-live="polite"
                        aria-description={`Valor atual do campo ${label}`}
                        aria-controls={id} // Esse elemento é controlado pelo Range
                    >
                        Valor atual: {currentValue}
                    </small>
                </div>
            }

            {violations.length > 0 && <ComponentErrorList errors={violations} />}
        </>
    )
}

Range.propTypes = {
    id: PropTypes.string.isRequired, //Teste
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    max: PropTypes.number,
    value: PropTypes.number,
    step: PropTypes.number
}

export default Range;