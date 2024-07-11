import React from "react";
import Video from "./Video";
import AudioCaptionBr from "../../examples/videos/sintel-br.vtt";
import AudioCaptionEn from "../../examples/videos/sintel-en.vtt";
import AudioCaptionDe from "../../examples/videos/sintel-de.vtt";
import AudioCaptionEs from "../../examples/videos/sintel-es.vtt";
import VideoAudioDescriptionExample from "../../examples/video-audio-description/VideoAudioDescriptionExample";

export default {
    title: "Vídeo",
    component: Video,
    tags: ['autodocs'],
}

/**
 * O componente é renderizado apenas quando estiver em conformidade com as diretrizes do eMAG,
 * ou seja, quando todos os parâmetros forem passados corretamente.
 */
export const AccordingToGuidelines = () => (
    <Video
        sources={[{
            src: "https://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4",
            type: "video/mp4"
        }]}

        textualAlternativeFile={{
            extension: ".txt",
            fileName: "Transcrição textual da demonstração do jogo Sintel",
            href: AudioCaptionBr,
            size: 1,
            unit: "KB"
        }}

        tracks={[ //define as legendas a serem usadas no vídeo.
            {
                default: true,
                label: "Português (Brasil)",
                src: AudioCaptionBr,
                srcLang: "br"
            },
            {
                default: false,
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
                default: false,
                label: "Espanhol",
                src: AudioCaptionEs,
                srcLang: "es"
            },
        ]}
    />
);

AccordingToGuidelines.storyName = "Conformidade com as diretrizes do eMAG"

/**
 * Será listado todas as diretrizes violadas caso haja alguma inconformidade com as diretrizes do eMAG. 
 */
export const NonCompliace = {
    component: Video
};
NonCompliace.storyName = "Inconformidade com as diretrizes do eMAG";

/**
 * Exemplo de vídeo com áudio descrição * 
 */
export const VideoAudioDescription = () => (
    <VideoAudioDescriptionExample />
)
VideoAudioDescription.storyName = "Demonstração com áudio descrição";