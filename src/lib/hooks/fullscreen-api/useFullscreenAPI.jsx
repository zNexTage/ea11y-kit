/**
 * Facilita a interação com a API de fullscreen do navegador
 */
const useFullscreenAPI = () => {
    /**
     * Indica se o navegador suporta a API Fullscreen
     * @returns {boolean}
     */
    const isBrowserSupports = () => {
        return !!(document.fullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled ||
            document.webkitSupportsFullscreen ||
            document.webkitFullscreenEnabled
        );
    }

    /**
     * Ativa o modo fullscreen
     * @param {*} element 
     */
    const activeFullscreen = element => {
        if (element.requestFullscreen) {
            element.requestFullscreen();
            return true;
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
            return true;
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
            return true;
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
            return true;
        }

        return false;
    }

    /**
     * Sai do modo fullscreen. De acordo com https://stackoverflow.com/questions/36672561/how-to-exit-fullscreen-onclick-using-javascript
     * deve-se sair do modo fullscreen usando o document em vez de utilizar a referência do elemento
     * que ativou o modo fullscreen.
     */
    const exitFullscreen = () => {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
    }

    return {
        isBrowserSupports,
        exitFullscreen,
        activeFullscreen
    }
}

export default useFullscreenAPI;