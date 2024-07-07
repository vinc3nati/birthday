import { useEffect, useState } from "react";

export const useAudio = (url: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlayback = () => {
    setPlaying(!playing);
    if (audio) audio.loop = true;
  };

  useEffect(() => {
    setAudio(new Audio(url));
  }, []);

  useEffect(() => {
    if (!audio) return;
    if (playing) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (!audio) return;
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return { playing, togglePlayback };
};
