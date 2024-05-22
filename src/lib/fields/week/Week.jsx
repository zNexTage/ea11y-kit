import PropTypes from "prop-types";
import ComponentErrorList from "../../../components/component-error-list";
import RequiredAttribute from "../../../exceptions/RequiredAttribute";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import baseFieldStyle from "../BaseField.module.css";
import React, { useEffect, useRef, useState } from "react";
import useTotalWeeksInYear from "../../hooks/week/useTotalWeeksInYear";
import baseStyle from "../../Base.module.css";
import Select from "../select";

/**
 * @typedef FallbackWeekField
 * 
 * @property {string} id
 * @property {string} label
 */

/** 
 * @typedef WeekProps
 * @property {string} id
 * @property {string} name
 * @property {string} label
 * @property {boolean} required
 * @property {FallbackWeekProps} fallbackWeekProps
 */

/**
 * @typedef FallbackWeekProps
 * @property {Array<number>?} yearOptions
 * @property {FallbackWeekField} weekField
 * @property {FallbackWeekField} yearField
 * @property {boolean} required
 * @property {string} name
 */

/**
 * Usa-se o este componente em situações onde o navegador não suporte o tipo 'week'
 * Ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/week#handling_browser_support
 * 
 * Diretrizes adotadas:
 * 
 * Recomendação 4.4 – Possibilitar que o elemento com foco seja visualmente evidente
 * - Ao receber foco é aplicado uma borda vermelha de 2px do tipo solid no campo de texto.
 * Além da borda, foi reforçado o destaque do componente através do atributo outline.
 * 
 * 
 *  Recomendação 6.2 – Associar etiquetas aos seus campos: 
 *  - O atributo id é obrigatório, e é utilizado para vincular a label ao campo de texto e identificar o input;
 * 
 * Recomendação 6.5 – Fornecer instruções para entrada de dados: 
 *  - Para os campos obrigatórios é adicionado a informação *campo obrigatório* a frente da label para que
 * leitores de telas possam comunicar ao usuário que o campo precisa ser preenchido;
 * 
 * Caso o navegador não suporte o campos de entrada com o tipo Week,
 * é utilizado como "fallback"  um select para selecionar o ano e um select para selecionar a semana, conforme demonstrado
 * no exemplo da MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/week#examples
 * 
 * Normaliza o valor para o formato yyyy-Www conforme demonstrado no exemplo da MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/week#handling_browser_support
 * 
 * @param {FallbackWeekProps} props
 * @returns 
 */
