import { IconPhoneCall, IconX } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import { useFormStore } from "~/stores/form";
import { api } from "~/utils/api";
import { isValidPhone } from "~/utils/validation/phone.validation";
import { Button } from "../button/Button";
import { Alert, AlertDescription } from "../feedback/alert";
import { PhoneNumberInput } from "../inputs/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";

const RecallModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const { t } = useTranslation("header");
  const { mutateAsync, isLoading } = api.beCalled.useMutation();

  const onRecall = async () => {
    try {
      await mutateAsync({ phone: lead.phone, idlead: lead.idlead });
      toast.success(t("recall.success"));
    } catch (e) {
      toast.error(t("recall.error"));
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent effect="slide-down">
        <DialogHeader>
          <DialogTitle>{t("recall.title")}</DialogTitle>
          <button
            className="rounded-full p-0.5 text-primary hover:bg-primary/10"
            onClick={() => setOpen(false)}
          >
            <IconX size={24} />
          </button>
        </DialogHeader>
        <span className="text-base leading-5">{t("recall.description")}</span>
        <PhoneNumberInput
          value={lead.phone || ""}
          onChange={(val) => {
            if (!val) return;
            changeLead({ phone: val });
          }}
          required
          className="my-4"
          placeholder="079 123 45 67"
          valid={isValidPhone(lead.phone)}
        />
        <Alert variant="info" noTitle>
          <AlertDescription>{t("recall.alert")}</AlertDescription>
        </Alert>
        <Button
          variant={"thirdy"}
          disabled={!isValidPhone(lead.phone)}
          className="mt-[14px]"
          onClick={() => void onRecall()}
          loading={isLoading}
        >
          <IconPhoneCall size={24} className="mr-1" />
          {t("recall.modalAction")}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RecallModal;
