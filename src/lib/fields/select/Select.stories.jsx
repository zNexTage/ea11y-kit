import React from "react";
import Select from "./Select";


export default {
    title: "Seleção (Select)",
    component: Select,
    tags: ['autodocs'],
}

/**
 * O componente é renderizado apenas quando estiver em conformidade com as diretrizes do eMAG,
 * ou seja, quando todos os parâmetros forem passados corretamente.
 */
export const AccordingToGuidelines = () => (<Select
    id="selecao_ano"
    label="Selecione um ano"
    name="selecao_ano"
    options={[
        { text: '2022', value: 2022 },
        { text: '2023', value: 2023 },
        { text: '2024', value: 2024 },
        { text: '2025', value: 2025 },
    ]}
/>);

AccordingToGuidelines.storyName = "Conformidade com as diretrizes do eMAG"

/**
 * Será listado todas as diretrizes violadas caso haja alguma inconformidade com as diretrizes do eMAG. 
 */
export const NonCompliace = {
    component: Select
};
NonCompliace.storyName = "Inconformidade com as diretrizes do eMAG";