import { isStepDisabled } from "~/constants/step.constant";
import {
  IconArrowLeft,
  IconArrowRight,
  IconChevronLeft,
  IconUser,
} from "@tabler/icons-react";
import Button from "../button/Button";
import { useLead } from "../provider/LeadProvider";
import { useSteps } from "../provider/StepsProvider";

const Footer = () => {
  const { increaseStep, decreaseStep, activeStep, steps } = useSteps();
  const { lead } = useLead();
  return (
    <footer className="flex flex-col justify-evenly gap-8 bg-[#f9fafb] px-4 py-12 md:flex-row">
      <div className="flex w-full flex-col md:w-1/4 ">
        <p className="mb-2 text-lg font-bold text-primary md:mb-4">
          Vos données sont sécurisées
        </p>
        <p className="text-[#828890]">
          Nous garantissons la sécurité de vos données.
        </p>
      </div>
      <div className="flex w-full flex-col md:w-1/4 ">
        <p className="mb-2 text-lg font-bold text-primary md:mb-4">
          Indépendants et impartials
        </p>
        <p className="text-[#828890]">
          Comparea.ch est un groupe indépendant, n’appartenant à aucune société
          d’assurance.
        </p>
      </div>
      <div className="flex w-full flex-col md:w-1/4 ">
        <p className="mb-2 text-lg font-bold text-primary md:mb-4">
          Pas de surcoûts
        </p>
        <p className="text-[#828890]">
          Les prix affichés sont négociés auprès des assureurs partenaires,
          aucun surcoût n’est appliqué.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
