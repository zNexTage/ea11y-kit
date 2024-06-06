import { styled } from "@stitches/react";
import Button from "../fields/button/Button";
import { useRef, useState } from "react";

const VideoContainer = styled("div", {
    maxWidth: 800,
    border: "2px solid #ddd",
    padding: 5,
    borderRadius: 5,
});

const VideoProgressoBar = styled("input", {
    width: "100%"
});

const VideoStyled = styled("video", {
    width: "100%"
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

    return (
        <VideoContainer>
            <VideoStyled
                ref={videoRef}
                css={css}
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

            <div>
                <VideoProgressoBar value={0} aria-label="Barra de progresso do vídeo" type="range" />
            </div>

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