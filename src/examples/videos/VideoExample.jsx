import Video from "../../lib/videos/Video";
import AudioCaptionBr from "./sintel-br.vtt";
import AudioCaptionEn from "./sintel-en.vtt";
import AudioCaptionDe from "./sintel-de.vtt";
import AudioCaptionEs from "./sintel-es.vtt";


const VideoExample = () => {

    return (
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
            tracks={[ //define as legendas a serem usadas no áudio.
                {
                    default: true,
                    label: "Português (Brasil)",
                    src: AudioCaptionBr,
                    srcLang: "br",
                    kind: "captions"
                },
                {
                    default: false,
                    label: "Inglês",
                    src: AudioCaptionEn,
                    srcLang: "en",
                    kind: "captions"
                },
                {
                    default: false,
                    label: "Alemão",
                    src: AudioCaptionDe,
                    srcLang: "de",
                    kind: "captions"
                },
                {
                    default: false,
                    label: "Espanhol",
                    src: AudioCaptionEs,
                    srcLang: "es",
                    kind: "captions"
                },
            ]}
        />
    )
}

export default VideoExample;