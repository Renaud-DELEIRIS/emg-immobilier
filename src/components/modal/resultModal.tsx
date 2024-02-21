import { IconCircleCheckFilled, IconPhoneCall } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { toast } from "react-toastify";
import { useFormStore } from "~/stores/form";
import { api } from "~/utils/api";
import { isValidPhone } from "~/utils/validation/phone.validation";
import { Button } from "../button/Button";
import GoogleReview from "../feedback/GoogleReview";
import { Offre } from "../steps/result/ResultCard";
import { Dialog, DialogContent } from "./dialog";

const ResultModal = ({
  open,
  offre,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
  offre: Offre;
}) => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const { t } = useTranslation("step");
  const { t: tHeader } = useTranslation("header");
  const { mutateAsync, isLoading } = api.beCalled.useMutation();

  const onRecall = async () => {
    try {
      await mutateAsync({ phone: lead.phone, idlead: lead.idlead });
      toast.success(tHeader("recall.success"));
    } catch (e) {
      toast.error(tHeader("recall.error"));
    }
    onClose();
  };

  const onRdv = () => {};

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        effect="slide-down"
        className="flex max-w-[348px] flex-col items-center justify-center md:max-w-[348px]"
      >
        <div className="absolute  top-0 flex -translate-y-1/2  items-center -space-x-3.5">
          <Image
            src={"/agent/agent2.png"}
            width={56}
            height={56}
            alt="agent"
            className="z-[1] rounded-full"
          />
          <Image
            src={"/agent/agent1.png"}
            width={68}
            height={68}
            alt="agent"
            className="z-10 rounded-full"
          />
          <Image
            src={"/agent/agent3.png"}
            width={56}
            height={56}
            alt="agent"
            className="z-[1] rounded-full"
          />
        </div>
        <div className="mb-5 mt-7 flex flex-col items-center justify-between text-center">
          <span className="text-[14px] text-[#131317]">
            {t("result.recall.description")}
          </span>
          <span className="text-[18px] font-bold text-[#131317]">
            {t("result.recall.free")}
          </span>
        </div>

        <div className="mb-6 flex w-full flex-col items-center gap-2.5 [&>button]:w-full">
          <Button
            disabled={!isValidPhone(lead.phone)}
            onClick={() => void onRecall()}
            loading={isLoading}
            variant={"outline"}
          >
            <IconPhoneCall size={24} className="mr-1" />
            {t("result.recall.action")}
          </Button>
          <span className="text-[14px] font-bold uppercase text-[#131317]">
            {t("result.recall.or")}
          </span>
          <Button onClick={onRdv}>{t("result.recall.rdv")}</Button>
        </div>

        <div className="mb-5 flex items-center gap-2">
          <IconCircleCheckFilled
            size={24}
            className="shrink-0 text-[#131317]"
          />
          <span className="text-[12px] text-[#131317]">
            {t("result.recall.info")}
          </span>
        </div>

        <GoogleReview theme="white" />
      </DialogContent>
    </Dialog>
  );
};

export default ResultModal;
