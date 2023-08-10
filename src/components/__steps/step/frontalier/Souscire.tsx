import { IconInfoCircle } from "@tabler/icons-react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import Button from "~/components/button/Button";
import Tile from "~/components/button/Tile";
import CompleteAddress from "~/components/inputs/AddressInput";
import InputDate from "~/components/inputs/DatePicker";
import Select from "~/components/inputs/Select";
import { useFormStore } from "~/stores/form";

const Souscrire = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const [preDate, setPreDate] = useState<"ajd" | "demain" | "mois" | "autre">();

  const isValid =
    lead.selectedAdherent.length > 0 &&
    lead.address &&
    lead.address.length > 6 &&
    dayjs(lead.startInsurance, "DD.MM.YYYY").isValid() &&
    preDate !== undefined;

  const { t } = useTranslation("frontalier");
  const { t: tCommon } = useTranslation("common");

  return (
    <div className="flex max-w-xl flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="font-bold">{t("SOUSCRIRE_LABEL_START")}</label>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              <span>{t("SOUSCRIRE_START_A3")}</span>
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
              <span>{t("SOUSCRIRE_START_A4")}</span>
            </div>
          </Tile>
        </div>
        <motion.div layout>
          {preDate === "autre" && (
            <InputDate
              value={lead.startInsurance}
              onChange={(date) => changeLead({ startInsurance: date })}
              className="mt-2 md:w-80"
              format="DD.MM.YYYY"
            />
          )}
        </motion.div>
        <p className="text-sm text-neutral-500">
          <IconInfoCircle className="mr-1 inline-block" size={16} />
          {t("SOUSCRIRE_START_INFO")}
        </p>
      </div>
      <Select
        value={lead.paymentFrequency}
        onChange={(value) =>
          changeLead({
            paymentFrequency: value as "month" | "year" | "semester",
          })
        }
        label={t("SOUSCRIRE_FREQUENCY_LABEL")}
        options={[
          { value: "month", label: t("SOUSCRIRE_FREQUENCY_MENSUELLE") },
          { value: "semester", label: t("SOUSCRIRE_FREQUENCY_SEMESTER") },
          { value: "year", label: t("SOUSCRIRE_FREQUENCY_ANNUAL") },
        ]}
        boldLabel
      />
      <CompleteAddress
        value={lead.address || ""}
        onChange={(value) => changeLead({ address: value })}
        label={t("SOUSCRIRE_ADDRESS_LABEL")}
        placeholder="p. ex. Rue du parc 12, 01210 Ferney-Voltaire France"
        autocomplete="street-address"
        boldLabel
      />

      <Button
        onClick={() => {
          nextStep("souscrire");
        }}
        className="mt-4 w-52"
        disabled={!isValid}
      >
        {tCommon("CONTINUE")}
      </Button>
    </div>
  );
};

export default Souscrire;
