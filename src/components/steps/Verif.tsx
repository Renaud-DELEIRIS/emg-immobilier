import { useGTMDispatch } from "@elgorditosalsero/react-gtm-hook";
import { motion } from "framer-motion";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFormStore } from "~/stores/form";
import { api } from "~/utils/api";
import { isValidEmail } from "~/utils/validation/email.validation";
import { Button } from "../button/Button";
import { Alert, AlertTitle } from "../feedback/alert";
import Input, { PhoneNumberInput } from "../inputs/input";
import CodeModal from "../modal/codeModal";
import { Dialog, DialogContent } from "../modal/dialog";
import { useGtmtrack } from "../provider/GmtTrack";
import StepContainer, { StepTitle } from "./StepContainer";

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
    api.createHypothequeLead.useMutation();
  const { params } = useGtmtrack();
  const gtmDispatch = useGTMDispatch();

  const [toShowContact, setToShowContact] = useState(false);
  const [showExample, setShowExample] = useState(false);

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
      gtmDispatch({ event: "leadOk" });

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
      data: {
        ...lead,
        verified: true,
      },
      idtracking: versionId === null ? undefined : versionId,
      gtmparams: params,
      idlead: lead.idlead,
    });
    setOpenCode(false);
    changeLead({ verified: true });
    nextStep("verif");
  };

  const isAllValid =
    lead.nom.length > 0 &&
    lead.prenom.length > 0 &&
    isValidPhoneNumber(lead.phone ?? "") &&
    isValidEmail(lead.email);

  return (
    <>
      <StepContainer stepId="verif" forceNoBackButton noHeightForce>
        <Alert variant={"info"} noTitle className="flex flex-row gap-2">
          <div className="flex flex-col gap-2">
            <AlertTitle>{t`verif.alert.title`}</AlertTitle>
            <span>{t`verif.alert.message`}</span>
          </div>
        </Alert>
        <div className="mb-8 mt-6 flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
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
              label={t`verif.label_name`}
            />
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
              label={t`verif.label_first`}
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
            </div>
            <div className="grid grid-cols-1 gap-[14px]">
              <div className="flex flex-col gap-2.5">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={lead.email}
                  onChange={(e) =>
                    changeLead({
                      email: e,
                    })
                  }
                  placeholder={t`verif.placeholder_email`}
                  valid={isValidEmail(lead.email)}
                />
                <span className="text-sm leading-5">
                  {t`verif.email_description`}{" "}
                  <button
                    className="hidden font-semibold text-primary hover:underline md:contents"
                    onClick={() => setShowExample(true)}
                  >
                    {t`verif.email_description_action`}
                  </button>
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
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
                <span className="text-sm leading-5">
                  {t`verif.phone_description`}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {isAllValid && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10 flex justify-end"
          >
            <Button onClick={() => void onOpenCode()} disabled={!isAllValid}>
              {t`verif.action`}
            </Button>
          </motion.div>
        )}
      </StepContainer>
      <CodeModal
        open={openCode}
        setOpen={setOpenCode}
        onVerify={onCompletion}
      />
      <Dialog open={showExample} onOpenChange={setShowExample}>
        <DialogContent className="p-0 md:p-0">
          <object
            data="/Hypo.pdf"
            type="application/pdf"
            width="100%"
            height="500px"
          >
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <span>{t`verif.email_description_fallback`}</span>
              <Button asChild>
                <a href="/Hypo.pdf" download>
                  {t`verif.email_description_action`}
                </a>
              </Button>
            </div>
          </object>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Verif;
