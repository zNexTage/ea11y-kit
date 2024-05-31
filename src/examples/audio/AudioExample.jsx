import Audio from "../../lib/audio";
import AudioSrc from "./sintel-short.mp3";
import AudioCaptionBr from "./sintel-br.vtt";
import AudioCaptionEn from "./sintel-en.vtt";
import AudioCaptionDe from "./sintel-de.vtt";
import AudioCaptionEs from "./sintel-es.vtt";

/**
 * Exemplo de utilização do componente Audio
 * @returns 
 */
const AudioExample = () => {
    return (
        <Audio
            sources={[ //define os arquivos que serão usados para reprodução
                {
                    src: AudioSrc,
                    type: "audio/mp3"
                }
            ]}
            captionFile={{ // define os arquivos a serem usados como alternativa textual
                extension: ".txt",
                fileName: "Transcrição textual da demonstração do jogo Sintel",
                href: AudioCaptionEn,
                size: 1,
                unit: "KB"
            }}
            tracks={[ //define as legendas a serem usadas no áudio.
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
}

export default AudioExample;