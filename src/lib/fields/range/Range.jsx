import { useEffect, useState } from "react";
import ComponentErrorList from "../../../components/component-error-list";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import PropTypes from "prop-types";
import { fieldHightlight } from "../shared-styles/Field.style";
import baseTheme, { lightTheme } from "../../../stitches.config";
import { styled } from "@stitches/react";

const RANGE_ORIENTATION_HORIZONTAL = 'horizontal';
const RANGE_ORIENTATION_VERTICAL = 'vertical';

/**
 * @typedef RangeProps
 * @property {string} id 
 * @property {string} label
 * @property {string} name
 * @property {number} min
 * @property {number} max
 * @property {number} value
 * @property {number} step
 * @property {(event)=>void|null} onChange
 * @property {'horizontal'|'vertical'} orientation
 * @property {import("@stitches/react").CSS} css
 */

const RangeStyled = styled("input", {
    display: 'block',
    width: "100%"
});

/**
 * @typedef {RangeProps & HTMLInputElement} ExtendedRangeProps
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
 * @param {ExtendedRangeProps} props 
 * @returns 
 */
const Range = ({
    id,
    label,
    name,
    min = 0,
    max = 100,
    step = 1,
    value,
    onChange,
    css,
    orientation = RANGE_ORIENTATION_HORIZONTAL,
    ...rest
}) => {
    const violations = useFieldValidations(label, id);

    const rangeVerticalCss = baseTheme.css({
        writingMode: "vertical-lr"
    });

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
    const onChangeRange = event => {
        setCurrentValue(event.target.value);

        onChange && onChange(event);
    }

    // Sempre quando value mudar, invoca o método para validar o valor e atualizar o estado.
    useEffect(() => {
        setCurrentValue(getDefaultValue());
    }, [value]);

    return (
        <>

            {violations.length == 0 &&
                <div>
                    <label htmlFor={id}>
                        {label}
                    </label>

                    <RangeStyled
                        {...rest}
                        type="range"
                        name={name}
                        id={id}
                        min={min}
                        max={max}
                        step={step}
                        value={currentValue}
                        onChange={onChangeRange}
                        className={`${lightTheme} ${fieldHightlight} ${orientation === RANGE_ORIENTATION_VERTICAL && rangeVerticalCss} `}
                        css={css}
                    />
                </div>
            }

            {violations.length > 0 && <ComponentErrorList errors={violations} whichComponent="Range" />}
        </>
    )
}

Range.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    max: PropTypes.number,
    min: PropTypes.number,
    value: PropTypes.number,
    step: PropTypes.number,
    orientation: PropTypes.oneOfType([RANGE_ORIENTATION_HORIZONTAL, RANGE_ORIENTATION_VERTICAL]),
    css: PropTypes.object
}

export default Range;