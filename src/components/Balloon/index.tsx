import { useWindowSize } from "@/hooks/useWindowSize";
import Confetti from "react-confetti";

export const Balloons = ({ showBalloons }: { showBalloons: boolean }) => {
  const { width, height } = useWindowSize();
  return (
    <>
      <div
        className={`absolute transition-all duration-[3000ms] w-full 
      ${showBalloons ? "-translate-y-[100dvh]" : "translate-y-[100dvh]"}`}
      >
        <img
          src={"/assets/Balloon-Border.png"}
          alt="Balloons"
          className="w-full"
        />
      </div>
      {showBalloons && <Confetti width={width} height={height} />}
    </>
  );
};
