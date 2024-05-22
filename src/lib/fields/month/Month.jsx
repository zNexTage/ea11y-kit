import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import baseFieldStyle from "../BaseField.module.css";
import baseStyle from "../../Base.module.css";
import ComponentErrorList from "../../../components/component-error-list";
import Select from "../select/Select";

/*
Normaliza os números dos meses de acordo com o formato usado pelo input month padrão.
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/month#handling_browser_support
*/
const MONTHS = [
    { text: "Janeiro", number: "01" },
    { text: "Fevereiro", number: "02" },
    { text: "Março", number: "03" },
    { text: "Abril", number: "04" },
    { text: "Maio", number: "05" },
    { text: "Junho", number: "06" },
    { text: "Julho", number: "07" },
    { text: "Agosto", number: "08" },
    { text: "Setembro", number: "09" },
    { text: "Outubro", number: "10" },
    { text: "Novembro", number: "11 " },
    { text: "Dezembro", number: "12" }
];

/**
 * @typedef FallbackMonthProps
 * @property {string} id
 * @property {string} name
 * @property {string} label
 * @property {boolean} required
 * @property {number} yearRange
 */

/**
 * @typedef MonthProps
 * @property {string} id
 * @property {string} label
 * @property {string} name
 * @property {boolean} isRequired
 * @property {HTMLInputElement|null} extraAttributes
 */


/**
 * Caso o navegador não suporte o campos de entrada com o tipo Month,
 * é utilizado como "fallback"  um select para selecionar o mês e um select para selecionar o ano
 * Diretrizes adotadas:
 * 
 * Recomendação 4.4 – Possibilitar que o elemento com foco seja visualmente evidente
 * - Ao receber foco é aplicado uma borda vermelha de 2px do tipo solid no campo de texto.
 * Além da borda, foi reforçado o destaque do componente através do atributo outline.
 * 
 * Recomendação 6.2 – Associar etiquetas aos seus campos: 
 *  - O atributo id é obrigatório, e é utilizado para vincular a label ao campo de texto e identificar o input;
 * 
 * Recomendação 6.5 – Fornecer instruções para entrada de dados: 
 *  - Para os campos obrigatórios é adicionado a informação *campo obrigatório* a frente da label para que leitores de telas possam comunicar ao usuário que o campo precisa ser preenchido;
 * 
 * O componente é renderizado apenas se estiver de acordo com as diretrizes do eMAG. Caso não esteja,
 * será renderizado uma lista contendo quais diretrizes foram violadas. 
 * referência: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/month#handling_browser_support
 *  
 * @param {FallbackMonthProps} props
 */
export const FallbackMonth = ({ required, id, yearRange = 40, name, label }) => {
    // Obtém os anos anteriores com base no parâmetro range    
    const getYears = (range) => {
        const currentYear = new Date().getFullYear();

        const years = [currentYear];

        for (let i = 1; i <= range; i++) {
            years.push(currentYear - i);
        }

        return years;
    }

    const years = getYears(yearRange);
    const [year, setYear] = useState(years[0]);
    const [month, setMonth] = useState(MONTHS[0]);

    const violations = useFieldValidations(label, id);

    /**
     * Obtém o ano selecionado
     * @param {React.ChangeEvent<HTMLInputElement>} event
     */
    const onChangeYear = event => {
        setYear(event.target.value);
    }

    /**
     * Obtém o mês selecionado
     * @param {React.ChangeEvent<HTMLInputElement>} event 
     */
    const onChangeMonth = event => {
        const monthNumber = event.target.value;
        const selectedMonth = MONTHS.find(month => month.number === monthNumber);

        setMonth(selectedMonth);
    }

    return (
        <>
            {
                violations.length === 0 &&
                <div>
                    <p>
                        {label}
                    </p>
                    <div className={baseStyle.fallbackContainer}>
                        <Select
                            required={required}
                            label="Mês"
                            id={`fallback_month_${id}`}
                            name={`fallback_month_${name}`}
                            extraAttributes={{
                                onChange: onChangeMonth
                            }}
                        >
                            {MONTHS.map((m, index) => <option value={m.number}>{m.text}</option>)}
                        </Select>
                        <Select
                            label="Ano"
                            required={required}
                            id={`fallback_year_${id}`}
                            name={`fallback_year_${name}`}
                            extraAttributes={{
                                onChange: onChangeYear
                            }}
                        >
                            {years.map((y, index) => <option value={y}>{y}</option>)}
                        </Select>

                        {/*
              Normaliza o valor para que seja enviado para o submit o formato que o input month mandaria por padrão.            
                 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/month#handling_browser_support
            */}
                        <input type="hidden" value={`${year}-${month.number}`} name={name} />
                    </div>
                </div>
            }
            {
                violations.length > 0 &&
                <ComponentErrorList errors={violations} />
            }
        </>
    )
}

