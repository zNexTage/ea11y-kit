import { useState } from "react"

const useAudioPlayer = (audio) => {
    const [isPlaying, setIsPlaying] = useState();

    const play = () => {
        audio.play();
        setIsPlaying(true);
    }
    const pause = () => {
        audio.pause();
        setIsPlaying(false);
    }

    return {
        play,
        pause,
        isPlaying
    }
}

export default useAudioPlayer;