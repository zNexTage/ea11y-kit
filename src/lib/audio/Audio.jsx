import { useEffect, useRef, useState } from "react";
import { lightTheme, } from "../../stitches.config";
import { fieldHightlight } from "../fields/shared-styles/Field.style";
import DownloadLink from "../links/download-link/DownloadLink";
import { styled } from '@stitches/react';
import useAudioPlayer from "../hooks/audio-player";
import Button from "../fields/button/Button";

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
    display: "inline-block",
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
 * @param {AudioProps} props
 * @returns 
 */
const Audio = ({ sources, captionFile, tracks = [] }) => {
    //TODO: Permitir trocar a legenda.


    // const getDefaultTrack = () => {
    //     const track = tracks.find(t => t.default);

    //     if (track) {
    //         return track;
    //     }

    //     return tracks[0];
    // }

    // const [selectedTrack, setSelectedTrack] = useState(getDefaultTrack());
    const [currentTrackText, setCurrentTrackText] = useState("");
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef();

    const { pause, play, isPlaying } = useAudioPlayer(audioRef.current);

    useEffect(() => {
        setDuration(audioRef.current?.duration);
    }, [audioRef.current]);

    const onPlayPauseClick = event => {
        if (isPlaying) {
            pause();
            return
        }

        play();
    }

    /**
     * Converte segundos para minutos
     * @param {number} seconds 
     */
    const formatTime = seconds => {
        if (!seconds) {
            return "00:00";
        }

        const minutes = Math.floor(seconds / 60);
        const secondsAux = Math.floor(seconds % 60);

        return `${minutes}:${secondsAux < 10 ? '0' : ''}${secondsAux}`;
    }

    /**
     * Atualiza as legendas conforme o áudio é reproduzido
     * @param {*} event 
     * @returns 
     */
    const updateCaption = (event) => {
        if (tracks?.length === 0) return; // se não informou legendas, não precisa fazer nada.        
        const textTracks = [...event.target.textTracks];

        // o mode da legenda utilizada é showing.
        const currentTextTrack = textTracks.find(track => track.mode === "showing");

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
        
        const timeSeek = (value * duration) / 100;

        setCurrentTime(timeSeek);
        audioRef.current.currentTime = timeSeek;
    }

    /**
     * Obtém o tempo atual do vídeo em porcentagem
     * @returns {number}
     */
    const getCurrentTime = () => {
        if(!audioRef.current?.currentTime) return 0;

        return (audioRef.current.currentTime / duration) * 100;
    }

    return (
        <AudioContainer>
            <Caption style={{ display: !currentTrackText ? "none" : "inline-block" }}>
                {currentTrackText}
            </Caption>
            <audio style={{ display: "none" }} ref={audioRef} onTimeUpdate={onTimeUpdate} className={`${lightTheme} ${fieldHightlight}`} controls>
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
                <div>
                    <AudioPlayerProgressControl>
                        <Button text={isPlaying ? "Pausar" : "Reproduzir"} onClick={onPlayPauseClick} />
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
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </AudioPlayerTime>
                </div>
            </AudioPlayer>
            <DownloadLink
                {...captionFile}
            />
        </AudioContainer>
    )
}

export default Audio;