import { styled } from "@stitches/react";
import Button from "../fields/button/Button";
import usePlayer from "../hooks/player";
import { useEffect, useId, useRef, useState } from "react";
import { lightTheme } from "../../stitches.config";
import { fieldHightlight } from "../fields/shared-styles/Field.style";
import Select from "../fields/select";
import useFullscreenAPI from "../hooks/fullscreen-api";
import Range from "../fields/range/Range";



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
    "&:fullscreen": {
        color: "#FFF"
    }
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
    width: "100%",
    height: "87%",
    minHeight: "15em",
});

const VideoDuration = styled("p", {
    margin: 0
});

const VideoControls = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    "&>div": {
        flex: 1,
        marginRight: 15
    }
});

/**
 * 
 * @param {ExtendedVideoProps} props 
 * @returns 
 */
const Video = ({ sources, css, controls, tracks = [], ...rest }) => {
    const videoRef = useRef();
    const videoContainerRef = useRef();
    const { formatTime, onProgressTimeChange, changeCaptionLang } = usePlayer();

    const cboVideoId = useId();

    const volumeId = useId();

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(100);

    const [isFullscreen, setIsFullscreen] = useState(false);

    const { isBrowserSupports, exitFullscreen, activeFullscreen } = useFullscreenAPI();


    useEffect(() => {
        const video = videoContainerRef?.current;

        if (!video) return;

        // Aparentemente o React não implementa o onFullscreenChange
        // https://stackoverflow.com/questions/64485142/is-fullscreenchange-event-supported-in-react
        video.addEventListener("fullscreenchange", event => {
            if (!!document.fullscreenElement) {
                setIsFullscreen(true);
            } else {
                setIsFullscreen(false);
            }
        })
    }, []);


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

    /**
     * Ativa o modo fullscreen
     * @param {*} event 
     * @returns 
     */
    const fullscreen = async event => {
        if (!isBrowserSupports) return;

        const video = videoContainerRef.current;

        try {
            const result = activeFullscreen(video);

            if (!result) {
                console.log("Não foi possível ativar o modo fullscreen");
                alert("Ops! Não foi possível ativar o modo fullscreen.");
            }
        }
        catch (err) {
            alert("Ocorreu um erro ao tentar habilitar o modo tela cheia.");
        }
    }

    /**
     * Pausa/inicia o vídeo ao clica-lo
     * @param {*} event 
     * @returns 
     */
    const onVideoClick = event => {
        if (isPlaying) {
            pause();
            return
        }

        play();
    }

    /**
     * Sai do modo fullscreen
     * @returns 
     */
    const closeFullscreen = () => {
        if (!isBrowserSupports) return;

        exitFullscreen();
    }

    /**
     * Altera o volume do vídeo.
     * @param {*} event 
     */
    const onVolumeChange = event => {
        const newVolume = Number.parseInt(event.target.value);

        setVolume(newVolume);
        videoRef.current.volume = newVolume / 100;
    }

    return (
        <VideoContainer ref={videoContainerRef}>
            <VideoStyled
                onClick={onVideoClick}
                ref={videoRef}
                css={css}
                className={`${lightTheme} ${fieldHightlight}`}
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


            <div>
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
                        <Button
                            css={{
                                marginRight: 10
                            }} onClick={stop}>
                            Parar
                        </Button>

                        {isBrowserSupports &&
                            <>
                                {!isFullscreen &&
                                    <Button
                                        onClick={fullscreen}
                                        css={{
                                            marginRight: 10
                                        }}>
                                        Tela cheia
                                    </Button>
                                }

                                {isFullscreen &&
                                    <Button
                                        onClick={closeFullscreen}
                                        css={{
                                            marginRight: 10
                                        }}>
                                        Sair tela cheia
                                    </Button>
                                }
                            </>
                        }

                    </div>

                    <div>
                        <Range
                            label="Volume"
                            id={volumeId}
                            min={0}
                            max={100}
                            value={volume}
                            onChange={onVolumeChange}
                        />
                    </div>

                    <Select
                        name={`cboVideoCaption${cboVideoId}`}
                        label="Legendas"
                        onChange={event => {
                            const selectedTrack = event.target.value;

                            const track = tracks.find(track => track.srcLang === selectedTrack);

                            changeCaptionLang(videoRef.current.textTracks, track);
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


            </div>
        </VideoContainer>
    )
}

export default Video;