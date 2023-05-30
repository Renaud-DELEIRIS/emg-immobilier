import { isDisabled } from "~/constants/step.constant";
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
    <footer className="footer-height row relative bottom-0 left-0 z-30 w-full items-center justify-around border-t  bg-white px-4">
      <Button
        intent="secondary"
        size="small"
        iconLeft={<IconArrowLeft />}
        onClick={() => decreaseStep()}
      >
        Retour
      </Button>
      <Button
        size="medium"
        iconRight={<IconArrowRight />}
        disabled={isDisabled(activeStep, lead)}
        onClick={() => increaseStep()}
      >
        Suivant
      </Button>
    </footer>
  );
};

export default Footer;
