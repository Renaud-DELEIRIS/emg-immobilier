import { IconInfoCircle } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import Button from "~/components/button/Button";
import Tile from "~/components/button/Tile";
import InputDate from "~/components/inputs/DatePicker";
import Select from "~/components/inputs/Select";
import TextInput from "~/components/inputs/TextInput";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import { motion } from "framer-motion";
import CompleteAddress from "~/components/inputs/AddressInput";

const Souscrire = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep } = useSteps();
  const [preDate, setPreDate] = useState<"ajd" | "demain" | "mois" | "autre">();

  const isValid =
    lead.selectedAdherent.length > 0 &&
    lead.address &&
    lead.address.length > 6 &&
    dayjs(lead.startInsurance, "DD.MM.YYYY").isValid() &&
    preDate !== undefined;

  return (
    <div className="flex max-w-xl flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="font-bold">
          Début de votre contrat d&apos;assurance :
        </label>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Tile
            onClick={() => {
              setPreDate("ajd");
              changeLead({ startInsurance: dayjs().format("DD.MM.YYYY") });
            }}
            selected={preDate === "ajd"}
          >
            <div className="flex flex-col">
              <span>Aujourd&apos;hui</span>
              <span
                className={
                  "text-xs capitalize " +
                  (preDate !== "ajd" ? "text-neutral-400" : "")
                }
              >
                {dayjs().format("dddd DD MMMM")}
              </span>
            </div>
          </Tile>{" "}
          <Tile
            onClick={() => {
              setPreDate("demain");
              changeLead({
                startInsurance: dayjs().add(1, "day").format("DD.MM.YYYY"),
              });
            }}
            selected={preDate === "demain"}
          >
            <div className="flex flex-col">
              <span>Demain</span>
              <span
                className={
                  "text-xs capitalize " +
                  (preDate !== "demain" ? "text-neutral-400" : "")
                }
              >
                {dayjs().add(1, "day").format("dddd DD MMMM")}
              </span>
            </div>
          </Tile>{" "}
          <Tile
            onClick={() => {
              setPreDate("mois");
              changeLead({
                startInsurance: dayjs()
                  .add(1, "month")
                  .set("date", 1)
                  .format("DD.MM.YYYY"),
              });
            }}
            selected={preDate === "mois"}
          >
            <div className="flex flex-col">
              <span>Le mois prochain</span>
              <span
                className={
                  "text-xs capitalize " +
                  (preDate !== "mois" ? "text-neutral-400" : "")
                }
              >
                {dayjs().add(1, "month").set("date", 1).format("dddd DD MMMM")}
              </span>
            </div>
          </Tile>{" "}
          <Tile
            onClick={() => setPreDate("autre")}
            selected={preDate === "autre"}
          >
            <div className="flex flex-col">
              <span>Une autre date...</span>
            </div>
          </Tile>
        </div>
        <motion.div layout>
          {preDate === "autre" && (
            <InputDate
              value={lead.startInsurance}
              onChange={(date) => changeLead({ startInsurance: date })}
              className="mt-2 md:w-80"
            />
          )}
        </motion.div>
        <p className="text-sm text-neutral-500">
          <IconInfoCircle className="mr-1 inline-block" size={16} />
          La date de début de contrat ne peut pas être antérieur à la date de
          début de votre emploi en Suisse
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
      <CompleteAddress
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
