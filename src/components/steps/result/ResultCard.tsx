import { IconCheck, IconCircleCheck, IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "~/components/button/Button";
import { IconAgent } from "~/components/icon/IconAgent";
import { Dialog, DialogContent } from "~/components/modal/dialog";
import { useFormStore } from "~/stores/form";
import { api } from "~/utils/api";
import { formatAmount } from "~/utils/money";

export interface Offre {
  img: string;
  name: string;
  advantages: {
    key_title: string;
    value: Record<string, string>;
    active: boolean;
  }[];
  interest: number | null;
  mensual_payment: number | null;
}

interface Props {
  offre: Offre;
  openRecall: (offre: Offre) => void;
}

const ResultCard: React.FC<Props> = ({ offre, openRecall }) => {
  const { t } = useTranslation("step");
  const { mutateAsync: sendOffer, isLoading } = api.sendOffer.useMutation();
  const lead = useFormStore((state) => state.data);
  const [openSuccess, setOpenSuccess] = useState(false);

  const onSendOffer = async () => {
    try {
      setOpenSuccess(true);
      await sendOffer({
        idlead: lead.idlead ?? "",
        offre: offre.name,
      });
    } catch (e) {
      toast.error(t("result.error_offer"));
    }
  };

  return (
    <>
      <div className="flex w-full flex-col overflow-hidden rounded-xl border-[1.5px] border-[#8888941A] bg-white">
        <div className="flex min-h-[150px] flex-col items-center justify-between gap-10 bg-white p-6 md:flex-row">
          <div className="flex shrink-0 flex-col items-center gap-10 md:flex-row">
            <Image src={offre.img} alt="logo" width={150} height={80} />
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
          <div className="flex w-full items-center gap-4">
            <div className="flex w-full flex-col items-center justify-center">
              <p className="text-[16px] text-grey">{t("result.interest")}</p>
              <p className="text-[24px] font-bold">{offre.interest}%</p>
            </div>
            {offre.mensual_payment && (
              <div className="flex w-full flex-col items-center justify-center">
                <p className="text-[16px] text-grey">{t("result.mensual")}</p>
                <p className="text-[24px] font-bold">
                  {formatAmount(offre.mensual_payment, false)}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full justify-between bg-[#FBF9FA] px-3 py-4">
          <button
            className="flex items-center gap-2 rounded-lg"
            onClick={() => openRecall(offre)}
          >
            <IconAgent size={34} className="shrink-0" />
            <p className="text-[14px] font-medium underline">
              {t("result.talk_conseiller")}
            </p>
          </button>
          <div className="flex w-full items-center justify-between gap-2 md:w-auto">
            <Button
              className="ml-auto w-fit gap-2"
              onClick={() => onSendOffer()}
              loading={isLoading}
            >
              {t("result.contact")}
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={openSuccess} onOpenChange={setOpenSuccess}>
        <DialogContent>
          {/* Scale */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <IconCircleCheck size={60} className="text-primary" />
            <p className="text-[24px] font-bold">{t("result.success")}</p>
            <p className="text-[16px]">{t("result.success_desc")}</p>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResultCard;
