import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Trans, useTranslation } from "next-i18next";
import Image from "next/image";
import { useState } from "react";
import { BiSolidLeaf } from "react-icons/bi";
import { BsFillHeartPulseFill } from "react-icons/bs";
import { CiPill } from "react-icons/ci";
import { FaAmbulance, FaHospital, FaHotTub } from "react-icons/fa";
import { MdHearing, MdPregnantWoman } from "react-icons/md";
import { TbStethoscope, TbWorld } from "react-icons/tb";
import Button from "~/components/button/Button";
import { PackFrontalier } from "~/constants/frontalier.constant";
import { useFormStore } from "~/stores/form";
import formatAmount from "~/utils/formatAmount";

const Recapitulatif = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const pack = PackFrontalier.find(
    (p) => p.name === lead.selectedOfferFrontalier
  ) as (typeof PackFrontalier)[0];
  const price = pack ? pack.price : () => 0;
  const { t } = useTranslation("frontalier");
  const { t: tCommon } = useTranslation("common");
  const adherent = lead.adherent[lead.selectedAdherent[0]!];

  const prestations = [
    {
      label: "RECAP_PRESTA_HOSPITALISATION",
      icon: <FaHospital />,
      description: "RECAP_PRESTA_HOSPITALISATION_DESCRIPTION",
    },
    {
      label: "RECAP_PRESTA_PROTECTION",
      icon: <TbWorld />,
      description: "RECAP_PRESTA_PROTECTION_DESCRIPTION",
    },
    {
      label: "RECAP_PRESTA_TRANSPORT",
      icon: <FaAmbulance />,
      description: "RECAP_PRESTA_TRANSPORT_DESCRIPTION",
    },
    {
      label: "RECAP_PRESTA_MEDICAMENTS",
      icon: <CiPill />,
      description: "RECAP_PRESTA_MEDICAMENTS_DESCRIPTION",
    },
    {
      label: "RECAP_PRESTA_TRAITEMENTS",
      icon: <TbStethoscope />,
      description: "RECAP_PRESTA_TRAITEMENTS_DESCRIPTION",
    },
    {
      label: "RECAP_PRESTA_TRAITEMENTS_2",
      icon: <BiSolidLeaf />,
      description: "RECAP_PRESTA_TRAITEMENTS_2_DESCRIPTION",
    },
    {
      label: "RECAP_PRESTA_PREVENTION",
      icon: <BsFillHeartPulseFill />,
      description: "RECAP_PRESTA_PREVENTION_DESCRIPTION",
    },
    {
      label: "RECAP_PRESTA_MOYENS",
      icon: <MdHearing />,
      description: "RECAP_PRESTA_MOYENS_DESCRIPTION",
    },
    {
      label: "RECAP_PRESTA_GROSSESSE",
      icon: <MdPregnantWoman />,
      description: "RECAP_PRESTA_GROSSESSE_DESCRIPTION",
    },
    {
      label: "RECAP_PRESTA_CURES",
      icon: <FaHotTub />,
      description: "RECAP_PRESTA_CURES_DESCRIPTION",
    },
  ];
  const [faqOpen, setFaqOpen] = useState<number[]>([]);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-2">
      <div className="mx-auto mb-6 flex w-fit flex-col items-center justify-center gap-4 border-b border-dark px-8 pb-6">
        <Image
          src={"/images/" + pack.hash + ".png"}
          width={128}
          height={128}
          alt={pack.name}
        />
        <span className="text-lg font-bold text-dark md:text-xl">
          {formatAmount(
            price(
              dayjs().diff(
                dayjs(adherent ? adherent.year : "1980", "YYYY"),
                "year"
              ),
              adherent ? !!adherent.couverture : false
            ),
            0
          )}{" "}
          / {t("MONTH")}
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        <li className="flex gap-4">
          <IconCheck className="flex-shrink-0 text-green-500" size={28} />
          <span className="text-base md:text-lg">{t("RECAP_ADVANTAGE_1")}</span>
        </li>
        <li className="flex gap-4">
          <IconCheck className="flex-shrink-0 text-green-500" size={28} />
          <span className="text-base md:text-lg">{t("RECAP_ADVANTAGE_2")}</span>
        </li>
        <li className="flex gap-4">
          <IconCheck className="flex-shrink-0 text-green-500" size={28} />
          <span className="text-base md:text-lg">{t("RECAP_ADVANTAGE_3")}</span>
        </li>
      </ul>
      <Button
        onClick={() => {
          nextStep("recap-frontalier");
        }}
        className="mb-6 mt-6"
      >
        {t("RECAP_CONTINUE")}
      </Button>
      <h3 className="text-lg font-bold md:text-xl">
        {t("RECAP_PRESTA_TITLE")}
      </h3>
      <ul className="flex flex-col divide-y divide-neutral-300 border-y border-neutral-300">
        {prestations.map((presta, i) => {
          const isOpen = faqOpen.includes(i);
          return (
            <li key={i}>
              <button
                onClick={() =>
                  setFaqOpen((prev) => {
                    if (prev.includes(i)) {
                      return prev.filter((p) => p !== i);
                    }
                    return [...prev, i];
                  })
                }
                className="flex w-full  flex-col"
              >
                <div className="flex w-full items-center gap-4 px-2 py-2 text-left">
                  <div className="flex-shrink-0 text-xl">{presta.icon}</div>

                  <span className="text-base md:text-lg">
                    {t(presta.label)}
                  </span>
                  <IconChevronDown
                    className={`ml-auto flex-shrink-0 text-neutral-500 transition-transform ${
                      isOpen ? "rotate-180 transform" : ""
                    }`}
                  />
                </div>
                <div
                  className={`grid ${
                    isOpen ? "grid-rows-[1fr] py-2" : "grid-rows-[0fr]"
                  } transition-[grid-template-rows,padding]`}
                >
                  <div className={`overflow-hidden ${isOpen ? "" : ""}`}>
                    <p className="text-left text-sm text-neutral-500 md:text-base">
                      <Trans t={t} i18nKey={presta.description} />
                    </p>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Recapitulatif;
