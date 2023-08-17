import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import Button from "~/components/button/Button";
import InputDate from "~/components/inputs/DatePicker";
import Select from "~/components/inputs/Select";
import TextInput from "~/components/inputs/TextInput";
import { useFormStore } from "~/stores/form";

const PersonalData = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const isValid =
    lead.adherent
      .filter((p, i) => lead.selectedAdherent.includes(i))
      .filter(
        (p) =>
          p.nom &&
          p.nom.length > 1 &&
          p.prenom &&
          p.prenom.length > 1 &&
          p.dob &&
          dayjs(p.dob).isValid()
      ).length === lead.selectedAdherent.length;

  const { t: tCommon } = useTranslation("common");
  const { t } = useTranslation("frontalier");

  return (
    <div className="flex flex-col gap-8">
      {lead.adherent.map((p, index) => {
        if (!lead.selectedAdherent.includes(index)) return null;
        return (
          <div className="flex flex-col gap-6" key={index}>
            <h3 className="text-lg font-bold">
              {p.type === "main"
                ? t("DATA_TITLE_MAIN")
                : p.type === "partner"
                ? p.civility === "female"
                  ? t("DATA_TITLE_SPOUSE_FEMALE")
                  : t("DATA_TITLE_SPOUSE_MALE")
                : t("DATA_TITLE_CHILD", {
                    year: p.year || "",
                  })}{" "}
              :
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TextInput
                label={t("DATA_PRENOM_LABEL")}
                placeholder={t("DATA_PRENOM_LABEL")}
                value={p.prenom || ""}
                onChange={(value) => {
                  changeLead({
                    ...lead,
                    adherent: lead.adherent.map((a, i) => {
                      if (i === index) {
                        return {
                          ...a,
                          prenom: value,
                        };
                      }
                      return a;
                    }),
                  });
                }}
              />
              <TextInput
                label={t("DATA_NOM_LABEL")}
                value={p.nom || ""}
                placeholder={t("DATA_NOM_LABEL")}
                onChange={(value) => {
                  changeLead({
                    ...lead,
                    adherent: lead.adherent.map((a, i) => {
                      if (i === index) {
                        return {
                          ...a,
                          nom: value,
                        };
                      }
                      return a;
                    }),
                  });
                }}
              />
              <InputDate
                value={p.dob || ""}
                defaultYear={p.year}
                label={t("DATA_BIRTH_LABEL")}
                onChange={(value) => {
                  changeLead({
                    ...lead,
                    adherent: lead.adherent.map((a, i) => {
                      if (i === index) {
                        return {
                          ...a,
                          dob: value,
                        };
                      }
                      return a;
                    }),
                  });
                }}
                format="DD.MM.YYYY"
                className="!p-1.5"
              />
              <Select
                value={p.nationality || ""}
                onChange={(value) => {
                  changeLead({
                    ...lead,
                    adherent: lead.adherent.map((a, i) => {
                      if (i === index) {
                        return {
                          ...a,
                          nationality: value,
                        };
                      }
                      return a;
                    }),
                  });
                }}
                options={[
                  {
                    value: "france",
                    label: t("DATA_NATIONALITY_FRENCH"),
                  },
                  {
                    value: "suisse",
                    label: t("DATA_NATIONALITY_SUISSE"),
                  },
                  {
                    value: "allemand",
                    label: t("DATA_NATIONALITY_ALLEMANDE"),
                  },
                  {
                    value: "italien",
                    label: t("DATA_NATIONALITY_ITALIENNE"),
                  },
                  {
                    value: "autre",
                    label: t("DATA_NATIONALITY_OTHER"),
                  },
                ]}
                label={t("DATA_NATIONALITY_LABEL")}
                placeholder={t("DATA_NATIONALITY_PLACEHOLDER")}
              />
            </div>
          </div>
        );
      })}{" "}
      <Button
        onClick={() => {
          nextStep("donnee-personnelle");
        }}
        className="mt-4 w-52"
        disabled={!isValid}
      >
        {tCommon("CONTINUE")}
      </Button>
    </div>
  );
};

export default PersonalData;
