import PropTypes from "prop-types";
import ComponentErrorList from "../../../components/component-error-list";
import RequiredAttribute from "../../../exceptions/RequiredAttribute";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import baseFieldStyle from "../BaseField.module.css";
import React, { useEffect, useRef, useState } from "react";
import useTotalWeeksInYear from "../../hooks/week/useTotalWeeksInYear";

/**
 * @typedef FallbackWeekField
 * 
 * @property {string} id
 * @property {string} name
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
 * TODO: Garantir que o valor do campo seja o mesmo que teria se fosse um campo do tipo week
 * 
 * @param {FallbackWeekProps} props
 * @returns 
 */
const FallbackWeek = ({
    yearOptions = [],
    weekField,
    yearField,
    required = false
}) => {

    /**
     * Obtém a lista de anos para montar o select.
     * @returns {Array<number>} Lista dos anos para montar o select
     */
    const getYears = () => {
        if (yearOptions.length > 0) {
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

    const weekViolations = useFieldValidations(weekField.label, weekField.id);
    const yearViolations = useFieldValidations(yearField.label, yearField.id);

    const orderedYears = getYears().sort().reverse();

    const { getTotalWeeksInYear } = useTotalWeeksInYear();

    const [weeks, setWeeks] = useState([]);

    useEffect(() => {
        const totalWeeks = getTotalWeeksInYear(orderedYears[0]);

        setWeeks(getWeeks(totalWeeks));
    }, []);

    /**
     * Ao trocar de ano, é calculado o total de semanas no ano selecionado.
     * @param {React.ChangeEvent<HTMLSelectElement>} event 
     */
    const onYearChange = event => {
        const totalWeeks = getTotalWeeksInYear(event.target.value);

        setWeeks(getWeeks(totalWeeks));
    }

    /**
     * Monta uma lista contendo os números da semana
     * @param {number} totalWeeks Utilizado fazer um laço para montar as opções do select.
     * @returns 
     */
    const getWeeks = totalWeeks => {
        const weeks = [];

        for (let week = 1; week <= totalWeeks; week++) {
            weeks.push(week);
        }

        return weeks;
    }

    return (
        <div>
            {
                yearViolations.length === 0 &&
                <div>
                    <label htmlFor={yearField.id}>
                        {yearField.label} {required && <small>(campo obrigatório)</small>}
                    </label>
                    <select
                        className={baseFieldStyle.field}
                        onChange={onYearChange}
                        name={yearField.name}
                        id={yearField.id}
                    >
                        {orderedYears.map((year) => (
                            <option
                                key={year}
                                value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            }
            {
                yearViolations.length > 0 &&
                <ComponentErrorList errors={yearViolations} />
            }

            {
                weekViolations.length === 0 &&
                <div>
                    <label htmlFor={weekField.id}>
                        {weekField.label} {required && <small>(campo obrigatório)</small>}
                    </label>
                    <select
                        className={baseFieldStyle.field}
                        name={weekField.name}
                        id={weekField.id}>
                        {weeks.map((week) => (
                            <option
                                key={week}
                                value={week}>
                                {week}
                            </option>
                        ))}
                    </select>
                </div>
            }

            {
                weekViolations.length > 0 &&
                <ComponentErrorList errors={weekViolations} />
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
 * TODO: Fornecer suporte para todos os navegadores: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/week#handling_browser_support
 * 
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
    required: PropTypes.bool
}

export default Week;