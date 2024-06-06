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

    return {
        formatTime
    }
};

export default usePlayer;