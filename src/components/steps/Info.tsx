import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useFormStore } from "~/stores/form";
import { Button } from "../button/Button";
import Input from "../inputs/input";
import StepContainer from "./StepContainer";
const Info = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");

  return (
    <StepContainer stepId="info">
      <div className="flex flex-col gap-4">
        <Input
          value={lead.prenom}
          onChange={(value) => {
            changeLead({ prenom: value });
          }}
          label={t("info.label_prenom")}
          placeholder={t("info.placeholder_prenom")}
          name="firstname"
          valid={lead.prenom.length > 3}
        />
        <Input
          value={lead.nom}
          onChange={(value) => {
            changeLead({ nom: value });
          }}
          label={t("info.label_nom")}
          placeholder={t("info.placeholder_nom")}
          name="lastname"
          valid={lead.nom.length > 3}
        />
        {lead.nom.length > 3 && (
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
          >
            <Button onClick={() => nextStep("info")}>{t("info.action")}</Button>
          </motion.div>
        )}
      </div>
    </StepContainer>
  );
};

export default Info;
