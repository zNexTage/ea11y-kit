import { styled } from "@stitches/react";
import PropTypes from "prop-types";
import { default as BaseButton } from "../fields/button/Button";
import usePlayer from "../hooks/player";
import { useEffect, useId, useRef, useState } from "react";
import { lightTheme } from "../../stitches.config";
import { fieldHightlight } from "../fields/shared-styles/Field.style";
import Select from "../fields/select";
import useFullscreenAPI from "../hooks/fullscreen-api";
import Range from "../fields/range/Range";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faStop, faExpand, faMinimize, faAudioDescription } from '@fortawesome/free-solid-svg-icons'
import DownloadLink from "../links/download-link/DownloadLink";
import GuidelineViolation from "../../exceptions/GuidelineViolation/GuidelineViolation";
import { PROVIDE_ALTERNATIVE_TO_VIDEO } from "../../utils/eMagGuidelineCode";
import ComponentErrorList from "../../components/component-error-list";
import RequiredAttribute from "../../exceptions/RequiredAttribute";

const KIND_AVAILABLE_OPTIONS = ["subtitles", "captions", "descriptions", "chapters"];

//TODO: Colocar AudioDescription em PropTypes

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
 * @property {"subtitles"|"captions"|"descriptions"|"chapters"} kind
 */

/**
 * @typedef VideoSource
 * @property {string} src
 * @property {string} type 
 **/

/**
 * @typedef AudioDescription
 * @property {string} src
 * @property {string} type
 * @property {boolean} enable
 */

/**
 * @typedef VideoProps
 * @property {import("@stitches/react").CSS} css
 * @property {Array<VideoSource>} sources 
 * @property {Array<Track>} tracks
 * @property {import("../links/download-link/DownloadLink").DownloadLinkProps} textualAlternativeFile
 * @property {AudioDescription|null} audioDescription
 * 
 */

/**
 * @typedef {VideoProps & React.HTMLProps<HTMLVideoElement>}  ExtendedVideoProps
 */

const ControlButton = styled(BaseButton, {
    "&:fullscreen": {
        border: "2px solid #DDD"
    },
    padding: 10
});

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
    margin: "5px 0",
    flexDirection: "column"
});

const VideoProgressoBar = styled("input", {
    width: "100%",
    flex: 1,
});

