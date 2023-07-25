import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";
import Button from "~/components/button/Button";
import { type Adherent, useLead } from "~/components/provider/LeadProvider";
import { useSteps } from "~/components/provider/StepsProvider";
import Pack from "~/components/steps/Pack";
import StepContainer from "../StepContainer";

const ChoosePack = () => {
  const { lead, changeLead } = useLead();
  const [adherent, setAdherent] = useState<number>(0);
  const { increaseStep } = useSteps();
  return (
    <StepContainer
      title="Quels sont vos besoins ?"
      description={
        "Parfait, en matière de prestations complémentaires. Choissisez ce qui convient le mieux."
      }
      className="pb-12"
    >
      {lead.adherent.at(adherent) && (
        <Pack
          adherent={lead.adherent.at(adherent) as Adherent}
          setPack={(pack) => {
            changeLead({
              adherent: [
                ...lead.adherent.slice(0, adherent),
                {
                  ...lead.adherent.at(adherent),
                  pack,
                },
                ...lead.adherent.slice(adherent + 1),
              ],
            });
          }}
        />
      )}
      <div className="mt-4 flex w-full justify-between">
        <div>
          {adherent !== 0 && (
            <Button
              intent={"secondary"}
              iconLeft={<IconArrowLeft />}
              onClick={() => {
                setAdherent(adherent - 1);
                // Scroll smooth to top
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Retour
            </Button>
          )}
        </div>
        <Button
          onClick={() => {
            if (lead.adherent.length === adherent + 1) {
              increaseStep("package");
              return;
            }
            setAdherent(adherent + 1);
            // Scroll smooth to top
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          iconRight={<IconArrowRight />}
        >
          Suivant
        </Button>
      </div>
    </StepContainer>
  );
};

export default ChoosePack;
