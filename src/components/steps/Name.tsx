import { IconChevronLeft, IconMail } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import { Alert, AlertTitle } from "~/components/feedback/alert";
import Input, { PhoneNumberInput } from "~/components/inputs/input";
import { useFormStore } from "~/stores/form";
import { isValidEmail } from "~/utils/validation/email.validation";
import { StepDescription, StepTitle } from "./StepContainer";

const Name = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const backStep = useFormStore((state) => state.backStep);
  const setVisibleStep = useFormStore((state) => state.setVisibleStep);
  const currentVisibleStep = useFormStore((state) => state.currentVisibleStep);
  const { t: tCommon } = useTranslation("common");
  const { t } = useTranslation("step");

  const [toShowContact, setToShowContact] = useState(false);

  useEffect(() => {
    if (lead.nom && lead.prenom) {
      setToShowContact(true);
    }
  }, [lead]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentVisibleStep]);

  const isAllValid =
    lead.prenom.length > 0 &&
    lead.nom.length > 0 &&
    isValidPhoneNumber(lead.phone ?? "") &&
    isValidEmail(lead.email);

  return (
    <div className="w-full flex-col pb-12">
      <button
        className="mb-8 flex h-11 items-center gap-2.5 rounded-full border border-[#88889440] bg-[#8888941A] px-5 text-base font-semibold text-[#082623CC] transition-colors hover:bg-[#082623CC] hover:text-white md:mb-[52px]"
        onClick={() => backStep()}
      >
        <IconChevronLeft size={20} />
        {tCommon`BACK`}
      </button>

      <Alert
        variant={"info"}
        noTitle
        className="flex flex-row gap-2 md:pl-[160px]"
      >
        <Image
          src="/mascotte/bras_croise.png"
          width={146}
          height={146}
          alt="mascotte"
          className="absolute bottom-0 left-[1rem] hidden shrink-0 md:block"
        />
        <div className="flex flex-col gap-2">
          <AlertTitle>{t`name.alert.title`}</AlertTitle>
          <span>{t`name.alert.message`}</span>
        </div>
      </Alert>
      <div className="my-10 flex flex-col gap-5">
        <label htmlFor="name" className="text-[22px] font-semibold">
          {t`name.label`}
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
            placeholder={t`name.placeholder_first`}
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
            placeholder={t`name.placeholder_last`}
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
            <StepTitle>{t`name.label_contact`}</StepTitle>
            <StepDescription>{t`name.contact_description`}</StepDescription>
          </div>
          <div className="grid grid-cols-1 gap-[18px]">
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
              icon={<IconMail size={24} />}
              placeholder={t`name.placehodlder_email`}
              valid={isValidEmail(lead.email)}
            />
            <PhoneNumberInput
              id="phone"
              name="phone"
              value={lead.phone}
              onChange={(e) =>
                changeLead({
                  phone: e,
                })
              }
              placeholder={t`name.placeholder_phone`}
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
            onClick={() => nextStep("info")}
            disabled={!isAllValid}
          >
            {t`name.action`}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Name;