const VideoStyled = styled("video", {
    width: "100%",
    height: "80%",
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

const VolumeContainer = styled("div", {
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    "&>span": {
        flex: .2
    },
    "&>div": {
        width: "100%",
        flex: 1
    }
});

const AudioDescription = styled("audio", {
    display: "none"
});

/**
 * Componente vídeo pré-configurado com as diretrizes do eMAG
 * 
 * Diretrizes adotadas:
 * 
 * - 5.1 - Fornecer alternativa para vídeo: As legendas são obrigatórias e devem ser fornecidas via prop 'tracks'. 
 * De acordo com o eMAG(2014), as legendas são essenciais para pessoas com deficiência auditiva, mas também são importantes para usuários que não possuem equipamento de som, que preferem realizar 
 * a leitura do material ou que não têm tempo para ouvir um arquivo multimídia.
 * Além disso, deve-se fornecer uma alternativa textual (arquivo) do vídeo através da propriedade textualAlternativeFile para que o usuário
 * - 5.3 -  Oferecer audiodescrição para vídeo pré-gravado. Audiodescrição é considerado opcional, e deve-se ser fornecido quando
 * "vídeos que transmitem conteúdo visual que não está disponível na faixa de áudio devem possuir uma audiodescrição." (eMAG, 2014). É possível informar audiodescrição
 * via "tracks", bastando definir o kind para "descriptions". Pode-se também informar via prop audioDescription, onde deve-se informar um arquivo de áudio.
 * 5.4 – Fornecer controle de áudio para som - É fornecido controles para reproduzir, pausar, parar e alterar o volume do vídeo.
 * - 4-4 - Possibilitar que o elemento com foco seja visualmente evidente: os controles de interação recebem uma borda ao serem focados.
 * 
 * @param {ExtendedVideoProps} props 
 * @returns 
 */
const Video = ({ sources, css, tracks, textualAlternativeFile, audioDescription, ...rest }) => {
    const videoRef = useRef();
    const audioRef = useRef();
    const videoContainerRef = useRef();
    const { formatTime, onProgressTimeChange, changeCaptionLang } = usePlayer();

    const cboVideoId = useId();

    const volumeId = useId();

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(100);
    const [enableAd, setEnableAd] = useState(audioDescription?.enable);

    const [isFullscreen, setIsFullscreen] = useState(false);

    const { isBrowserSupports, exitFullscreen, activeFullscreen } = useFullscreenAPI();

    const [violations, setViolations] = useState([]);

    // quando clicar no botão de áudio descrição...
    const onAdClick = event => {
        const enable = !enableAd;
        setEnableAd(enable); // se áudio descrição estiver ativado, desativa. se estiver desativado, ativa.

        if (enable) {
            // reproduz o áudio descrição
            setAdCurrentTime(videoRef.current.currentTime);
            playAd();
        } else {
            // para a reprodução do áudio descrição.
            stopAd();
        }

    }


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
        });
    }, []);

    useEffect(() => {
        const errorsAux = [];

        if (!sources || sources?.length === 0) {
            errorsAux.push(
                new RequiredAttribute("Atenção! É necessário informar a propriedade 'sources' para especificar pelo menos um link do vídeo. Pode-se utilizar o 'sources' para disponibilizar o mesmo vídeo, mas em outros formatos através do atributo 'type'.")
            )
        }

        if (!textualAlternativeFile) {
            errorsAux.push(
                new GuidelineViolation(PROVIDE_ALTERNATIVE_TO_VIDEO,
                    "É necessário prover uma alternativa textual para o vídeo para que usuários com deficiência auditiva, que não possuem equipamento de som, que preferem realizar a leitura do material ou que não têm tempo para ouvir um arquivo multimídia possam acompanhar o vídeo.")
            );
        }

        if (!tracks || tracks?.length === 0) {
            errorsAux.push(
                new GuidelineViolation(PROVIDE_ALTERNATIVE_TO_VIDEO,
                    "É necessário prover legenda para o vídeo para que usuários com deficiência auditiva, que não possuem equipamento de som, que preferem realizar a leitura do material ou que não têm tempo para ouvir um arquivo multimídia possam acompanhar o vídeo.")
            );
        }

        setViolations([...errorsAux]);
    }, [tracks, sources, textualAlternativeFile]);

    /**
     * Inicializa o vídeo
     */
    const play = () => {
        videoRef.current.play();

        if (enableAd) {
            playAd();
        }

        setIsPlaying(true);
    }

    /**
     * Reproduz o áudio descrição
     */
    const playAd = () => {
        audioRef.current && audioRef.current.play();
    }

    /**
     * Finaliza o vídeo
     */
    const pause = () => {
        videoRef.current.pause();

        if (enableAd) {
            pauseAd();
        }

        setIsPlaying(false);
    }

    /**
     * Pausa a reprodução do áudio descrição
     */
    const pauseAd = () => {
        audioRef.current && audioRef.current.pause();
    }

    /**
     * Reinicia o vídeo.
     */
    const stop = () => {
        videoRef.current.currentTime = 0;

        if (enableAd) {
            stopAd();
        }

        pause();
    }

    // Para a reprodução do áudio descrição
    const stopAd = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }

        pauseAd();
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

        if (enableAd) {
            setAdCurrentTime(timeSeek);
        }
    }

    /**
     * Altera o tempo de reprodução do áudio descrição
     * @param {number} time 
     */
    const setAdCurrentTime = time => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
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

    /**
     * retorna o tempo atual do vídeo.
     * @returns {number} - o tempo atual do vídeo
     */
    const getVideoCurrentTime = () => {
        const result = (currentTime / duration) * 100;

        if (isNaN(result)) {
            return 0;
        }

        return result;
    }

    return (
        <>
            {violations.length === 0 &&
                <VideoContainer ref={videoContainerRef}>
                    <VideoStyled
                        controls={false}
                        onClick={onVideoClick}
                        ref={videoRef}
                        css={css}
                        className={`${lightTheme} ${fieldHightlight}`}
                        onTimeUpdate={onTimeUpdate}
                        onLoadedData={event => {
                            setDuration(event.target.duration);
                        }}
                        {...rest}>
                        {sources?.map((source, index) => (
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
                            tracks?.map(track => {
                                const isValidKind = KIND_AVAILABLE_OPTIONS.includes(track.kind);

                                const defaultKind = "captions";

                                return (
                                    <track
                                        key={`video_track_${track.label}_${track.srcLang}`}
                                        kind={isValidKind ? track.kind : defaultKind}
                                        label={track.label}
                                        src={track.src}
                                        srcLang={track.srcLang}
                                        default={track.default}>
                                    </track>
                                )
                            })
                        }
                    </VideoStyled>


                    <div>
                        <DownloadLink
                            css={{
                                textAlign: "center",
                                display: "block",
                            }}
                            extension={textualAlternativeFile?.extension}
                            fileName={textualAlternativeFile?.fileName}
                            href={textualAlternativeFile?.href}
                            size={textualAlternativeFile?.size}
                            unit={textualAlternativeFile?.unit}
                        />
                        <VideoProgressContainer>
                            <VideoDuration>
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </VideoDuration>
                            <VideoProgressoBar
                                className={`${lightTheme} ${fieldHightlight}`}
                                min={0}
                                max={100}
                                onChange={onProgressChange}
                                value={getVideoCurrentTime()}
                                aria-label="Barra de progresso do vídeo" type="range" />


                            <div>
                                {!isPlaying ?
                                    <ControlButton
                                        type="button"
                                        className={`${lightTheme} ${fieldHightlight}`}
                                        onClick={play}
                                        css={{
                                            marginRight: 10
                                        }}>
                                        <FontAwesomeIcon title="Reproduzir" icon={faPlay} />
                                    </ControlButton> :
                                    <ControlButton
                                        type="button"
                                        className={`${lightTheme} ${fieldHightlight}`}
                                        onClick={pause}
                                        css={{
                                            marginRight: 10
                                        }}>
                                        <FontAwesomeIcon title="Pausar" icon={faPause} />
                                    </ControlButton>
                                }

                                <ControlButton
                                    type="button"
                                    className={`${lightTheme} ${fieldHightlight}`}
                                    css={{
                                        marginRight: 10
                                    }} onClick={stop}>
                                    <FontAwesomeIcon title="Parar" icon={faStop} />
                                </ControlButton>

                                {audioDescription &&
                                    <ControlButton
                                        role="checkbox"
                                        aria-checked={enableAd}
                                        tabIndex={0}
                                        aria-label="Habilitar áudio descrição"
                                        type="button"
                                        onClick={onAdClick}
                                        className={`${lightTheme} ${fieldHightlight}`}
                                        css={{
                                            marginRight: 10,
                                            backgroundColor: enableAd ? "LawnGreen" : "#FFF",
                                        }}
                                    >
                                        <FontAwesomeIcon title="Áudio descrição" icon={faAudioDescription} />
                                    </ControlButton>
                                }

                                {isBrowserSupports &&
                                    <>
                                        {!isFullscreen &&
                                            <ControlButton
                                                type="button"
                                                className={`${lightTheme} ${fieldHightlight}`}
                                                onClick={fullscreen}
                                                css={{
                                                    marginRight: 10
                                                }}>
                                                <FontAwesomeIcon icon={faExpand} title="Tela cheia" />
                                            </ControlButton>
                                        }

                                        {isFullscreen &&
                                            <ControlButton
                                                type="button"
                                                className={`${lightTheme} ${fieldHightlight}`}
                                                onClick={closeFullscreen}
                                                css={{
                                                    marginRight: 10
                                                }}>
                                                <FontAwesomeIcon icon={faMinimize} title="Sair tela cheia" />
                                            </ControlButton>
                                        }

                                    </>
                                }
                            </div>


                        </VideoProgressContainer>

                        <VideoControls>
                            <VolumeContainer>
                                <span>
                                    {volume}
                                </span>
                                <Range
                                    label="Volume"
                                    id={volumeId}
                                    min={0}
                                    max={100}
                                    value={volume}
                                    onChange={onVolumeChange}
                                />
                            </VolumeContainer>

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
                                    tracks?.map(t => (
                                        <option value={t.srcLang} key={`track_${cboVideoId}_${t.srcLang}`}>
                                            {t.label}
                                        </option>
                                    ))
                                }
                            </Select>


                        </VideoControls>


                    </div>
                </VideoContainer>
            }

            {
                violations.length > 0 &&
                <ComponentErrorList errors={violations} />
            }

            {audioDescription &&
                <AudioDescription ref={audioRef}>
                    <source
                        src={audioDescription.src}
                        type={audioDescription.type}
                    />
                </AudioDescription>
            }
        </>
    )
}

Video.propTypes = {
    css: PropTypes.string.isRequired,
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
        })
    ).isRequired,
    textualAlternativeFile: PropTypes.shape({
        href: PropTypes.string.isRequired,
        fileName: PropTypes.string.isRequired,
        extension: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
    }).isRequired,
    tracks: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            srcLang: PropTypes.string.isRequired,
            default: PropTypes.bool.isRequired,
            label: PropTypes.string.isRequired,
            kind: PropTypes.oneOf(KIND_AVAILABLE_OPTIONS),
        })
    )
}

export default Video;