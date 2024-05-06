import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import baseStyle from "../../Base.module.css";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import style from "../textbox/Textbox.module.css";
import ComponentErrorList from "../../../components/component-error-list";
import RequiredAttribute from "../../../exceptions/RequiredAttribute";

const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

/**
 * @typedef MonthField
 * @property {string} id
 * @property {string} label
 * @property {string} name
 * 
 * @typedef YearField
 * @property {string} id
 * @property {string} label
 * @property {string} name
 * @property {number} range
 * 
 * @typedef FallbackMonthProps
 * @property {MonthField} monthField
 * @property {YearField} yearField
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
 * 
 * referência: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/month#handling_browser_support
 * @param {FallbackMonthProps} props
 */
const FallbackMonth = ({ isRequired, monthField, yearField }) => {
    // Obtém os anos anteriores com base no parâmetro range
    const getYears = (range = 40) => {
        const currentYear = new Date().getFullYear();

        const years = [currentYear];

        for (let i = 0; i <= range; i++) {
            years.push(currentYear - i);
        }

        return years;
    }

    const years = getYears(yearField?.range);

    return (
        <div>
            <span>
                <label htmlFor={monthField.id}>Mês:&nbsp;</label>
                <select required={isRequired} name={monthField.name} id={monthField.id}>
                    {
                        MONTHS.map((m, index) => <option value={index + 1}>{m}</option>)
                    }
                </select>
            </span>
            <span>
                <label for={yearField.id}>Ano:</label>
                <select required={isRequired} id={yearField.id} name={yearField.name}>
                    {
                        years.map(y => <option value={y}>{y}</option>)
                    }
                </select>
            </span>
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
                                    className={`${baseStyle.Highlight} ${style.textbox} ${extraAttributes?.className}`}
                                    id={id}
                                    pattern="[0-9]{4}-[0-9]{2}"
                                    required={isRequired}
                                />
                            </div>
                            :
                            <FallbackMonth
                                {...fallbackMonthProps}
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