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

    return {
        formatTime,
        onProgressTimeChange,
    }
};

export default usePlayer;