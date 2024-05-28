import React from "react";
import Image from "./Image";
import Figure from "./Figure";

export default {
    title: "Figure",
    component: Figure,
    tags: ['autodocs'],
}

/**
 * A imagem é renderizada apenas quando o atributo alt é especificado
 */
export const AccordingToGuidelines = () => (
    <Figure
        caption="Vista panorâmica da Vila de Paranapiacaba, um destino turístico conhecido por sua arquitetura histórica e belas paisagens naturais"
        imgProps={{
            src: 'https://saopauloparacriancas.com.br/wp-content/uploads/2017/09/SPPC-Paranapiacaba-600x400.jpeg',
            alt: 'Vista panorâmica de Paranapiacaba com céu azul e casas de estilo colonial'
        }}
    />
);

AccordingToGuidelines.storyName = "Conformidade com as diretrizes do eMAG"

/**
 * Omitir o atributo alt e/ou caption fará ser demonstrado um alerta.
 */
export const NonCompliace = {
    component: Figure
};
NonCompliace.storyName = "Inconformidade com as diretrizes do eMAG";