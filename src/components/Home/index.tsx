import { useAudio } from "@/hooks/useAudio";
import { IMAGES, WISH_TEXT } from "@/utils/constant";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedText } from "../AnimatedText";
import { Balloons } from "../Balloon";
import Bulbs from "../Bulbs";
import { Button } from "../Button/Button";
import { Cake } from "../Cake";
import Carousel, { CarouselItem } from "../Carousel";
import { Decorate } from "../Decorate";

export enum State {
  LightsOff,
  LightsOn,
  PlayMusic,
  Decorate,
  Balloons,
  Cake,
  LightCandle,
  Birthday,
  Message,
  Carousel,
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [animationClass, setAnimationClass] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const { togglePlayback } = useAudio(
    "https://res.cloudinary.com/randomwave45/video/upload/v1719131068/hbd_ij6rul.mp3"
  );

  const ButtonActions = useMemo(() => {
    return {
      [State.LightsOff]: {
        text: "Turn On Lights",
        onClick: () => {
          setStep(State.LightsOn);
          containerRef.current?.classList.remove("bg-black");
          containerRef.current?.classList.add("animate-fadeIn", "animate-bg");
          setAnimationClass(() => "animate-fadeIn");
        },
      },
      [State.LightsOn]: {
        text: "Play Music",
        onClick: () => {
          setStep(State.PlayMusic);
          togglePlayback();
          setAnimationClass(() => "animate-fadeIn");
        },
      },
      [State.PlayMusic]: {
        text: "Let's Decorate",
        onClick: () => {
          setStep(State.Decorate);
          setAnimationClass(() => "animate-fadeIn");
        },
      },
      [State.Decorate]: {
        text: "Fly Balloons",
        onClick: () => {
          setStep(State.Balloons);
          setAnimationClass(() => "animate-fadeIn");
        },
      },
      [State.Balloons]: {
        text: "Most Delicious Cake",
        onClick: () => {
          setStep(State.Cake);
          setAnimationClass(() => "animate-fadeIn");
        },
      },
      [State.Cake]: {
        text: "Light candle",
        onClick: () => {
          setStep(State.LightCandle);
          setAnimationClass(() => "animate-fadeIn");
        },
      },
      [State.LightCandle]: {
        text: "Happy Birthday",
        onClick: () => {
          setStep(State.Birthday);
          setAnimationClass(() => "animate-fadeIn");
        },
      },
      [State.Birthday]: {
        text: "Message for you",
        onClick: () => {
          setStep(State.Message);
          setAnimationClass(() => "animate-fadeIn");
        },
      },
      // [State.Message]: {
      //   text: "Message for you",
      //   onClick: () => {
      //     setStep(State.Message);
      //     setAnimationClass(() => "animate-fadeIn");
      //   },
      // },
    };
  }, [step]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (timeoutId) clearTimeout(timeoutId);
      setAnimationClass(""); // Reset animation class after duration
    }, 1000); // Adjust animation duration (ms)

    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, [step]);

  return (
    <div
      ref={containerRef}
      className={` w-full h-screen flex justify-center items-center relative bg-black`}
    >
      {step > State.LightsOff && step < State.Carousel && (
        <Bulbs animateBulbs={step >= State.PlayMusic} />
      )}
      {step < State.Message && (
        <>
          <Decorate showBanner={step >= State.Decorate} />
          <Balloons showBalloons={step >= State.Balloons} />

          <Cake
            showCake={step >= State.Cake}
            lightCandle={step >= State.LightCandle}
          />

          {step >= State.Birthday && step < State.Message && (
            <h2 className="absolute mt-3 text-center text-xl uppercase tracking-wide text-white top-[60%] animate-fadeIn">
              Happiest Birthday Badhir!!! ❤️ 🎉
            </h2>
          )}
        </>
      )}
      {step === State.Message && (
        <AnimatedText WORDS_TO_ANIMATE={WISH_TEXT} setStep={setStep} />
      )}
      {step === State.Carousel && (
        <div className="px-2 flex flex-col gap-2">
          <h3 className="text-center text-xl">Reliving Memories</h3>
          <Carousel delay={3000}>
            {IMAGES?.map((item) => (
              <CarouselItem key={item}>
                <Image
                  quality={100}
                  unoptimized
                  src={item}
                  alt={item}
                  width={100}
                  height={100}
                />
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      )}

      {step < State.Message && (
        <Button
          customStyle={`fixed bottom-10 z-50 ${animationClass}`}
          // @ts-ignore
          onClick={ButtonActions[step].onClick}
        >
          {/* @ts-ignore */}
          {ButtonActions[step].text}
        </Button>
      )}
    </div>
  );
}
