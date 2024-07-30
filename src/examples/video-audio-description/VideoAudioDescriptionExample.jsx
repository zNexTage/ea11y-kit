import Video from "../../lib/videos/Video";
import HorribleHistoriesMp4 from "./HorribleHistories.mp4";
import HorribleHistoriesMp3 from "./AudioDescription.mp3";
import Track from "./Track.vtt";

/**
 * Demonstração de vídeo com audio description.
 * 
 * Referência: https://www.sitepoint.com/accessible-audio-descriptions-for-html5-video/
 * @returns 
 */
const VideoAudioDescriptionExample = () => (
    <Video
        tracks={[{
            default: true,
            kind: "captions",
            label: "Inglês",
            src: Track,
            srcLang: "en"
        }]}
        audioDescription={{
            src: HorribleHistoriesMp3,
            type: "audio/mp3",
            enable: true
        }}
        textualAlternativeFile={{
            extension: ".vtt",
            fileName: "Legendas de Horrible Histories",
            size: 6,
            unit: "KB",
            href: Track
        }}
        sources={[{
            src: HorribleHistoriesMp4,
            type: "video/mp4"
        }]} />
);

export default VideoAudioDescriptionExample;