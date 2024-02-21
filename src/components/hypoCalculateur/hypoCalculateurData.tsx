import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useHypoCalculateur } from "../provider/ResultProvider";
import style from "./hypoCalculateur.module.scss";

const HypoCalculateurData = () => {
  const [tauxInteretRetenu, setTauxInteretRetenu] = useState(5);
  const { graphData } = useHypoCalculateur();

  const { t } = useTranslation("step");

  return (
    <div className={style.data_wrapper}>
      <div className={style.chart_wrapper}>
        <div className={style.chart_svg}>
          <svg version="1.1">
            <circle cx="90" cy="90" r="90" />
            <circle
              cx="90"
              cy="90"
              r="90"
              style={
                {
                  "--value": graphData[0],
                } as React.CSSProperties
              }
            />
            <circle
              cx="90"
              cy="90"
              r="90"
              style={
                {
                  "--value": graphData[1],
                } as React.CSSProperties
              }
            />
          </svg>
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
