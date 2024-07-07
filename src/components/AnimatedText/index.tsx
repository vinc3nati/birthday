import { useEffect, useRef, useState } from "react";
import { State } from "../Home";

type FadeProp = { fade: "fade-in" | "fade-out" };

type AnimatedTextProps = {
  WORDS_TO_ANIMATE: Array<any>;
  FADE_INTERVAL_MS?: number;
  WORD_CHANGE_INTERVAL_MS?: number;
  setStep: (args: any) => void;
};

export function AnimatedText({
  WORDS_TO_ANIMATE,
  FADE_INTERVAL_MS = 1750,
  WORD_CHANGE_INTERVAL_MS = FADE_INTERVAL_MS * 2,
  setStep,
}: AnimatedTextProps) {
  const [fadeProp, setFadeProp] = useState<FadeProp>({ fade: "fade-in" });
  const [wordOrder, setWordOrder] = useState(0);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wordTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fadeTimeoutRef.current = setInterval(() => {
      setFadeProp((prevFadeProp) => ({
        fade: prevFadeProp.fade === "fade-in" ? "fade-out" : "fade-in",
      }));
    }, FADE_INTERVAL_MS);

    return () => {
      if (fadeTimeoutRef.current) {
        clearInterval(fadeTimeoutRef.current);
      }
    };
  }, [FADE_INTERVAL_MS]);

  useEffect(() => {
    wordTimeoutRef.current = setInterval(() => {
      setWordOrder((prevWordOrder) => {
        if (prevWordOrder === WORDS_TO_ANIMATE.length - 1) {
          if (wordTimeoutRef.current) {
            clearInterval(wordTimeoutRef.current);
          }
          if (fadeTimeoutRef.current) {
            clearInterval(fadeTimeoutRef.current);
          }
          setStep(State.Carousel);
          return prevWordOrder;
        }
        return (prevWordOrder + 1) % WORDS_TO_ANIMATE.length;
      });
    }, WORD_CHANGE_INTERVAL_MS);

    return () => {
      if (wordTimeoutRef.current) {
        clearInterval(wordTimeoutRef.current);
      }
    };
  }, [WORD_CHANGE_INTERVAL_MS, WORDS_TO_ANIMATE.length]);

  return (
    <h2 className={`${fadeProp.fade} text-xl italic`}>
      {WORDS_TO_ANIMATE[wordOrder]}
    </h2>
  );
}
