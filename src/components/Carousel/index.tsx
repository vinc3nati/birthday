import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";

export const CarouselItem = ({ children, width, ...props }) => {
  return (
    <div
      className="carousel-item"
      style={{ ...props.style, width: width }}
      {...props}
    >
      {children}
    </div>
  );
};

const Carousel = ({ children, delay, defaultActive = 0, ...props }) => {
  const [activeIndex, setActiveIndex] = useState(defaultActive - 1 || 0);
  const [paused, setPaused] = useState(false);
  const interval = useRef(0);

  const SLIDE_DELAY = useMemo(() => (delay ? delay : 5000), [delay]);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    interval.current = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, SLIDE_DELAY);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  return (
    <div
      {...handlers}
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      {...props}
    >
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="indicators">
        <button
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
          className="prev"
          title="previous slide"
        >
          {"<"}
        </button>
        {React.Children.map(children, (child, index) => {
          return (
            <button
              className={`${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                updateIndex(index);
              }}
              title={`${index + 1} slide`}
            >
              {index + 1}
            </button>
          );
        })}
        <button
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
          className="next"
          title="next slide"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
