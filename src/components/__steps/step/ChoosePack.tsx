import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import dayjs from "dayjs";
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
    <>
      <div className="flex flex-col gap-8">
        {lead.adherent.map((data, index) => {
          if (index > adherent) return null;
          return (
            <StepContainer
              description={
                <span>
                  Parfait, en matière de prestations complémentaires.
                  <br />
                  Choissisez ce qui convient le mieux.
                </span>
              }
              title={
                data.type === "main"
                  ? "Pour vous"
                  : data.type === "partner"
                  ? data.civility === "female"
                    ? "Pour votre conjointe"
                    : "Pour votre conjoint"
                  : "Pour votre enfant née en " +
                    dayjs(data.dob).year().toString()
              }
              className="pb-12"
              stepId={"package"}
              id={index.toString()}
              key={index}
            >
              <Pack
                adherent={data}
                setPack={(pack) => {
                  changeLead({
                    adherent: [
                      ...lead.adherent.slice(0, index),
                      {
                        ...data,
                        pack,
                      },
                      ...lead.adherent.slice(index + 1),
                    ],
                  });
                }}
              />
            </StepContainer>
          );
        })}
      </div>
      <div className="mt-4 flex w-full justify-between">
        <div></div>
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
    </>
  );
};

export default ChoosePack;
