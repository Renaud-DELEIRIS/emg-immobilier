import { type StepId } from "~/constants/step.constant";
import { formatAmount } from "~/utils/formatAmount";
import { IconBulb, IconBulbFilled, IconLighter } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { map } from "zod";
import InfoCard from "../card/InfoCard";
import Gauge from "../gauge/Gauge";
import HypoCalculateur from "../hypoCalculateur/hypoCalculateur";
import { useLead } from "../provider/LeadProvider";
import { useSteps } from "../provider/StepsProvider";

const noPaddingSteps: StepId[] = ["npa", "finish"];

const Info = () => {
  const [withPadding, setWithPadding] = useState(false);
  const { lead, tauxDentement } = useLead();
  const { activeStep } = useSteps();
  const { t: tInfo } = useTranslation("info");
  const { t: tSteps } = useTranslation("steps");
  const Map = dynamic(() => import("./step/Neighborhood"), { ssr: false });

  useEffect(() => {
    if (noPaddingSteps.includes(activeStep.id)) {
      setWithPadding(false);
    } else {
      setWithPadding(true);
    }
  }, [activeStep]);

  const getInfoCard = useCallback(() => {
    switch (activeStep.id) {
      case "price-bien":
        return (
          <div className="flex flex-col gap-4">
            <InfoCard noTitle>
              <div className="grid w-full place-items-center">
                <div className="house">
                  <div
                    className="filler"
                    style={{
                      // Height is at 100% when acquerirPrice is 2000000 and 0% when acquerirPrice is 100000
                      height: `${
                        100 -
                        ((lead.acquerirPrice - 100000) / 1900000 < 0
                          ? 0
                          : (lead.acquerirPrice - 100000) / 1900000 > 1
                          ? 1
                          : (lead.acquerirPrice - 100000) / 1900000) *
                          100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </InfoCard>
            <InfoCard title={tSteps(activeStep.id + ".titleInfo") || ""}>
              <p className="text-center text-2xl text-gray-600">
                {formatAmount(lead.acquerirPrice, {
                  currency: "CHF",
                  local: "de-CH",
                  digit: 0,
                })}
              </p>
            </InfoCard>
          </div>
        );
      case "npa":
        return (
          <div className="h-full w-full">
            {Map !== undefined && (
              <Map
                neightborhood={lead.whereIs?.value}
                completeAddress={
                  lead.acquerirWhat === "alreadyFind" ? true : false
                }
              />
            )}
          </div>
        );
      case "project":
        return (
          <div className="flex flex-col gap-4">
            <InfoCard>{tSteps(activeStep.id + ".information")}</InfoCard>
          </div>
        );
      case "which-step":
        return (
          <div className="flex flex-col gap-4">
            <InfoCard>{tSteps(activeStep.id + ".information")}</InfoCard>
          </div>
        );
      case "rp/rs/bien":
        return (
          <div className="flex flex-col gap-4">
            <InfoCard>{tSteps(activeStep.id + ".information")} </InfoCard>
          </div>
        );
      case "prix-renovation":
        return (
          <div className="flex flex-col gap-4">
            <InfoCard>{tSteps(activeStep.id + ".information")} </InfoCard>
          </div>
        );
      case "nb-emprunteurs":
        return (
          <div className="flex flex-col gap-4">
            <InfoCard>{tSteps(activeStep.id + ".information")} </InfoCard>
          </div>
        );
      case "revenue-anual":
        return (
          <div className="flex flex-col gap-4">
            <InfoCard
              title={tSteps(activeStep.id + ".infoTitle") || ""}
              icon={<IconBulb />}
            >
              {tSteps(activeStep.id + ".information")}
            </InfoCard>
            <InfoCard title={tSteps(activeStep.id + ".infoTitle2") || ""}>
              <div className="flex w-full justify-center">
                <Gauge value={Math.round(tauxDentement * 100)} />
              </div>
            </InfoCard>
          </div>
        );
      case "fonds-propre":
        return (
          <div className="flex flex-col gap-4">
            <InfoCard>{tSteps(activeStep.id + ".information")}</InfoCard>
            <InfoCard
              noTitle
              error={
                lead.fondPropre.bancaire +
                  lead.fondPropre.deuxiemePilier +
                  lead.fondPropre.troisiemePilier +
                  lead.fondPropre.donation <
                lead.acquerirPrice * 0.199
              }
            >
              <HypoCalculateur />
            </InfoCard>
          </div>
        );
      case "hypoteque":
        return (
          <div className="flex flex-col gap-4">
            <InfoCard>{tSteps(activeStep.id + ".information")}</InfoCard>
          </div>
        );

      case "actual-price":
        return (
          <div className="flex flex-col gap-4">
            <InfoCard>{tSteps(activeStep.id + ".information")}</InfoCard>
          </div>
        );
      case "finish":
        return (
          <div className="h-full w-full bg-[url('/finish.jpg')] bg-cover"></div>
        );
      default:
        return null;
    }
  }, [activeStep, lead]);

  return (
    <div
      className={`flex h-full flex-col gap-2 ${
        withPadding ? "px-4 pt-6 md:px-12" : ""
      }`}
    >
      {getInfoCard()}
    </div>
  );
};

export default Info;
