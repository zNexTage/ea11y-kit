import { styled } from "@stitches/react";
import Button from "../fields/button/Button";
import usePlayer from "../hooks/player";
import { useRef, useState } from "react";

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


/**
 * @typedef VideoSource
 * @property {string} src
 * @property {string} type 
 **/

/**
 * @typedef VideoProps
 * @property {import("@stitches/react").CSS} css
 * @property {Array<VideoSource>} sources 
 */

/**
 * @typedef {VideoProps & React.HTMLProps<HTMLVideoElement>}  ExtendedVideoProps
 */


/**
 * 
 * @param {ExtendedVideoProps} props 
 * @returns 
 */
const Video = ({ sources, css, controls, ...rest }) => {
    const videoRef = useRef();

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const { formatTime, onProgressTimeChange } = usePlayer();

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
            </VideoStyled>


            <VideoProgressContainer>
                <VideoProgressoBar
                    min={0}
                    max={100}
                    onChange={onProgressChange}
                    value={(currentTime / duration) * 100}
                    aria-label="Barra de progresso do vídeo" type="range" />
                <VideoDuration>
                    {formatTime(currentTime)} / {formatTime(duration)}
                </VideoDuration>
            </VideoProgressContainer>

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
        </VideoContainer>
    )
}

export default Video;