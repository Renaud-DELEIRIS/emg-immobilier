import { IconInfoCircle } from "@tabler/icons-react";
import dayjs from "dayjs";
import Button from "~/components/button/Button";
import InputDate from "~/components/inputs/DatePicker";
import Select from "~/components/inputs/Select";
import TextInput from "~/components/inputs/TextInput";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";

const Souscrire = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep } = useSteps();

  const isValid =
    lead.selectedAdherent.length > 0 &&
    lead.address &&
    lead.address.length > 6 &&
    dayjs(lead.startInsurance, "DD.MM.YYYY").isValid();

  return (
    <div className="flex max-w-xl flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="font-bold">Début de l&apos;assurance :</label>
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
        onChange={(value) =>
          changeLead({
            paymentFrequency: value as "month" | "year" | "semester",
          })
        }
        label="Fréquence de paiement"
        options={[
          { value: "month", label: "Mensuelle" },
          { value: "semester", label: "Semestrielle (0.5% de rabais)" },
          { value: "year", label: "Annuelle (1% de rabais)" },
        ]}
        boldLabel
      />
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
