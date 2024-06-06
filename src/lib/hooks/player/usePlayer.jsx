/**
 * Disponibiliza funções para interagir com componentes multimídia.
 * @returns 
 */
const usePlayer = () => {

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
     * Altera o tempo do vídeo para o tempo requisitado no range.
     * @param {number} timeSeek - tempo do vídeo que foi requisitado
     * @param {*} elementDuration  - duração total do vídeo
     * @returns 
     */
    const onProgressTimeChange = (timeSeek, elementDuration) => {
        const value = Number.parseFloat(timeSeek);

        return (value * elementDuration) / 100;
    }

    /**
     * Obtém a legenda definida como padrão
     * @param {Array<TextTrack>} tracks 
     * @returns 
     */
    const getDefaultTrack = tracks => {
        const track = tracks.filter(t => t.default)[0];

        if (track) {
            return track;
        }

        return tracks[0];
    }

    /**
     * Altera a legenda com base na escolha do usuário
     * @param {Array<TextTrack>} textTracks - Legendas disponíveis
     * @param {TextTrack} selectedTrack - Legenda selecionada pelo usuário
     * @returns 
     */
    const changeCaptionLang = (textTracks, selectedTrack) => {
        // desabilita as outras legendas.
        textTracks.forEach(track => {
            track.mode = "disabled";
        });

        // demonstra a legenda selecionada.
        const textTrack = textTracks.find(track => track.language === selectedTrack.srcLang);

        if (!textTrack) return; // não faz nada se não localizar a legenda.
        textTrack.mode = "showing";
    }

    return {
        formatTime,
        onProgressTimeChange,
        changeCaptionLang,
        getDefaultTrack
    }
};

export default usePlayer;