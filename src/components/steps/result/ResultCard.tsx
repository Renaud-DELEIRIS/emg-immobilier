import { IconCheck, IconPhoneCall, IconX } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { Button } from "~/components/button/Button";
import { IconAgent } from "~/components/icon/IconAgent";

export interface Offre {
  img: string;
  name: string;
  advantages: {
    key_title: string;
    value: Record<string, string>;
    active: boolean;
  }[];
  interest: number | null;
}

interface Props {
  offre: Offre;
  openRecall: (offre: Offre) => void;
}

const ResultCard: React.FC<Props> = ({ offre, openRecall }) => {
  const { t } = useTranslation("step");
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border-[1.5px] border-[#8888941A] bg-white">
      <div className="flex flex-col items-center justify-between gap-10 bg-white p-6 md:flex-row">
        <div className="flex shrink-0 flex-col items-center gap-10 md:flex-row">
          <Image src={offre.img} alt="logo" width={175} height={80} />
          <ul className="flex flex-col gap-[18px]">
            {offre.advantages.map((advantage, index) => (
              <li key={index} className="flex items-center gap-2.5">
                <div
                  className={`grid h-6 w-6 place-items-center rounded-full ${
                    advantage.active ? "bg-[#0CBCB040]" : "bg-[#88889424]"
                  }`}
                >
                  {advantage.active ? (
                    <IconCheck size={20} className="text-[#006D73]" />
                  ) : (
                    <IconX size={20} className="text-grey" />
                  )}
                </div>
                <p className="text-[14px]">
                  {t(
                    `result.advantages.${advantage.key_title}`,
                    advantage.value
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <p className="text-[16px] text-grey">{t("result.interest")}</p>
          <p className="text-[24px] font-bold">{offre.interest}%</p>
        </div>
      </div>
      <div className="flex w-full justify-between bg-[#FBF9FA] px-3 py-4">
        <div className="hidden items-center gap-2 md:flex">
          <IconAgent size={34} className="shrink-0" />
          <p className="text-[14px] font-medium">
            {t("result.talk_conseiller")}
          </p>
        </div>
        <div className="flex w-full items-center justify-between gap-2 md:w-auto">
          <Button className="w-fit gap-2" onClick={() => openRecall(offre)}>
            <IconPhoneCall size={24} />
            {t("result.contact")}
          </Button>
          <Button onClick={() => openRecall(offre)} className="w-fit gap-2">
            Souscrire
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
