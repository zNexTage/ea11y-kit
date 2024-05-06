import PropTypes from "prop-types";
import { useEffect } from "react";
import baseStyle from "../../Base.module.css";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import style from "../textbox/Textbox.module.css";
import ComponentErrorList from "../../../components/component-error-list";

/**
 * @typedef Month
 * @property {string} id
 * @property {string} label
 * @property {string} name
 * @property {boolean} isRequired
 * @property {HTMLInputElement|null} extraAttributes
 */


/**
 * Campo de entrada para mês e ano configurado com as diretrizes do eMAG
  * Diretrizes adotadas:
 * 
 * Recomendação 4.4 – Possibilitar que o elemento com foco seja visualmente evidente
 * - Ao receber foco é aplicado uma borda vermelha de 2px do tipo solid no campo de texto.
 * Além da borda, foi reforçado o destaque do componente através do atributo outline.
 * 
 * Recomendação 6.5 – Fornecer instruções para entrada de dados: 
 *  - Para os campos obrigatórios é adicionado a informação *campo obrigatório* a frente da label para que leitores de telas possam comunicar ao usuário que o campo precisa ser preenchido;
 * 
 * O componente é renderizado apenas se estiver de acordo com as diretrizes do eMAG. Caso não esteja,
 * será renderizado uma lista contendo quais diretrizes foram violadas.
 * 
 *  
 * @param {Month} props
 */
const Month = ({ id, label, name, isRequired = false, extraAttributes }) => {
    const violations = useFieldValidations(label, id);

    useEffect(() => {
        if (extraAttributes?.type) {
            console.warn("Não é possível alterar o tipo do componente Month");
        }
    }, []);

    return (
        <>
            {
                violations.length == 0 &&
                <div>
                    <label htmlFor={id}>
                        {isRequired ? <>{label}&nbsp;<small>(campo obrigatório)</small></> : label}
                    </label>
                    <input
                        {...extraAttributes}
                        type="month"
                        name={name}
                        className={`${baseStyle.Highlight} ${style.textbox} ${extraAttributes?.className}`}
                        id={id}
                        pattern="[0-9]{4}-[0-9]{2}"
                        required={isRequired}
                    />
                </div>
            }
            {
                violations.length > 0 && <ComponentErrorList errors={violations} />
            }
        </>
    )
}

Month.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    extraAttributes: PropTypes.object
}

export default Month;