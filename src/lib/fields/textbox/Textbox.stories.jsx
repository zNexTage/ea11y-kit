import React from "react";
import Textbox from "./Textbox";

export default {
    title: "Caixa de texto (Textbox)",
    component: Textbox,
    tags: ['autodocs'],
}

/**
 * O componente é renderizado apenas quando estiver em conformidade com as diretrizes do eMAG,
 * ou seja, quando todos os parâmetros forem passados corretamente.
 */
export const AccordingToGuidelines = () => (<Textbox
    id="txtNome"
    label="Nome"
    name="nome"
    placeholder="Digite o nome aqui..."
    type="text"
/>);

AccordingToGuidelines.storyName = "Conformidade com as diretrizes do eMAG"

/**
 * Será listado todas as diretrizes violadas caso haja alguma inconformidade com as diretrizes do eMAG. 
 */
export const NonCompliace = {
    component: Textbox
};
NonCompliace.storyName = "Inconformidade com as diretrizes do eMAG";