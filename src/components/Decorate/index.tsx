import Image from "next/image";

export const Decorate = ({ showBanner }: { showBanner: boolean }) => {
  return (
    <div
      className={`text-center absolute mx-auto transition-transform ${
        showBanner
          ? "animate-banner_come -translate-y-[30dvh]"
          : "-translate-y-[100dvh]"
      }`}
    >
      <Image
        src="/assets/banner.png"
        alt="Birthday Banner"
        width={400}
        height={100}
        className=""
      />
    </div>
  );
};
