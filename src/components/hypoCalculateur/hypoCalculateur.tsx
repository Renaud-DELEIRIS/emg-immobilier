import React from "react";

import style from "./hypoCalculateur.module.scss";
import HypoCalculateurData from "./hypoCalculateurData";
export interface IHypoCalculateur {
  className?: string;
}

const HypoCalculateur: React.FC<IHypoCalculateur> = ({ className = "" }) => {
  return (
    <div className={`${className} w-full`.replace(/\s+/g, " ").trim()}>
      <div className={style.container}>
        {/* <HypoCalculateurSettings /> */}
        <HypoCalculateurData />
      </div>
    </div>
  );
};

export default HypoCalculateur;
