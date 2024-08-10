import { useEffect, useState } from "react";
import ComponentErrorList from "../../../helper-components/component-error-list";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import PropTypes from "prop-types";
import RequiredAttribute from "../../../exceptions/RequiredAttribute";
import { fieldCss, fieldHightlight } from "../shared-styles/Field.style";
import { lightTheme } from "../../../stitches.config";
import { styled } from "@stitches/react";


/**
 * @typedef SelectProps
 * @property {React.ReactNode} children
 * @property {import("@stitches/react").CSS} css
 */

/**
 * @typedef {SelectProps & React.HTMLProps<HTMLSelectElement>} ExtendedSelectProps
 */

const SelectStyled = styled("select", {});

/**
 * Campo de seleção configurado com as diretrizes do eMAG.
 * 
 * Diretrizes adotadas:
 * 
 * Recomendação 4.4 – Possibilitar que o elemento com foco seja visualmente evidente
 * - Ao receber foco é aplicado uma borda vermelha de 2px do tipo solid no campo de texto.
 * Além da borda, foi reforçado o destaque do componente através do atributo outline. * 
 * 
 * Recomendação 6.2 – Associar etiquetas aos seus campos: 
 *  - O atributo id é obrigatório, e é utilizado para vincular a label ao campo de texto e identificar o input;
 * 
 * Recomendação 6.5 – Fornecer instruções para entrada de dados: 
 *  - Para os campos obrigatórios é adicionado a informação *campo obrigatório* a frente da label para que
 * leitores de telas possam comunicar ao usuário que o campo precisa ser preenchido;
 * 
 * @param {ExtendedSelectProps} props
 * @returns {React.JSX.Element}
 */
const Select = ({
    id,
    label,
    name,
    required = false,
    children,
    css,
    ...rest
}) => {
    const [errors, setErrors] = useState([]);
    const violations = useFieldValidations(label, id);

    useEffect(() => {
        const errorsAux = [...violations];

        if (!name) {
            errorsAux.push(new RequiredAttribute("É necessário especificar o nome (name) do campo. O atributo name é usado como referência quando os dados são enviados (https://www.w3schools.com/tags/att_name.asp)."));
        }

        setErrors([...errorsAux]);
    }, [violations, name]);

    return (
        <>
            {errors.length === 0 &&
                <div>
                    <label htmlFor={id}>
                        {label} {required && <small>(campo obrigatório)</small>}
                    </label>
                    <SelectStyled
                        {...rest}
                        className={`${lightTheme} ${fieldCss} ${fieldHightlight}`}
                        css={css}
                        name={name}
                        id={id}
                    >
                        {
                            children
                        }
                    </SelectStyled>
                </div>
            }

            {errors.length > 0 && <ComponentErrorList errors={errors} whichComponent="Select" />}
        </>
    )
}

Select.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    css: PropTypes.object,
    children: PropTypes.node,
}

export default Select;