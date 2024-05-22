import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import baseFieldStyle from "../BaseField.module.css";
import baseStyle from "../../Base.module.css";
import ComponentErrorList from "../../../components/component-error-list";
import RequiredAttribute from "../../../exceptions/RequiredAttribute";
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
 * @typedef MonthField
 * @property {string} id
 * @property {string} label
 * 
 * @typedef YearField
 * @property {string} id
 * @property {string} label
 * @property {number} range
 * 
 * @typedef FallbackMonthProps
 * @property {MonthField} monthField
 * @property {YearField} yearField
 * @property {string} name
 * @property {boolean} required
 */

/**
 * @typedef MonthProps
 * @property {string} id
 * @property {string} label
 * @property {string} name
 * @property {boolean} isRequired
 * @property {HTMLInputElement|null} extraAttributes
 * @property {FallbackMonthProps} fallbackMonthProps
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
 *  * 
 * @param {FallbackMonthProps} props
 */
export const FallbackMonth = ({ required, monthField, yearField, name }) => {
    //TODO: Realizar testes

    // Obtém os anos anteriores com base no parâmetro range
    const getYears = (range = 40) => {
        const currentYear = new Date().getFullYear();

        const years = [currentYear];

        for (let i = 1; i <= range; i++) {
            years.push(currentYear - i);
        }

        return years;
    }

    const years = getYears(yearField?.range);
    const [year, setYear] = useState(years[0]);
    const [month, setMonth] = useState(MONTHS[0]);

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
        <div className={baseStyle.fallbackContainer}>
            <Select
                required={required}
                label={monthField.label}
                id={monthField.id}
                name={`mes_${name}`}
                extraAttributes={{
                    onChange: onChangeMonth
                }}
            >
                {MONTHS.map((m, index) => <option value={m.number}>{m.text}</option>)}
            </Select>
            <Select
                label={yearField.label}
                required={required}
                id={yearField.id}
                name={`ano_${name}`}
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
 * TODO: Garantir que o valor do campo seja o mesmo que teria se fosse um campo do tipo month
 * 
 * @param {MonthProps} props
 */
const Month = ({ id, label, name, isRequired = false, extraAttributes, fallbackMonthProps = null }) => {
    const violations = useFieldValidations(label, id);
    const [errors, setErrors] = useState([]);

    const monthViolations = useFieldValidations(fallbackMonthProps?.monthField?.id, fallbackMonthProps?.monthField?.label);
    const yearViolations = useFieldValidations(fallbackMonthProps?.yearField?.id, fallbackMonthProps?.yearField?.label);

    const field = useRef();

    const [isBrowserSupportsTypeMonth, setIsBrowserSupportsTypeMonth] = useState(true);

    useEffect(() => {
        const errors = [...violations];

        if (extraAttributes?.type) {
            console.warn("Não é possível alterar o tipo do componente Month");
        }

        if (!fallbackMonthProps) {
            errors.push(new RequiredAttribute("Atenção! Informe a prop fallbackMonthProps. Os valores definidos em fallbackMonthProps serão utilizados no componente FallbackMonth quando o navegador não suportar o tipo 'month'"));
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
                                {...fallbackMonthProps}
                                name={name}
                                isRequired
                            />
                    }
                </>
            }

            {
                errors.length > 0 && <ComponentErrorList errors={errors} />
            }

            {
                monthViolations.length > 0 && <>
                    <ComponentErrorList errors={monthViolations} />
                    <p>
                        O tipo `month`, que é utilizado no componente Month, não é suportado em alguns navegadores. Para que o componente funcione na maioria dos navegadores,
                        foi estabelecido um <b>componente fallback</b> que é utilizando quando o navegador não oferece suporte. Em situações onde o navegador não suporta o `month` será
                        renderizado um select para selecionar os meses e um outro select para selecionar os anos.
                        Para que esse componente funcione corretamente, é necessário que seja informado a prop <b>fallbackMonthProps</b>.

                        <b>fallbackMonthProps</b> é um objeto e permite configurar os select do mês e do ano, permitindo informar uma label customizada, id e name para os campos.
                        Dentro de <b>fallbackMonthProps</b>, há o atributo <b>monthField</b> que configura o select do mês. Você está vendo esta mensagem porque omitiu <b>monthField</b> ou algum atributo deste objeto.
                    </p>
                </>
            }

            {
                yearViolations.length > 0 && <>
                    <ComponentErrorList errors={yearViolations} />
                    <p>
                        O tipo `month`, que é utilizado no componente Month, não é suportado em alguns navegadores. Para que o componente funcione na maioria dos navegadores,
                        foi estabelecido um <b>componente fallback</b> que é utilizando quando o navegador não oferece suporte. Em situações onde o navegador não suporta o `month` será
                        renderizado um select para selecionar os meses e um outro select para selecionar os anos.
                        Para que esse componente funcione corretamente, é necessário que seja informado a prop <b>fallbackMonthProps</b>.

                        <b>fallbackMonthProps</b> é um objeto e permite configurar os select do mês e do ano, permitindo informar uma label customizada, id e name para os campos.
                        Dentro de <b>fallbackMonthProps</b>, há o atributo <b>yearField</b> que configura o select do mês. Você está vendo esta mensagem porque omitiu <b>yearField</b> ou algum atributo deste objeto.
                    </p>
                </>
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