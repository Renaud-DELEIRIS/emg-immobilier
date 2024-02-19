import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useFormStore } from "~/stores/form";
import { isValidDate } from "~/utils/validation/date.validation";
import { DateInput } from "../inputs/input";
import StepContainer from "./StepContainer";

const Ddn = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");

  const validDdn = (date: string) =>
    isValidDate(dayjs(date, "YYYY-MM-DD"), {
      inPast: true,
    });

  return (
    <StepContainer stepId="ddn">
      <div className="flex flex-col gap-4">
        <DateInput
          value={lead.ddn}
          onChange={(value) => {
            changeLead({ ddn: value });
            if (
              (lead.emprunteur === "seul" || lead.emprunteur === "other") &&
              !validDdn(value)
            ) {
              nextStep("ddn", {
                ddn: value,
              });
            }
          }}
          label={t("ddn.label")}
          valid={!validDdn(lead.ddn || "")}
        ></DateInput>
        {lead.emprunteur === "deux" && (
          <DateInput
            value={lead.ddn_2eme_emprunteur}
            onChange={(value) => {
              changeLead({ ddn_2eme_emprunteur: value });
              if (!validDdn(value) && !validDdn(lead.ddn || "")) {
                nextStep("ddn", {
                  ddn_2eme_emprunteur: value,
                });
              }
            }}
            label={t("ddn.label_2")}
            valid={!validDdn(lead.ddn_2eme_emprunteur || "")}
          ></DateInput>
        )}
      </div>
    </StepContainer>
  );
};

export default Ddn;
