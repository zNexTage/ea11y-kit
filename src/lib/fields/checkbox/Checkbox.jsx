import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import ComponentErrorList from "../../../components/component-error-list";
import { fieldHightlight } from "../shared-styles/Field.style";
import { lightTheme } from "../../../stitches.config";
import { styled } from "@stitches/react";

/**
 *  @typedef CheckboxProps
 *  @property {import("@stitches/react").CSS} css
 */

/**
 * @typedef {CheckboxProps & React.HTMLProps<HTMLInputElement>} ExtendedCheckboxProps
 */

const CheckboxStyled = styled("input", {});

/**
 * Campo selecionavel configurado com as diretrizes do eMAG. 
 * 
 * Diretrizes adotadas:
 * 
 * - Recomendação 2.1 - Disponibilizar todas as funções da página via teclado: É possível selecionar e remover a seleção
 * através da tecla espaço.
 * 
 * - Recomendação 4.4 – Possibilitar que o elemento com foco seja visualmente evidente
 *  - Ao receber foco é aplicado uma borda vermelha de 2px do tipo solid no checkbox.
 * Além da borda, foi reforçado o destaque do componente através do atributo outline.
 *  
 * - Recomendação 6.2 – Associar etiquetas aos seus campos: 
 *  - O atributo id é obrigatório, e é utilizado para vincular a label ao checkbox e identificar o input;
 * 
 * @param {ExtendedCheckboxProps} props 
 * @returns 
 */
const Checkbox = ({
    id,
    label,
    css,
    name,
    type = "checkbox",
    onChange,
    checked,
    ...rest
}) => {
    const [isChecked, setIsChecked] = useState(checked || false);

    const violations = useFieldValidations(label, id);

    /**
     * Marca/desmarca o checkbox através da interação pelo mouse.
     * @param {MouseEvent} event 
     */
    const onChangeCheckbox = event => {
        setIsChecked(!isChecked);

        onChange && onChange(event);
    }


    useEffect(() => {

        if (type !== "checkbox") {
            console.warn(`Não é possível alterar atributo type do Checkbox.`);
        }

    }, [type, name]);


    return (
        <>
            {violations.length == 0 &&
                <div>
                    <label htmlFor={id}>
                        {label}
                    </label>
                    <CheckboxStyled
                        {...rest}
                        role="checkbox"
                        className={`${lightTheme} ${fieldHightlight}`}
                        css={css}
                        checked={isChecked}
                        onChange={onChangeCheckbox}
                        type="checkbox"
                        name={name}
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
    css: PropTypes.object,
    checked: PropTypes.bool
}

export default Checkbox;