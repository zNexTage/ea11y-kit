import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import ComponentErrorList from "../../../components/component-error-list";
import * as KeyboardKeys from "../../../utils/KeyboardCodes";
import { fieldHightlight } from "../shared-styles/Field.style";
import { lightTheme } from "../../../stitches.config";
import { styled } from "@stitches/react";

const INTERACTION_KEYS = [KeyboardKeys.ENTER, KeyboardKeys.NUMPAD_ENTER];
const FOCUS_OUT_KEYS = [KeyboardKeys.ARROW_DOWN, KeyboardKeys.ARROW_UP];

/**
 * @typedef RadioButtonProps
 * @property {import("@stitches/react").CSS} css
 */

/**
 * @typedef {RadioButtonProps & React.HTMLProps<HTMLInputElement>} ExtendedRadioButtonProps
 */

const RadioButtonStyled = styled("input", {});

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
 * @param {ExtendedRadioButtonProps} props
 * @returns 
 */
const RadioButton = ({ id, type, name, label, onKeyDown, onChange, checked, required = false, css, ...rest }) => {
    const violations = useFieldValidations(label, id);
    const [isChecked, setIsChecked] = useState(checked || false);

    useEffect(() => {
        if (type) {
            console.warn("Não é possível alterar o type do componente Radio.");
        }
    }, []);

    /**
     * Permite seleção e remoção de seleção via teclado.
     * @param {KeyboardEvent} event 
     */
    const onKeyDownRadioButton = event => {
        const key = event.code;

        //  verifica se foi pressionado a tecla Enter ou espaço.
        if (INTERACTION_KEYS.includes(key)) {
            setIsChecked(true);
        } else if (FOCUS_OUT_KEYS.includes(key)) { // caso tenha sido pressionada as setas, significa que o usuário vai navegar para o próximo Radio, portanto remove a seleção.
            setIsChecked(false);
        }

        onKeyDown && onKeyDown(event);
    }

    /**
     * Seleciona o radio
     * @param {Event} event 
     */
    const onChangeRadioButton = event => {
        setIsChecked(event.target.checked);

        onChange && onChange(event);
    }

    return (
        <>
            {violations.length === 0 &&
                <div>
                    <label htmlFor={id}>
                        {label}{required && <>&nbsp;<small>(campo obrigatório)</small></>}
                    </label>
                    <RadioButtonStyled
                        {...rest}
                        key={`${id}_${isChecked}`}
                        className={`${lightTheme} ${fieldHightlight}`}
                        css={css}
                        type="radio"
                        name={name}
                        id={id}
                        checked={isChecked}
                        onChange={onChangeRadioButton}
                        onKeyDown={onKeyDownRadioButton}
                        required={required}
                    />
                </div>
            }

            {violations.length > 0 && <ComponentErrorList errors={violations} />}
        </>
    )
}


export default RadioButton;