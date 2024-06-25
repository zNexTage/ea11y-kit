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
 * Recomendação 2.1 - Disponibilizar todas as funções da página via teclado
 * - Permite marcar e desmarcar um radio button através das teclas: espaço (comportamento nativo) e enter.
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
const RadioButton = ({ id, type, name, label, required = false, onKeyDown,  css, ...rest }) => {
    const violations = useFieldValidations(label, id);

    useEffect(() => {
        if (type) {
            console.warn("Não é possível alterar o type do componente Radio.");
        }
    }, []);

    return (
        <>
            {violations.length === 0 &&
                <div>
                    <label htmlFor={id}>
                        {label}{required && <>&nbsp;<small>(campo obrigatório)</small></>}
                    </label>
                    <RadioButtonStyled
                        {...rest}
                        className={`${lightTheme} ${fieldHightlight}`}
                        css={css}
                        type="radio"
                        name={name}
                        id={id}
                        required={required}
                    />
                </div>
            }

            {violations.length > 0 && <ComponentErrorList errors={violations} />}
        </>
    )
}


export default RadioButton;