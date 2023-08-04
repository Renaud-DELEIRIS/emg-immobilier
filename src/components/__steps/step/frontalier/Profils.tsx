import { IconCheck, IconMan, IconWoman } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect } from "react";
import Button from "~/components/button/Button";
import { useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import formatAmount from "~/utils/formatAmount";

const Profils = () => {
  const { lead, changeLead } = useLead();
  const { increaseStep } = useSteps();
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

  useEffect(() => {
    if (
      lead.adherent
        .filter((p) =>
          dayjs(p.dob, "DD.MM.YYYY").isBefore(dayjs().subtract(18, "year"))
        )
        .filter((p) => p.travailSuisse).length === 1
    ) {
      changeLead({
        selectedAdherent: [0],
      });
      increaseStep("profils");
    }
  }, []);

  const isValid = lead.selectedAdherent.length > 0;

  return (
    <div className="flex max-w-xl flex-col gap-2">
      <label className="font-bold">Les offres qui vous intéressent :</label>
      {lead.adherent.map((p, index) => {
        if (!dayjs(p.dob, "DD.MM.YYYY").isBefore(dayjs().subtract(18, "year")))
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
      <Button
        disabled={!isValid}
        onClick={() => {
          increaseStep("profils");
        }}
        className="mt-6 w-52"
      >
        Continuer
      </Button>
    </div>
  );
};

export default Profils;
