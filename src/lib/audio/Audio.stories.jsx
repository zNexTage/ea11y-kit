import React from "react";
import Audio from "./Audio";

import SintelShort from "../../examples/audio/sintel-short.mp3";
import AudioCaptionBr from "../../examples/audio/sintel-br.vtt";
import AudioCaptionEn from "../../examples/audio/sintel-en.vtt";
import AudioCaptionDe from "../../examples/audio/sintel-de.vtt";
import AudioCaptionEs from "../../examples/audio/sintel-es.vtt";

export default {
    title: "Audio",
    component: Audio,
    tags: ['autodocs'],
}

/**
 * O componente é renderizado apenas quando estiver em conformidade com as diretrizes do eMAG,
 * ou seja, quando todos os parâmetros forem passados corretamente.
 */
export const AccordingToGuidelines = () => (
    <Audio
        sources={[
            {
                src: SintelShort,
                type: "audio/mp3"
            }
        ]}
        captionFile={{
            extension: ".txt",
            fileName: "Transcrição textual da demonstração do jogo Sintel",
            href: AudioCaptionEn,
            size: 1,
            unit: "KB"
        }}       

    />
);

AccordingToGuidelines.storyName = "Conformidade com as diretrizes do eMAG";

export const WithLegend = () => (
    <Audio
        sources={[
            {
                src: SintelShort,
                type: "audio/mp3"
            }
        ]}
        captionFile={{
            extension: ".txt",
            fileName: "Transcrição textual da demonstração do jogo Sintel",
            href: AudioCaptionEn,
            size: 1,
            unit: "KB"
        }}
        tracks={[
            {
                default: true,
                label: "Português (Brasil)",
                src: AudioCaptionBr,
                srcLang: "br"
            },
            {
                default: true,
                label: "Inglês",
                src: AudioCaptionEn,
                srcLang: "en"
            },
            {
                default: false,
                label: "Alemão",
                src: AudioCaptionDe,
                srcLang: "de"
            },
            {
                default: true,
                label: "Espanhol",
                src: AudioCaptionEs,
                srcLang: "es"
            },
        ]}
    />
)
WithLegend.storyName = "Com legendas";

/**
 * Omitir o atributo captionFile fará com o que seja demonstrado uma mensagem de erro.
 */
export const NonCompliace = {
    component: Audio
};
NonCompliace.storyName = "Inconformidade com as diretrizes do eMAG";