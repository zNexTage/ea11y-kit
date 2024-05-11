import React from "react";
import Range from "./Range";

export default {
    title: "Range",
    component: Range,
    tags: ['autodocs'],
}

/**
 * O componente é renderizado apenas quando estiver em conformidade com as diretrizes do eMAG,
 * ou seja, quando todos os parâmetros forem passados corretamente.
 */
export const AccordingToGuidelines = () => (
    <Range
        id="volume"
        label="Volume"
    />
);

AccordingToGuidelines.storyName = "Conformidade com as diretrizes do eMAG"

/**
 * Será listado todas as diretrizes violadas caso haja alguma inconformidade com as diretrizes do eMAG. 
 */
export const NonCompliace = {
    component: Range
};
NonCompliace.storyName = "Inconformidade com as diretrizes do eMAG";

export const VerticalRange = () => (
    <Range
        id="volume"
        label="Volume"
        orientation="vertical"
    />
);
VerticalRange.storyName = "Orientação vertical"