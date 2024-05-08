import React from "react";
import RadioButton from "./RadioButton";

export default {
    title: "Botão de seleção (Radio Button)",
    component: RadioButton,
    tags: ['autodocs'],
}

/**
 * O componente é renderizado apenas quando estiver em conformidade com as diretrizes do eMAG,
 * ou seja, quando todos os parâmetros forem passados corretamente.
 */
export const AccordingToGuidelines = () => (
    <>
        <RadioButton
            id="rbHarryPotter"
            label="Harry Potter"
            name="filme"
        />

        <RadioButton
            id="rbSenhorDosAneis"
            label="Senhor dos anéis"
            name="filme"
        />
    </>
);

AccordingToGuidelines.storyName = "Conformidade com as diretrizes do eMAG"

/**
 * Será listado todas as diretrizes violadas caso haja alguma inconformidade com as diretrizes do eMAG. 
 */
export const NonCompliace = {
    component: RadioButton
};
NonCompliace.storyName = "Inconformidade com as diretrizes do eMAG";