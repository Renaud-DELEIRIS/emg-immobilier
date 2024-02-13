import { IconCircleCheck } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { toast } from "react-toastify";
import { useFormStore } from "~/stores/form";
import { api } from "~/utils/api";
import { isValidPhone } from "~/utils/validation/phone.validation";
import { Button } from "../button/Button";
import { PhoneNumberInput } from "../inputs/input";
import CodeModal from "../modal/codeModal";
import { useGtmtrack } from "../provider/GmtTrack";

const Verif = () => {
  const { t } = useTranslation("step");
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const versionId = useFormStore((state) => state.versionId);
  const [openCode, setOpenCode] = useState(false);
  const [verifCode, setVerifCode] = useState("");
  const { mutateAsync, isLoading } = api.sendSmsCode.useMutation();
  const { mutateAsync: createLead, isLoading: isCreating } =
    api.createDigitaxeLead.useMutation();
  const { params } = useGtmtrack();

  const onOpenCode = async () => {
    try {
      setOpenCode(true);
      const idlead = await createLead({
        data: lead,
        idtracking: versionId === null ? undefined : versionId,
        gtmparams: params,
        idlead: lead.idlead,
      });
      const code = await mutateAsync({ phone: lead.phone });
      changeLead({ idlead });
      setVerifCode(code.toString());
    } catch (e) {
      toast.error(t("verif.error"));
      console.error(e);
    }
  };

  const onCompletion = async (code: string) => {
    if (code !== verifCode) throw new Error("Code is not valid");
    await createLead({
      data: lead,
      idtracking: versionId === null ? undefined : versionId,
      gtmparams: params,
      idlead: lead.idlead,
    });
    setOpenCode(false);
    changeLead({ verified: true });
    nextStep("verif");
  };

  return (
    <>
      <motion.div
        className="mx-auto flex w-full max-w-[350px] flex-1 flex-col items-center justify-center text-center md:max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        id="verif"
      >
        <IconCircleCheck size={100} className="text-secondary" />
        <h2 className="mt-6 text-2xl font-semibold">
          {t("verif.thanks", {
            name: lead.prenom ? lead.prenom : lead.nom ? lead.nom : "",
          })}
        </h2>
        <div>
          <p className="mt-2">{t("verif.more_info")} </p>
          <PhoneNumberInput
            value={lead.phone}
            onChange={(value) => changeLead({ phone: value })}
            wrapperClassName="mt-4"
            placeholder="079 123 45 67"
            valid={isValidPhone(lead.phone)}
          />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-6"
          >
            <Button
              variant={"thirdy"}
              disabled={!isValidPhone(lead.phone)}
              onClick={() => void onOpenCode()}
              loading={openCode || isLoading || isCreating}
            >
              {t("verif.action")}
            </Button>
          </motion.div>
        </div>
      </motion.div>
      <CodeModal
        open={openCode}
        setOpen={setOpenCode}
        onVerify={onCompletion}
      />
    </>
  );
};

export default Verif;
