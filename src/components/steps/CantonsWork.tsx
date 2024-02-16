import { useTranslation } from "next-i18next";
import { CHCanton } from "~/data/chCanton";
import { useFormStore } from "~/stores/form";
import { SelectInput } from "../inputs/Select";
import TileInput from "../inputs/Tile";
import StepContainer from "./StepContainer";

const CantonsWork = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");

  const isOther =
    lead.canton_work !== "GE" &&
    lead.canton_work !== "VD" &&
    lead.canton_work !== "NE" &&
    lead.canton_work !== undefined;

  return (
    <StepContainer stepId="canton_work">
      <TileInput
        value={lead.canton_work}
        onChange={(value) => {
          changeLead({ canton_work: value });
          if (value === "GE" || value === "VD" || value === "NE") {
            nextStep("canton_work", {
              canton_work: value,
            });
          }
        }}
        className="grid md:grid-cols-2"
        options={[
          {
            value: "GE",
            label: t("canton_work.ge"),
          },
          {
            value: "VD",
            label: t("canton_work.vd"),
          },
          {
            value: "NE",
            label: t("canton_work.ne"),
          },
          {
            value: isOther ? lead.canton_work : "ZH",
            label: t("other"),
          },
        ]}
      ></TileInput>
      {isOther && (
        <SelectInput
          className="mt-4"
          value={lead.canton_work}
          onChange={(value) => {
            changeLead({ canton_work: value });
            nextStep("canton_work", {
              canton_work: value,
            });
          }}
          placeholder={t("canton_work.placeholder")}
          options={CHCanton.map((a) => ({
            value: a.value,
            label: a.name,
          }))}
        ></SelectInput>
      )}
    </StepContainer>
  );
};

export default CantonsWork;
