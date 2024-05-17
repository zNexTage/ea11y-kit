import { renderHook } from "@testing-library/react";
import useTotalWeeksInYear from "./useTotalWeeksInYear";

describe("[useTotalweeksInYear] - Verificando o cálculo de obter o total de semanas em um determinado ano", () => {
    test("Deverá retornar 53 para anos que terminam na quinta ou onde o ano - 1 (vulgo ano passado) termina numa quarta.", () => {
        const years = [
            2004,
            2009,
            2015,
            2020,
            2026,
            2032,
            2037,
            2043,
            2048
        ];

        const { result } = renderHook(() => {
            return useTotalWeeksInYear()
        });

        years.forEach(year => expect(result.current.getTotalWeeksInYear(year)).toBe(53));
    });

    test("Deverá retornar 52 para anos que não terminam na quinta ou onde o ano - 1 (vulgo ano passado) não termina numa quarta", () => {
        const years = [
            2000,
            2001,
            2002,
            2003,
            2005,
            2006,
            2007,
            2008,
            2010,
            2011,
            2012,
            2013,
            2014,
            2016,
            2017,
            2018,
            2019,
            2021,
            2022,
            2023,
            2025,
            2027,
            2028,
            2029,
            2030,
            2031,
            2033,
        ];

        const { result } = renderHook(() => {
            return useTotalWeeksInYear()
        });

        years.forEach(year => {
            expect(result.current.getTotalWeeksInYear(year)).toBe(52)
        });
    });
})