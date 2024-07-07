import Image from "next/image";

export default function Bulbs({ animateBulbs }: { animateBulbs: boolean }) {
  const colors = ["yellow", "red", "blue", "green", "pink", "orange"];
  return (
    <div className="flex justify-evenly w-full absolute top-0">
      {colors.map((color, index) => (
        <div key={index} className="col-md-2 col-xs-2 bulb-holder">
          <Image
            style={{
              animationDelay: animateBulbs ? `${(index + 1) * 1000}ms` : "",
            }}
            className={`${animateBulbs ? "animate-pulse" : ""}`}
            alt="balloon"
            src={`/assets/bulb_${color}.png`}
            width={60}
            height={60}
          ></Image>
        </div>
      ))}
    </div>
  );
}
