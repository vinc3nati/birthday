export const Cake = ({
  showCake,
  lightCandle,
}: {
  showCake: boolean;
  lightCandle: boolean;
}) => {
  return (
    <div className="mt-5">
      <div className="w-full text-center">
        {/* {showCake && ( */}
        <div
          className={`cake ${
            showCake
              ? "animate-fadeIn opacity-100 visible z-10"
              : "animate-fadeOut opacity-0 invisible -z-10"
          }`}
        >
          <div className="velas">
            {lightCandle && (
              <>
                <div className="fuego"></div>
                <div className="fuego"></div>
                <div className="fuego"></div>
                <div className="fuego"></div>
                <div className="fuego"></div>
              </>
            )}
          </div>
          <div className="cobertura"></div>
          <div className="bizcocho"></div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};
