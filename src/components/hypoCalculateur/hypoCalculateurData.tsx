import { useState } from "react";
import { useTranslation } from "react-i18next";

import { EmgHouseCheck } from "../icon/EmgHouseCheck";
import { useHypoCalculateur } from "../provider/ResultProvider";
import style from "./hypoCalculateur.module.scss";

const HypoCalculateurData = () => {
  const [tauxInteretRetenu, setTauxInteretRetenu] = useState(5);
  const { graphData } = useHypoCalculateur();

  const { t } = useTranslation("step");
  const id1 = "linear-gradient-1";
  const id2 = "linear-gradient-2";

  return (
    <div className={style.data_wrapper}>
      <div className={style.chart_wrapper}>
        <div className={style.chart_svg}>
          <svg
            version="1.1"
            className={style.graph}
            style={{
              rotate: "90deg",
              scale: "1 -1",
            }}
          >
            <circle cx="90" cy="90" r="90" />
            <circle
              cx="90"
              cy="90"
              r="90"
              fill="none"
              stroke={`url(#${id1})`}
              style={
                {
                  "--value": graphData[0],
                } as React.CSSProperties
              }
            />
            <circle
              cx="90"
              cy="90"
              fill="none"
              r="90"
              stroke={`url(#${id2})`}
              style={
                {
                  "--value": graphData[1],
                } as React.CSSProperties
              }
            />
            <defs>
              <filter
                id="filter0_d_1518_1876"
                x="0.0533485"
                y="0.535153"
                width="115.969"
                height="211.967"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="-2.48862" />
                <feGaussianBlur stdDeviation="4.97723" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1518_1876"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1518_1876"
                  result="shape"
                />
              </filter>
              <linearGradient id={id1} x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#7AD3FF" />
                <stop offset="100%" stopColor="#4FBAF0" />
              </linearGradient>
              <linearGradient id={id2} x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#B09FFF" />
                <stop offset="100%" stopColor="#8D79F6" />
              </linearGradient>
            </defs>
          </svg>
          <div
            className="absolute inset-0 left-1/2 top-1/2
           h-fit w-fit -translate-x-1/2 -translate-y-1/2
          "
          >
            <EmgHouseCheck size={70} />
          </div>
        </div>
        <div className="flex w-full flex-row justify-between">
          <div className={style.chart_legend}>
            <div
              className={`${style.chart_legend_percent ?? ""}  ${
                style.blue ?? ""
              }`}
            >
              <span className={style.chart_legend_percent_value}>
                {graphData[0]}
              </span>
              <span className={style.chart_legend_percent_unit}>%</span>
            </div>
            <div className={style.chart_legend_text}>
              <span className={style.chart_legend_text_value}>
                {t("fonds_propres.chartText1")}
              </span>
            </div>
          </div>
          <div className={style.chart_legend}>
            <div
              className={`${style.chart_legend_percent ?? ""}  ${
                style.green ?? ""
              }`}
            >
              <span className={style.chart_legend_percent_value}>
                {graphData[1]}
              </span>
              <span className={style.chart_legend_percent_unit}>%</span>
            </div>
            <div className={style.chart_legend_text}>
              <span className={style.chart_legend_text_value}>
                {t("fonds_propres.chartText2")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HypoCalculateurData;
