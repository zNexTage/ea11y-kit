import { styled } from "@stitches/react";
import Button from "../fields/button/Button";
import usePlayer from "../hooks/player";
import { useId, useRef, useState } from "react";
import { lightTheme } from "../../stitches.config";
import { fieldHightlight } from "../fields/shared-styles/Field.style";
import Select from "../fields/select";



/**
 * @typedef Source
 * @property {string} src
 * @property {string} type
 */

/**
 * @typedef Track
 * @property {string} src
 * @property {string} srcLang
 * @property {boolean} default
 * @property {string} label
 */

/**
 * @typedef VideoSource
 * @property {string} src
 * @property {string} type 
 **/

/**
 * @typedef VideoProps
 * @property {import("@stitches/react").CSS} css
 * @property {Array<VideoSource>} sources 
 * @property {Array<Track>} tracks
 */

/**
 * @typedef {VideoProps & React.HTMLProps<HTMLVideoElement>}  ExtendedVideoProps
 */


const VideoContainer = styled("div", {
    maxWidth: 800,
    border: "2px solid #ddd",
    padding: 5,
    borderRadius: 5,
});

const VideoProgressContainer = styled("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px 0"
});

const VideoProgressoBar = styled("input", {
    width: "100%",
    flex: 1,
    marginRight: 25
});

const VideoStyled = styled("video", {
    width: "100%"
});

const VideoDuration = styled("p", {
    margin: 0
});

const VideoControls = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "&>div": {
        flex: 1
    }
})


/**
 * 
 * @param {ExtendedVideoProps} props 
 * @returns 
 */
const Video = ({ sources, css, controls, tracks = [], ...rest }) => {
    const videoRef = useRef();
    const { formatTime, onProgressTimeChange, changeCaptionLang, getDefaultTrack } = usePlayer();
    const cboVideoId = useId();

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    /**
     * Inicializa o vídeo
     */
    const play = () => {
        videoRef.current.play();
        setIsPlaying(true);
    }

    /**
     * Finaliza o vídeo
     */
    const pause = () => {
        videoRef.current.pause();
        setIsPlaying(false);
    }

    /**
     * Reinicia o vídeo.
     */
    const stop = () => {
        videoRef.current.currentTime = 0;
        pause();
    }

    /**
     * Atualiza o estado com o tempo atual do vídeo.
     * @param {*} event 
     */
    const onTimeUpdate = event => {
        setCurrentTime(event.target.currentTime);
    }

    /**
     * Atualiza o tempo conforme o vídeo é reproduzido.
     * @param {*} event 
     */
    const onProgressChange = event => {
        const timeSeek = onProgressTimeChange(event.target.value, duration);

        setCurrentTime(timeSeek);
        videoRef.current.currentTime = timeSeek;
    }

    return (
        <VideoContainer>
            <VideoStyled
                ref={videoRef}
                css={css}
                onTimeUpdate={onTimeUpdate}
                onLoadedData={event => {
                    setDuration(event.target.duration);
                }}
                {...rest}>
                {sources.map((source, index) => (
                    <source
                        key={`videosource_${index}`}
                        src={source.src}
                        type={source.type}
                    />
                ))}

                <p>
                    Seu navegador não suporta reprodução de vídeo.
                </p>

                {
                    tracks.map(track => (
                        <track
                            key={`video_track_${track.label}_${track.srcLang}`}
                            kind="captions"
                            label={track.label}
                            src={track.src}
                            srcLang={track.srcLang}
                            default={track.default}>
                        </track>
                    ))
                }
            </VideoStyled>


            <VideoProgressContainer>
                <VideoProgressoBar
                    className={`${lightTheme} ${fieldHightlight}`}
                    min={0}
                    max={100}
                    onChange={onProgressChange}
                    value={(currentTime / duration) * 100}
                    aria-label="Barra de progresso do vídeo" type="range" />
                <VideoDuration>
                    {formatTime(currentTime)} / {formatTime(duration)}
                </VideoDuration>
            </VideoProgressContainer>

            <VideoControls>
                <div>
                    {
                        !isPlaying ?
                            <Button
                                onClick={play}
                                css={{
                                    marginRight: 10
                                }}>
                                Reproduzir
                            </Button> :
                            <Button
                                onClick={pause}
                                css={{
                                    marginRight: 10
                                }}>
                                Pausar
                            </Button>
                    }
                    <Button onClick={stop}>
                        Parar
                    </Button>
                </div>

                <Select
                    name={`cboVideoCaption${cboVideoId}`}
                    label="Legendas"
                    onChange={event => {
                        const selectedTrack = event.target.value;

                        const track = tracks.find(track => track.srcLang === selectedTrack);

                        changeCaptionLang([...videoRef.current.textTracks], track);
                    }}
                    id={`cboVideoCaption${cboVideoId}`}>
                    {
                        tracks.map(t => (
                            <option value={t.srcLang} key={`track_${cboVideoId}_${t.srcLang}`}>
                                {t.label}
                            </option>
                        ))
                    }
                </Select>
            </VideoControls>
        </VideoContainer>
    )
}

export default Video;