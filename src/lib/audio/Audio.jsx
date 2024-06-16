import { useEffect, useId, useRef, useState } from "react";
import { lightTheme, } from "../../stitches.config";
import { fieldHightlight } from "../fields/shared-styles/Field.style";
import DownloadLink from "../links/download-link/DownloadLink";
import { styled } from '@stitches/react';
import useAudioPlayer from "../hooks/audio-player";
import Button from "../fields/button/Button";
import Select from "../fields/select/Select";
import Range from "../fields/range/Range";
import GuidelineViolation from "../../exceptions/GuidelineViolation/GuidelineViolation";
import { PROVIDE_ALTERNATIVE_TO_AUDIO } from "../../utils/eMagGuidelineCode";
import ComponentErrorList from "../../components/component-error-list";
import PropTypes from "prop-types";
import usePlayer from "../hooks/player";


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
 * @typedef AudioProps
 * @property {Array<Source>} sources
 * @property {import("../links/download-link/DownloadLink").DownloadLinkProps} captionFile
 * @property {Array<Track>} tracks
 * 
 */

const Caption = styled("p", {
    backgroundColor: "rgb(71, 71, 71)",
    color: "#fff",
    padding: 5,
    minHeight: 20,
    display: "block",
    borderRadius: 3
});

const AudioContainer = styled("div", {
    maxWidth: 300,
    textAlign: "center"
});

const AudioPlayer = styled("div", {
    border: "2px solid #ddd",
    padding: 10,
    borderRadius: 5,
    position: "relative",
});

const AudioPlayerTitle = styled("p", {
    position: "absolute",
    top: -10,
    margin: 0,
    right: 8,
    backgroundColor: "#FFF"
});

const AudioPlayerProgressControl = styled("div", {
    display: "flex",
    justifyContent: "space-between"
});

const AudioPlayerTime = styled("p", {
    textAlign: "right",
    margin: 0,
    marginTop: 5
})

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
})

/**
 * Componente de áudio pré-configurado com as diretrizes do eMAG
 * 
 * Diretrizes adotadas:
 * 
 * 5.2 – Fornecer alternativa para áudio - é obrigatório fornecer uma alternativa textual com o conteúdo do áudio. Pode-se informar
 * via parâmetro uma legenda. O componente se encarrega de renderizar os trechos da legenda para o usuário.
 * 5.4 – Fornecer controle de áudio para som - o componente fornece elementos para pausar, play, volume e ativar legendas;
 * 4.4 – Possibilitar que o elemento com foco seja visualmente evidente - ao focar no elemento e nos itens interativos,
 * é demonstrado uma borda;
 * 
 * TODO: Permitir customização via props.
 * @param {AudioProps} props
 * @returns 
 */
