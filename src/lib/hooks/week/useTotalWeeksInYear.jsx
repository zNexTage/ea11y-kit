/**
 * @typedef TotalWeeksInYearProps
 * @property {number} year
 */

/**
 * Obtém o total de semanas em um ano.  * 
 * Ref: 
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/week#handling_browser_support
 * https://en.wikipedia.org/wiki/ISO_week_date#Weeks_per_year
 * @param {TotalWeeksInYearProps} props
 */
const useTotalWeeksInYear = () => {
    const getDayOfWeekOfLastDateInYear = year => new Date(year, 11, 31).getDay();

    const getTotalWeeksInYear = year => {

        // obtém o dia da semana do último dia do ano
        const dayOfweekOfLastDateInYear = getDayOfWeekOfLastDateInYear(year);

        // obtém o dia da semana do último dia do ano anterior a year
        const dayOfWeekOfLastDatePreviousYear = getDayOfWeekOfLastDateInYear(year - 1);

        // se o ano year termina numa quinta ou se o ano year - 1 termina numa quarta,
        // year tem 53 semanas
        if (dayOfweekOfLastDateInYear === 4 || dayOfWeekOfLastDatePreviousYear === 3) {
            return 53;
        } else { //do contrário, 52 semanas
            return 52;
        }
    }

    return { getTotalWeeksInYear };
}

export default useTotalWeeksInYear;