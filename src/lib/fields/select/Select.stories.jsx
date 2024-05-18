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
>
    <option value={2022}>2022</option>
    <option value={2023}>2023</option>
    <option value={2024}>2024</option>
    <option value={2025}>2025</option>
</Select>
);

AccordingToGuidelines.storyName = "Conformidade com as diretrizes do eMAG"

export const GroupedSelect = () => (
    <Select
        id="selecao_carro"
        label="Selecione um carro"
        name="selecao_carro"
    >
        {/* Exemplo retirado de https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_optgroup */}
        <optgroup label="Carros Suecos">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
        </optgroup>
        <optgroup label="Carros Alemães">
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
        </optgroup>
    </Select>
);
GroupedSelect.storyName = "Agrupamento de opções"

export const MultipleSelect = () => (
    <Select
        id="selecao_carro"
        label="Selecione um carro"
        name="selecao_carro"
        extraAttributes={{
            multiple: true
        }}
    >

        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
    </Select>
);
MultipleSelect.storyName = "Múltipla seleção"

/**
 * Será listado todas as diretrizes violadas caso haja alguma inconformidade com as diretrizes do eMAG. 
 */
export const NonCompliace = {
    component: Select
};
NonCompliace.storyName = "Inconformidade com as diretrizes do eMAG";