import { motion } from "framer-motion";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFormStore } from "~/stores/form";
import { api } from "~/utils/api";
import { Button } from "../button/Button";
import { Alert, AlertTitle } from "../feedback/alert";
import Input, { PhoneNumberInput } from "../inputs/input";
import CodeModal from "../modal/codeModal";
import { useGtmtrack } from "../provider/GmtTrack";
import { StepDescription, StepTitle } from "./StepContainer";

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

  const [toShowContact, setToShowContact] = useState(false);

  useEffect(() => {
    if (lead.nom && lead.nom.length > 3) {
      setToShowContact(true);
    }
  }, [lead]);

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

  const isAllValid =
    lead.nom.length > 0 && isValidPhoneNumber(lead.phone ?? "");

  return (
    <>
      <motion.div
        className="mx-auto flex w-full max-w-[350px] flex-1 flex-col pt-0 md:max-w-2xl md:pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        id="verif"
      >
        <Alert
          variant={"info"}
          noTitle
          className="flex flex-row gap-2 md:pl-[160px]"
        >
          <Image
            src="/victor.png"
            width={146}
            height={146}
            alt="mascotte"
            className="absolute bottom-0 left-[1rem] hidden shrink-0 md:block"
          />
          <div className="flex flex-col gap-2">
            <AlertTitle>{t`verif.alert.title`}</AlertTitle>
            <span>{t`verif.alert.message`}</span>
          </div>
        </Alert>
        <div className="my-10 flex flex-col gap-5">
          <label htmlFor="name" className="text-[22px] font-semibold">
            {t`verif.label`}
          </label>
          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
            <Input
              id="name"
              name="name"
              type="text"
              value={lead.prenom}
              onChange={(e) =>
                changeLead({
                  prenom: e,
                })
              }
              placeholder={t`verif.placeholder_first`}
              valid={lead.prenom.length > 0}
            />
            <Input
              id="lastname"
              name="lastname"
              type="text"
              value={lead.nom}
              onChange={(e) =>
                changeLead({
                  nom: e,
                })
              }
              placeholder={t`verif.placeholder_last`}
              valid={lead.nom.length > 0}
            />
          </div>
        </div>

        {toShowContact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2.5">
              <StepTitle>{t`verif.label_contact`}</StepTitle>
              <StepDescription>{t`verif.contact_description`}</StepDescription>
            </div>
            <div className="grid grid-cols-1 gap-[18px]">
              <PhoneNumberInput
                id="phone"
                name="phone"
                value={lead.phone}
                onChange={(e) =>
                  changeLead({
                    phone: e,
                  })
                }
                placeholder={t`verif.placeholder_phone`}
                valid={isValidPhoneNumber(lead.phone ?? "")}
              />
            </div>
          </motion.div>
        )}

        {isAllValid && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10 flex justify-center"
          >
            <Button
              variant={"thirdy"}
              onClick={() => void onOpenCode()}
              disabled={!isAllValid}
            >
              {t`verif.action`}
            </Button>
          </motion.div>
        )}
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
