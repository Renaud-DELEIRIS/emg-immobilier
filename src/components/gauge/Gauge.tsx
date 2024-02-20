import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";
import style from "./Gauge.module.scss";

interface Props {
  value: number;
}

// Genere moi 28 couleurs qui vert au rouge en passant par le jaune
const colors = ["#0adc1e", "#f3d03e", "#e74b3c"];
const getColor = (value: number) => {
  if (value <= 33) {
    return colors[0];
  } else if (value <= 40) {
    return colors[1];
  } else {
    return colors[2];
  }
};

const Gauge = ({ value }: Props) => {
  const gauge = useRef<SVGSVGElement>(null);
  const [tick, setTick] = useState(1);
  const [valueStore, setValueStore] = useState(1);
  const [tickStore, setTickStore] = useState(1);
  const refTimeout = useRef<NodeJS.Timeout[]>([]);
  const { t } = useTranslation("common");
  const valBetween = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));

  const setPathVisibility = (index: number, visible: boolean) => {
    if (!gauge.current) return;
    const path = gauge.current.querySelector(
      `path:nth-child(${index})`
    ) as SVGPathElement;
    path.style.display = visible ? "block" : "none";
  };

  const resetVisiblePaths = (index: number) => {
    for (let i = 1; i <= index; i++) {
      setPathVisibility(i, true);
    }
    for (let i = index + 1; i <= 28; i++) {
      setPathVisibility(i, false);
    }
  };

  const updateGauge = (newValue: number) => {
    resetVisiblePaths(tickStore);
    const newTick = valBetween(Math.ceil((newValue / 100) * 28), 1, 28);
    const tickDiff = Math.abs(newTick - tickStore);
    const tickDiffValue = Math.abs(newValue - valueStore) / tickDiff;

    let counter = 0;
    const valueStoreTemp = valueStore;
    const tickStoreTemp = tickStore;

    // Reset style from valueStore

    if (newValue > valueStore) {
      for (let i = tickStoreTemp; i <= newTick; i++) {
        refTimeout.current.push(
          setTimeout(() => {
            if (!gauge.current) return;
            const currentPath = gauge.current.querySelector(
              `path:nth-child(${i})`
            ) as SVGPathElement;

            currentPath.style.display = "block";
          }, 50 * counter)
        );
        counter++;
      }
    } else if (newValue < valueStore) {
      for (let i = tickStoreTemp; i >= newTick; i--) {
        refTimeout.current.push(
          setTimeout(() => {
            if (!gauge.current) return;
            const currentPath = gauge.current.querySelector(
              `path:nth-child(${i})`
            ) as SVGPathElement;

            currentPath.style.display = "none";
          }, 50 * counter)
        );
        counter++;
      }
    }

    setTick(newTick);
    setValueStore(newValue);
    setTickStore(newTick);
  };

  useEffect(() => {
    updateGauge(value);
    return () => {
      refTimeout.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, [value]);

  const getFeedBack = (value: number) => {
    if (value <= 33) {
      return t("excellent");
    } else if (value <= 40) {
      return t("passable");
    } else {
      return t("strong");
    }
  };

  return (
    <div
      className={style.speedtest}
      data-min={t("weak")}
      data-max={t("strong")}
    >
      <svg
        className={style.gauge}
        ref={gauge}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
      >
        <path
          style={{
            fill: colors[0],
          }}
          d="M12.9,75.5c0.3,0.5,0.7,0.9,1,1.4l7.6-5.7c-0.3-0.4-0.5-0.7-0.8-1.1L12.9,75.5z"
        />
        <path
          style={{
            fill: colors[0],
            display: "none",
          }}
          d="M9.3,69.3c0.3,0.5,0.5,1,0.8,1.5l8.4-4.4c-0.2-0.4-0.4-0.8-0.6-1.2L9.3,69.3z"
        />
        <path
          style={{
            fill: colors[0],
            display: "none",
          }}
          d="M6.7,62.4C6.9,62.9,7,63.5,7.2,64l9.1-3c-0.1-0.4-0.3-0.8-0.4-1.2L6.7,62.4z"
        />
        <path
          style={{
            fill: colors[0],
            display: "none",
          }}
          d="M5.3,55.2c0,0.6,0.1,1.1,0.2,1.7l9.4-1.5c-0.1-0.4-0.1-0.9-0.2-1.3L5.3,55.2z"
        />
        <path
          style={{
            fill: colors[0],
            display: "none",
          }}
          d="M5,47.9c0,0.6,0,1.1,0,1.7l9.5,0.1c0-0.5,0-0.9,0-1.4L5,47.9z"
        />
        <path
          style={{
            fill: colors[0],
            display: "none",
          }}
          d="M5.9,40.7c-0.1,0.6-0.2,1.1-0.3,1.7L15,44c0.1-0.4,0.2-0.9,0.2-1.3L5.9,40.7z"
        />
        <path
          style={{
            fill: colors[0],
            display: "none",
          }}
          d="M8,33.7c-0.2,0.5-0.4,1.1-0.6,1.6l9,3.1c0.1-0.4,0.3-0.9,0.5-1.3L8,33.7z"
        />
        <path
          style={{
            fill: colors[0],
            display: "none",
          }}
          d="M11.2,27.1c-0.3,0.5-0.5,1-0.8,1.5l8.3,4.6c0.2-0.4,0.4-0.8,0.7-1.2L11.2,27.1z"
        />
        <path
          style={{
            fill: colors[0],
            display: "none",
          }}
          d="M15.5,21.2c-0.4,0.4-0.8,0.9-1.1,1.3l7.5,5.8c0.3-0.4,0.6-0.7,0.9-1.1L15.5,21.2z"
        />
        <path
          style={{
            fill: colors[1],
            display: "none",
          }}
          d="M20.6,16c-0.5,0.3-0.9,0.7-1.3,1.1l6.5,7c0.3-0.3,0.6-0.6,1-0.9L20.6,16z"
        />
        <path
          style={{
            fill: colors[1],
            display: "none",
          }}
          d="M26.4,11.7c-0.5,0.3-0.9,0.6-1.4,0.9l5.3,7.9c0.3-0.2,0.7-0.5,1-0.7L26.4,11.7z"
        />
        <path
          style={{
            fill: colors[1],
            display: "none",
          }}
          d="M33,8.3c-0.6,0.2-1.1,0.5-1.6,0.7l3.9,8.7c0.4-0.2,0.9-0.4,1.3-0.6L33,8.3z"
        />
        <path
          style={{
            fill: colors[2],
            display: "none",
          }}
          d="M39.9,6.1c-0.5,0.1-1.1,0.3-1.6,0.4l2.5,9.2c0.4-0.1,0.8-0.2,1.2-0.3L39.9,6.1z"
        />
        <path
          style={{
            fill: colors[2],
            display: "none",
          }}
          d="M47.2,5.2c-0.6,0-1.1,0-1.7,0.1l0.9,9.4c0.4,0,0.9-0.1,1.3-0.1L47.2,5.2z"
        />
        <path
          style={{
            fill: colors[2],
            display: "none",
          }}
          d="M54.5,5.2c-0.6,0-1.1-0.1-1.7-0.1l-0.6,9.5c0.4,0,0.9,0.1,1.3,0.1L54.5,5.2z"
        />
        <path
          style={{
            fill: colors[2],
            display: "none",
          }}
          d="M61.6,6.5c-0.5-0.1-1.1-0.3-1.6-0.4l-2.2,9.3c0.4,0.1,0.9,0.2,1.3,0.3L61.6,6.5z"
        />
        <path
          style={{
            fill: colors[2],
            display: "none",
          }}
          d="M68.6,9C68,8.7,67.5,8.5,67,8.3l-3.6,8.8c0.4,0.2,0.8,0.3,1.2,0.5L68.6,9z"
        />
        <path
          style={{
            fill: colors[2],
            display: "none",
          }}
          d="M74.9,12.5c-0.4-0.3-0.9-0.6-1.4-0.9l-5,8.1c0.4,0.2,0.7,0.5,1.1,0.7L74.9,12.5z"
        />
        <path
          style={{
            fill: colors[2],
            display: "none",
          }}
          d="M80.6,17c-0.5-0.4-0.9-0.7-1.3-1.1l-6.2,7.2c0.3,0.3,0.7,0.6,1,0.9L80.6,17z"
        />
        <path
          style={{
            fill: colors[2],
            display: "none",
          }}
          d="M85.7,22.4c-0.4-0.4-0.7-0.9-1.1-1.3l-7.4,6.1c0.3,0.3,0.5,0.7,0.8,1L85.7,22.4z"
        />
        <path
          style={{
            fill: colors[2],
            display: "none",
          }}
          d="M89.6,28.6c-0.2-0.5-0.5-1-0.8-1.5L80.6,32c0.2,0.4,0.4,0.7,0.6,1.1L89.6,28.6z"
        />
        <path
          style={{
            fill: colors[2],
            display: "none",
          }}
          d="M92.5,35.3c-0.2-0.5-0.4-1.1-0.6-1.6l-8.8,3.4c0.2,0.4,0.3,0.8,0.5,1.2L92.5,35.3z"
        />
        <path
          style={{
            fill: colors[2],
            display: "none",
          }}
          d="M94.4,42.2c-0.1-0.5-0.2-1.1-0.3-1.6l-9.4,2c0.1,0.4,0.2,0.9,0.2,1.3L94.4,42.2z"
        />
        <path
          style={{
            fill: colors[2],
            display: "none",
          }}
          d="M95,47.8l-9.5,0.5c0,0.4,0,0.9,0,1.3l9.5-0.1C95,48.9,95,48.4,95,47.8z"
        />
        <path
          style={{
            fill: colors[2],
            display: "none",
          }}
          d="M94.5,56.8c0.1-0.5,0.1-1.1,0.2-1.7l-9.4-1c-0.1,0.4-0.1,0.9-0.2,1.3L94.5,56.8z"
        />
        <path
          style={{
            fill: colors[2],
            display: "none",
          }}
          d="M92.8,63.9c0.2-0.5,0.3-1,0.5-1.7l-9.1-2.6c-0.1,0.4-0.3,0.9-0.4,1.3L92.8,63.9z"
        />
        <path
          style={{
            fill: colors[2],
            display: "none",
          }}
          d="M90,70.7c0.2-0.5,0.5-1,0.8-1.5l-8.7-4.1c-0.2,0.4-0.4,0.8-0.6,1.2L90,70.7z"
        />
        <path
          style={{
            fill: colors[2],
            display: "none",
          }}
          d="M86.2,77.1c0.3-0.5,0.6-1,0.9-1.5l-8.2-5.6c-0.2,0.4-0.5,0.8-0.7,1.2L86.2,77.1z"
        />
      </svg>
      <div
        className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-all duration-500 ease-in-out`}
        style={{
          color: getColor(value),
        }}
      >
        <div className={`flex items-start gap-1 text-2xl`}>
          {valueStore}
          <span className={`text-lg`}>%</span>
        </div>
        <span className={`text-sm font-light`}>{getFeedBack(valueStore)}</span>
      </div>
    </div>
  );
};

export default Gauge;
