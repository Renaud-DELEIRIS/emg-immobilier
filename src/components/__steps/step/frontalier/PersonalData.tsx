import dayjs from "dayjs";
import Button from "~/components/button/Button";
import InputDate from "~/components/inputs/DatePicker";
import Select from "~/components/inputs/Select";
import TextInput from "~/components/inputs/TextInput";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";

const PersonalData = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep } = useSteps();

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
          dayjs(p.dob, "DD.MM.YYY").isValid()
      ).length === lead.selectedAdherent.length;

  return (
    <div className="flex flex-col gap-8">
      {lead.adherent.map((p, index) => {
        if (!lead.selectedAdherent.includes(index)) return null;
        return (
          <div className="flex flex-col gap-6" key={index}>
            <h3 className="text-lg font-bold">
              {p.type === "main"
                ? "Vous"
                : p.type === "partner"
                ? p.civility === "female"
                  ? "Votre conjointe"
                  : "Votre conjoint"
                : `Votre enfant né en ${dayjs(
                    p.dob,
                    "DD.MM.YYYY"
                  ).year()}`}{" "}
              :
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TextInput
                label="Prénom"
                placeholder="Prénom"
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
                label="Nom"
                value={p.nom || ""}
                placeholder="Nom"
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
                label="Date de naissance"
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
                    value: "suisse",
                    label: "Suisse",
                  },
                  {
                    value: "france",
                    label: "Française",
                  },
                  {
                    value: "allemand",
                    label: "Allemande",
                  },
                  {
                    value: "italien",
                    label: "Italienne",
                  },
                  {
                    value: "autre",
                    label: "Autre",
                  },
                ]}
                label="Nationalité"
                placeholder="Sélectionnez votre nationalité"
              />
            </div>
          </div>
        );
      })}{" "}
      <Button
        onClick={() => {
          increaseStep("donnee-personnelle");
        }}
        className="mt-4 w-52"
        disabled={!isValid}
      >
        Continuer
      </Button>
    </div>
  );
};

export default PersonalData;
