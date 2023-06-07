import { getActualStep, getTotalStep } from "~/constants/step.constant";
import Image from "next/image";
import Router from "next/router";
import { useLead } from "../provider/LeadProvider";
import { useSteps } from "../provider/StepsProvider";
import ProgressBar from "./ProgressBar";
import { IconChevronLeft, IconPhone } from "@tabler/icons-react";
import Button from "../button/Button";

const Header = () => {
  const { activeStep, decreaseStep } = useSteps();
  const { lead } = useLead();
  const maxStep = getTotalStep(activeStep, lead);
  const actualStep = getActualStep(activeStep, lead);

  return (
    <>
      <div className="sticky top-0 z-50 w-full">
        <header className="row inset-0 h-16 w-full items-center justify-between border-b border-[rgb(250,247,247)] bg-white px-2 py-2 md:px-12">
          <Button
            onClick={() => decreaseStep()}
            intent="secondary"
            iconLeft={<IconChevronLeft size={24} />}
            size="small"
            className="mr-auto"
          >
            Retour
          </Button>
          <div className="hidden w-1/2 md:block">
            <ProgressBar now={actualStep / maxStep} />
          </div>
          <a
            href="tel:0225661647"
            className="ml-auto flex items-center gap-1 rounded-[10px] border-2 border-[#E0E2E4] px-4 py-[.7rem] text-[16px]"
          >
            <IconPhone size={22} />
            Nous appeler
          </a>
        </header>
        <div className="absolute bottom-0 z-[100] block w-screen md:hidden">
          <ProgressBar now={actualStep / maxStep} />
        </div>
      </div>
    </>
  );
};

export default Header;
