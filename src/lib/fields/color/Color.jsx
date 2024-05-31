import PropTypes from "prop-types";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import ComponentErrorList from "../../../components/component-error-list";
import { useEffect, useState } from "react";
import RequiredAttribute from "../../../exceptions/RequiredAttribute";
import { fieldHightlight } from "../shared-styles/Field.style";
import baseTheme, { lightTheme } from "../../../stitches.config";
import { styled } from "@stitches/react";

/**
 * @typedef ColorProps
 * @property {import("@stitches/react").CSS} css
 */

/**
 * @typedef {ColorProps & React.HTMLProps<HTMLInputElement>} ExtendedColorProps
 */


const ColorStyled = styled("input", {
    display: "block"
});

/**
 * Campo para seleção de cores
 * 
 * Recomendação 4.4 – Possibilitar que o elemento com foco seja visualmente evidente
 * - Ao receber foco é aplicado uma borda vermelha de 2px do tipo solid no campo de texto.
 * Além da borda, foi reforçado o destaque do componente através do atributo outline.
 * 
 * Recomendação 6.2 – Associar etiquetas aos seus campos: 
 *  - O atributo id é obrigatório, e é utilizado para vincular a label ao campo de texto e identificar o input;
 * 
 * Recomendação 6.5 – Fornecer instruções para entrada de dados: 
 *  - Para os campos obrigatórios é adicionado a informação *campo obrigatório* a frente da label para que
 * leitores de telas possam comunicar ao usuário que o campo precisa ser preenchido;
 * 
 * @param {ExtendedColorProps} props
 * @returns 
 */
const Color = ({
    id,
    name,
    label,
    required,
    css,
    type,
    ...rest
}) => {

    const [errors, setErrors] = useState([]);
    const violations = useFieldValidations(label, id);

    useEffect(() => {
        const errorsAux = [...violations];

        if (!name) {
            errorsAux.push(new RequiredAttribute("É necessário especificar o nome (name) do campo. O atributo name é usado como referência quando os dados são enviados (https://www.w3schools.com/tags/att_name.asp)."))
        }

        setErrors([...errorsAux]);

        if(!type){
            console.warn("Não é possível alterar o type do componente Color");
        }
    }, []);

    return (
        <>
            {
                errors.length === 0 &&
                <div>
                    <label htmlFor={id}>
                        {label} {required && <small>(campo obrigatório)</small>}
                    </label>
                    <ColorStyled
                        {...rest}
                        className={`${lightTheme} ${fieldHightlight}`}
                        css={css}
                        type="color"
                        name={name}
                        id={id}
                    />
                </div>
            }

            {
                errors.length > 0 &&
                <ComponentErrorList errors={errors} />
            }

        </>
    )
}

Color.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool
}

export default Color;