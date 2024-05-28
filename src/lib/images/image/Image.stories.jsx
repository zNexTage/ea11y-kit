import React from "react";
import Image from "./Image";

export default {
    title: "Imagem (Image)",
    component: Image,
    tags: ['autodocs'],
}

/**
 * A imagem é renderizada apenas quando o atributo alt é especificado
 */
export const AccordingToGuidelines = () => (
    <Image
        src='https://saopauloparacriancas.com.br/wp-content/uploads/2017/09/SPPC-Paranapiacaba-600x400.jpeg'
        alt='Vista panorâmica de Paranapiacaba com céu azul e casas de estilo colonial'
    />
);

AccordingToGuidelines.storyName = "Conformidade com as diretrizes do eMAG"

/**
 * Omitir o atributo alt fará ser demonstrado um alerta.
 */
export const NonCompliace = {
    component: Image
};
NonCompliace.storyName = "Inconformidade com as diretrizes do eMAG";