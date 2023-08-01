import {
  IconCheck,
  IconInfoCircle,
  IconMan,
  IconWoman,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect } from "react";
import Button from "~/components/button/Button";
import InputDate from "~/components/inputs/DatePicker";
import Select from "~/components/inputs/Select";
import TextInput from "~/components/inputs/TextInput";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import formatAmount from "~/utils/formatAmount";

const Souscrire = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep } = useSteps();
  useEffect(() => {
    changeLead({ selectedAdherent: [] });
  }, []);

  const price = (age: number, couverture: boolean) =>
    age < 19
      ? couverture
        ? 43.7
        : 40.7
      : age < 26
      ? couverture
        ? 157.5
        : 146.5
      : couverture
      ? 175
      : 162.8;

  const isValid =
    lead.selectedAdherent.length > 0 &&
    lead.address &&
    lead.address.length > 6 &&
    dayjs(lead.startInsurance, "DD.MM.YYYY").isValid();

  return (
    <div className="flex max-w-xl flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="font-bold">Début de l'assurance :</label>
        <InputDate
          value={lead.startInsurance}
          onChange={(date) => changeLead({ startInsurance: date })}
          className="md:w-80"
        />
        <p className="text-sm text-neutral-500">
          <IconInfoCircle className="mr-1 inline-block" size={16} />
          La date de début correspond au début du contrat de travail
        </p>
      </div>
      <Select
        value={lead.paymentFrequency}
        onChange={(value) => changeLead({ paymentFrequency: value as any })}
        label="Fréquence de paiement"
        options={[
          { value: "month", label: "Mensuelle" },
          { value: "semester", label: "Semestrielle (0.5% de rabais)" },
          { value: "year", label: "Annuelle (1% de rabais)" },
        ]}
        boldLabel
      />
      <div className="flex flex-col gap-2">
        <label className="font-bold">Les offres qui vous intéressent :</label>
        {lead.adherent.map((p, index) => {
          if (
            !dayjs(p.dob, "DD.MM.YYYY").isBefore(dayjs().subtract(18, "year"))
          )
            return null;
          if (p.travailSuisse === false) return null;
          const isSelected = lead.selectedAdherent.includes(index);
          return (
            <button
              key={index}
              className={
                "group mt-2 flex flex-row items-center justify-between rounded-md bg-white px-8 py-4 transition-colors hover:border-primary hover:text-primary " +
                (isSelected ? "border border-primary text-primary" : "border")
              }
              onClick={() => {
                if (isSelected) {
                  changeLead({
                    selectedAdherent: lead.selectedAdherent.filter(
                      (i) => i !== index
                    ),
                  });
                } else {
                  changeLead({
                    selectedAdherent: [...lead.selectedAdherent, index],
                  });
                }
              }}
            >
              <div className="flex flex-row items-center gap-2">
                {p.civility === "man" ? (
                  <IconMan size={32} />
                ) : (
                  <IconWoman size={32} />
                )}
                <span className="font-bold">
                  {p.type === "main"
                    ? "Pour vous"
                    : p.type === "partner"
                    ? p.civility === "female"
                      ? "Pour votre conjointe"
                      : "Pour votre coinjoint"
                    : "Pour votre enfant né en " +
                      dayjs(p.dob, "DD.MM.YYYY").format("YYYY")}
                  :
                  <span className="text-primary">
                    {" "}
                    {formatAmount(
                      price(dayjs().diff(p.dob, "year"), !!p.couverture) *
                        (lead.paymentFrequency === "semester"
                          ? 0.995
                          : lead.paymentFrequency === "year"
                          ? 0.99
                          : 1)
                    )}{" "}
                  </span>
                  /{" "}
                  {lead.paymentFrequency === "month"
                    ? "mois"
                    : lead.paymentFrequency === "semester"
                    ? "semestre"
                    : "année"}
                </span>
              </div>
              <div
                className={
                  "grid aspect-square w-6 place-items-center rounded-sm border transition-colors group-hover:border-primary " +
                  (isSelected ? "bg-primary text-white" : "")
                }
              >
                {isSelected && <IconCheck size={20} />}
              </div>
            </button>
          );
        })}
      </div>
      <TextInput
        value={lead.address || ""}
        onChange={(value) => changeLead({ address: value })}
        label="Votre adresse de résidence :"
        placeholder="p. ex. Rue du parc 12, 1201 Genève GE"
        autocomplete="street-address"
        boldLabel
      />

      <Button
        onClick={() => {
          increaseStep("souscrire");
        }}
        className="mt-4 w-52"
        disabled={!isValid}
      >
        Continuer
      </Button>
    </div>
  );
};

export default Souscrire;
