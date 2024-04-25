import React from "react";
import UploadField from "./UploadField";

export default {
    title: "Campo de anexo",
    component: UploadField,
    tags: ['autodocs'],
}

/**
 * O componente é renderizado apenas quando estiver em conformidade com as diretrizes do eMAG,
 * ou seja, quando todos os parâmetros forem passados corretamente.
 */
export const AccordingToGuidelines = () => (
    <UploadField
        accept="image/jpeg, image/png"
        acceptDescription="Envie imagens no formato jpg e png"
        id="foto"
        isRequired
        multiple
        label="Anexe sua foto"
    />
);
AccordingToGuidelines.storyName = "Conformidade com as diretrizes do eMAG";

/**
 * Será listado todas as diretrizes violadas caso haja alguma inconformidade com as diretrizes do eMAG. 
 */
export const NonCompliace = {
    component: UploadField
};
NonCompliace.storyName = "Inconformidade com as diretrizes do eMAG";