const Audio = ({ sources = [], captionFile, tracks = [] }) => {

    const rgVolumeId = useId();
    const cboLegendId = useId();

    const [violations, setViolations] = useState([]);
    

    useEffect(() => {
        const violationAux = [];

        if (!captionFile) {
            violationAux.push(new GuidelineViolation(PROVIDE_ALTERNATIVE_TO_AUDIO, "Deve-se fornecer uma transcrição descritiva do áudio via parâmetro `captionFile`. De acordo com o eMAG, prover uma alternativa textual para o áudio é essencial para beneficiar pessoas com deficiência auditiva, usuários que não possuem equipamento de som, que apenas desejam realizar a leitura do material e que estão sem tempo para ouvir um arquivo multimídia."))
        }

        setViolations([...violationAux]);
    }, []);

    const [currentTrackText, setCurrentTrackText] = useState("");
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0);

    const audioRef = useRef();

    const { pause, play, isPlaying } = useAudioPlayer(audioRef.current);

    const { formatTime, changeCaptionLang } = usePlayer();



    /**
     * Inicia ou pausa um vídeo.
     * @param {*} event 
     * @returns 
     */
    const onPlayPauseClick = event => {
        if (isPlaying) {
            pause();
            return
        }

        play();
    }

    /**
     * Atualiza as legendas conforme o áudio é reproduzido
     * @param {*} event 
     * @returns 
     */
    const updateCaption = (event) => {
        if (tracks?.length === 0) return; // se não informou legendas, não precisa fazer nada.    

        const textTracks = [...event.target.textTracks];

        // obtém a legenda que está sendo utilizada.
        const currentTextTrack = textTracks.find(track => track.mode === "showing");

        if (!currentTextTrack) return;

        const activeCues = currentTextTrack.activeCues;

        // se não for falas, som e etc... no momento atual do vídeo, 
        // limpa o estado.
        if (activeCues.length == 0) {
            setCurrentTrackText("");
            return;
        };

        const currentCue = activeCues[0];

        setCurrentTrackText(currentCue.text);
    }

    /**
     * Atualiza a legenda conforme o vídeo é reproduzido e atualiza o estado current time.
     * @param {*} event 
     * @returns 
     */
    const onTimeUpdate = event => {
        updateCaption(event);

        const currentTime = event.target.currentTime;

        setCurrentTime(currentTime);
    }

    /**
     * Altera o tempo do vídeo para o tempo requisitado no range.
     * @param {*} event 
     */
    const onProgressChange = event => {
        const value = Number.parseFloat(event.target.value);

        const timeSeek = (value * audioRef.current.duration) / 100;

        setCurrentTime(timeSeek);
        audioRef.current.currentTime = timeSeek;
    }

    /**
     * Obtém o tempo atual do vídeo em porcentagem
     * @returns {number}
     */
    const getCurrentTime = () => {
        if (!audioRef.current?.currentTime) return 0;

        return (audioRef.current.currentTime / audioRef.current.duration) * 100;
    }

    /**
 * Modifica o volume com base na seleção do usuário.
     * @param {} event 
     */
    const onChangeVolume = event => {
        const newVolume = Number.parseFloat(event.target.value);

        // o volume do áudio é de 0 a 100
        audioRef.current.volume = newVolume / 100;

        setVolume(newVolume);
    }

    return (
        <>
            {violations.length === 0 &&
                <AudioContainer>

                    <audio
                        style={{ display: "none" }}
                        ref={audioRef}
                        onTimeUpdate={onTimeUpdate}
                        className={`${lightTheme} ${fieldHightlight}`}
                        controls
                        onLoadedData={event => {
                            setDuration(event.target.duration);
                            setVolume(event.target.volume * 100);
                        }}
                    >
                        {
                            sources.map((source, index) => (
                                <source
                                    key={`audio_source_${index}`}
                                    src={source.src}
                                    type={source.type}>
                                </source>
                            ))
                        }
                        {
                            tracks.map(track => (
                                <track
                                    key={`track_${track.label}_${track.srcLang}`}
                                    kind="captions"
                                    label={track.label}
                                    src={track.src}
                                    srcLang={track.srcLang}
                                    default={track.default}>
                                </track>
                            ))
                        }
                    </audio>
                    <br />
                    <AudioPlayer>
                        <AudioPlayerTitle>
                            Reprodutor de áudio
                        </AudioPlayerTitle>


                        {sources.length > 0 &&
                            <>
                                <div>
                                    <AudioPlayerProgressControl>
                                        <Button
                                            onClick={onPlayPauseClick}
                                        >
                                            {isPlaying ? "Pausar" : "Reproduzir"}
                                        </Button>
                                        <input
                                            className={`${lightTheme} ${fieldHightlight}`}
                                            aria-label="Posição atual do áudio"
                                            min={0}
                                            max={100}
                                            onChange={onProgressChange}
                                            value={getCurrentTime()}
                                            type="range" />
                                    </AudioPlayerProgressControl>
                                    <AudioPlayerTime>
                                        {/* Key -> "As chaves ajudam o React a identificar quais itens sofreram alterações, foram adicionados ou removidos"
                                        por tanto, utiliza-se currentTime como key do span para que o conteúdo seja atualizado sempre que o tempo do vídeo mudar.
                                        algo similar é feito para o duration, porque audioRef.current.duration inicia como null e depois atualiza com o tempo total 
                                        do áudio. Entretanto, utilizar audioRef.current.duration diretamente não faz o componente atualizar com o valor correto, portanto
                                        utiliza-se um estado.
                                        */}
                                        <span key={`current_time_${currentTime}`}>{formatTime(currentTime)}</span> / <span key={`duration_${duration}`}>{formatTime(duration)}</span>
                                    </AudioPlayerTime>
                                </div>

                                <VolumeContainer>
                                    <span>
                                        {volume}
                                    </span>
                                    <Range
                                        value={volume}
                                        id={rgVolumeId}
                                        max={100}
                                        min={0}
                                        onChange={onChangeVolume}
                                        label="Volume"
                                        name={"volume"}
                                    />
                                </VolumeContainer>

                                {
                                    tracks.length > 0 &&
                                    <div style={{ textAlign: 'left' }}>
                                        <Select
                                            id={cboLegendId}
                                            name={"legenda"}
                                            label="Idioma da legenda"
                                            onChange={event => {
                                                const track = tracks.find(track => track.srcLang === event.target.value);

                                                changeCaptionLang(audioRef.current.textTracks, track);
                                            }}
                                        >
                                            {tracks.map(track => (<option key={track.srcLang} value={track.srcLang}>{track.label}</option>))}
                                        </Select>
                                        <Caption>
                                            {currentTrackText}
                                        </Caption>

                                    </div>
                                }
                                <DownloadLink
                                    {...captionFile}
                                />
                            </>
                        }
                        {sources.length == 0 &&
                            <span role="alert">
                                Nenhum arquivo de áudio informado.
                            </span>
                        }
                    </AudioPlayer>

                </AudioContainer>
            }

            {violations.length > 0 && <ComponentErrorList errors={violations} />}
        </>
    )
}

Audio.propTypes = {
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
        }).isRequired
    ),
    captionFile: PropTypes.objectOf(PropTypes.shape({
        href: PropTypes.string.isRequired,
        fileName: PropTypes.string.isRequired,
        extension: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
    })).isRequired,
    tracks: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        srcLang: PropTypes.string.isRequired,
        default: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired,
    }))
}

export default Audio;