/**
 * Campo de entrada para mês e ano configurado com as diretrizes do eMAG
  * Diretrizes adotadas:
 * 
 * Recomendação 4.4 – Possibilitar que o elemento com foco seja visualmente evidente
 * - Ao receber foco é aplicado uma borda vermelha de 2px do tipo solid no campo de texto.
 * Além da borda, foi reforçado o destaque do componente através do atributo outline.
 * 
 * Recomendação 6.2 – Associar etiquetas aos seus campos: 
 *  - O atributo id é obrigatório, e é utilizado para vincular a label ao campo de texto e identificar o input;
 * 
 * Recomendação 6.5 – Fornecer instruções para entrada de dados: 
 *  - Para os campos obrigatórios é adicionado a informação *campo obrigatório* a frente da label para que leitores de telas possam comunicar ao usuário que o campo precisa ser preenchido;
 * 
 * O componente é renderizado apenas se estiver de acordo com as diretrizes do eMAG. Caso não esteja,
 * será renderizado uma lista contendo quais diretrizes foram violadas. 
 * 
 * Caso o navegador não suporte o campos de entrada com o tipo Month,
 * é utilizado como "fallback"  um select para selecionar o mês e um select para selecionar o ano, conforme demonstrado
 * no exemplo da MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/month#handling_browser_support
 * 
 * @param {MonthProps} props
 */
const Month = ({ id, label, name, isRequired = false, extraAttributes }) => {
    // FIXME: passar para o componente Fallback o yearRange.

    const violations = useFieldValidations(label, id);
    const [errors, setErrors] = useState([]);

    const field = useRef();

    const [isBrowserSupportsTypeMonth, setIsBrowserSupportsTypeMonth] = useState(true);

    useEffect(() => {
        const errors = [...violations];

        if (extraAttributes?.type) {
            console.warn("Não é possível alterar o tipo do componente Month");
        }

        // Quando o navegador não suporta o type month, ele define o tipo para text.
        setIsBrowserSupportsTypeMonth(field.current?.type == "month");

        setErrors([...errors]);
    }, []);

    return (
        <>
            {
                errors.length == 0 &&
                <>
                    {
                        isBrowserSupportsTypeMonth ?
                            <div>
                                <label htmlFor={id}>
                                    {/* TODO: Colocar na frente da label (mês/ano)? */}
                                    {label}{isRequired ? <small>&nbsp;(campo obrigatório)</small> : label}
                                </label>
                                <input
                                    ref={field}
                                    {...extraAttributes}
                                    type="month"
                                    name={name}
                                    className={`${baseFieldStyle.field} ${extraAttributes?.className}`}
                                    id={id}
                                    pattern="[0-9]{4}-[0-9]{2}"
                                    required={isRequired}
                                />
                            </div>
                            :
                            <FallbackMonth
                                id={id}
                                name={name}
                                label={label}
                                isRequired
                            />
                    }
                </>
            }

            {
                errors.length > 0 && <ComponentErrorList errors={errors} />
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