export const FallbackWeek = ({
    yearOptions = [],
    weekField,
    yearField,
    name,
    required = false
}) => {

    /**
     * Obtém a lista de anos para montar o select.
     * @returns {Array<number>} Lista dos anos para montar o select
     */
    const getYears = () => {
        if (!yearOptions || yearOptions.length > 0) {
            return yearOptions;
        }

        const years = [];
        const currentYear = new Date().getFullYear();

        for (let i = 0; i < 10; i++) {
            const year = currentYear - i;

            years.push(year);
        }

        return years;
    }

    //TODO: Validar propriedade name.

    const weekViolations = useFieldValidations(weekField.label, weekField.id);
    const yearViolations = useFieldValidations(yearField.label, yearField.id);

    // ordena os anos em ordem decrescente.
    const orderedYears = getYears().sort().reverse();

    const { getTotalWeeksInYear } = useTotalWeeksInYear();

    const [weeks, setWeeks] = useState([]);

    // os estados a seguir são utilizados em um input hidden. Em input hidden, o atributo value possui o valor normalizado da seleção do usuário
    // no formato nativo de um campo do tipo week.
    const [selectedYear, setSelectedYear] = useState();
    const [selectedWeek, setSelectedWeek] = useState({});

    useEffect(() => {
        const year = orderedYears[0];

        const totalWeeks = getTotalWeeksInYear(year);

        const weeks = getWeeks(totalWeeks);

        setWeeks(weeks);


        // Define os valores iniciais dos campos.
        setSelectedYear(year);
        setSelectedWeek(weeks[0]);
    }, []);

    /**
     * Ao trocar de ano, é calculado o total de semanas no ano selecionado. 
     * Além disso, é salvo no estado o ano selecionado
     * @param {React.ChangeEvent<HTMLSelectElement>} event 
     */
    const onYearChange = event => {
        const year = event.target.value;

        const totalWeeks = getTotalWeeksInYear(year);

        setWeeks(getWeeks(totalWeeks));

        setSelectedYear(year);
    }

    /**
     * Obtém a semana selecionada e salva no estado.
     * @param {React.ChangeEvent<HTMLSelectElement>} event 
     */
    const onWeekChange = event => {
        const { text, value } = weeks.find(w => w.value === event.target.value);

        setSelectedWeek({ text, value });
    }

    /**
     * Monta uma lista contendo os números da semana
     * @param {number} totalWeeks Utilizado fazer um laço para montar as opções do select.
     * @returns 
     */
    const getWeeks = totalWeeks => {
        const weeks = [];

        for (let week = 1; week <= totalWeeks; week++) {
            const value = 'W' + `${week}`.padStart(2, 0);
            weeks.push({ value, text: week });
        }

        return weeks;
    }

    const hasYearViolations = yearViolations.length > 0;
    const hasWeekViolations = weekViolations.length > 0

    return (
        <div className={baseStyle.fallbackContainer}>
            {
                !hasYearViolations &&
                <Select
                    extraAttributes={{
                        onChange: onYearChange
                    }}
                    required={required}
                    id={yearField.id}
                    name={`${name}_${yearField.id}`}
                    label={yearField.label}
                >
                    {orderedYears.map(year => (
                        <option value={year}>
                            {year}
                        </option>
                    ))}
                </Select>
            }
            {
                hasYearViolations &&
                <ComponentErrorList errors={yearViolations} />
            }

            {
                !hasWeekViolations &&
                <Select
                    extraAttributes={{
                        onChange: onWeekChange
                    }}
                    name={`${name}_${weekField.id}`}
                    id={weekField.id}
                    required={required}
                    label={weekField.label}

                >
                    {weeks.map((week) => (
                        <option
                            key={week.value}
                            value={week.value}>
                            {week.text}
                        </option>
                    ))}
                </Select>
            }

            {
                hasWeekViolations &&
                <ComponentErrorList errors={weekViolations} />
            }

            {/* para manter a compatabilidade com um input week, os valores selecionados pelo usuário são normalizados para o formato nativo de um input week.  */}
            {
                !hasYearViolations && !hasWeekViolations &&
                <input type="hidden" name={name} value={`${selectedYear}-${selectedWeek.value}`} />
            }
        </div>
    )
}



/**
 * Campo de entrada para informar uma semana configurado com as diretrizes do eMAG.
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
 * Recomendação 6.5 – Fornecer instruções para entrada de dados: 
 *  - Para os campos obrigatórios é adicionado a informação *campo obrigatório* a frente da label para que
 * leitores de telas possam comunicar ao usuário que o campo precisa ser preenchido;
 * 
 * @param {WeekProps} props 
 * @returns {React.JSX.Element}
 */
const Week = ({ id, label, name, required = false, fallbackWeekProps }) => {
    const [errors, setErrors] = useState([]);
    const violations = useFieldValidations(label, id);
    const [isBrowserSupportsTypeWeek, setIsBrowserSupportsTypeWeek] = useState(true);

    const weekRef = useRef();

    useEffect(() => {
        const errorsAux = [...violations];

        if (!name) {
            errorsAux.push(
                new RequiredAttribute(`É necessário especificar o nome (name) do campo. O atributo name é usado como referência quando os dados são enviados (https://www.w3schools.com/tags/att_name.asp).`)
            )
        }

        setErrors([...errorsAux]);

        if (weekRef.current?.type === 'text') {
            setIsBrowserSupportsTypeWeek(false);
        }
    }, [violations, name]);

    return (
        <>
            {errors.length === 0 &&
                <>
                    {isBrowserSupportsTypeWeek && <div>
                        <label htmlFor={id}>
                            {label} {required && <small>(campo obrigatório)</small>}
                        </label>

                        <input
                            ref={weekRef}
                            type="week"
                            name={name}
                            id={id}
                            className={baseFieldStyle.field}
                        />
                    </div>}

                    {!isBrowserSupportsTypeWeek &&
                        <FallbackWeek
                            weekField={fallbackWeekProps.weekField}
                            yearField={fallbackWeekProps.yearField}
                            yearOptions={fallbackWeekProps.yearOptions}
                            required={fallbackWeekProps.required}
                            name={name}
                        />
                    }
                </>
            }

            {errors.length > 0 && <ComponentErrorList errors={errors} />}
        </>
    )
}

Week.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    fallbackWeekProps: PropTypes.object.isRequired
}

export default Week;