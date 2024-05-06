import React from "react";
import Month from "./Month";

export default {
    title: "Caixa de mês e ano (Month)",
    component: Month,
    tags: ['autodocs'],
}

/**
 * O componente é renderizado apenas quando estiver em conformidade com as diretrizes do eMAG,
 * ou seja, quando todos os parâmetros forem passados corretamente.
 */
export const AccordingToGuidelines = () => (
    <Month
        id="txtMesAnoAniversario"
        label="Mês/ano de aniversário"
        name="mes_ano"
    />
);

AccordingToGuidelines.storyName = "Conformidade com as diretrizes do eMAG"

/**
 * Será listado todas as diretrizes violadas caso haja alguma inconformidade com as diretrizes do eMAG. 
 */
export const NonCompliace = {
    component: <Month />
};
NonCompliace.storyName = "Inconformidade com as diretrizes do eMAG";