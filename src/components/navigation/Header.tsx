import { getActualStep, getTotalStep } from "~/constants/step.constant";
import Image from "next/image";
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
      <div className="header-shadow sticky top-0 z-50 w-full">
        <header className="row inset-0 h-16 w-full items-center justify-between border-b border-[rgb(250,247,247)] bg-white px-2 py-2 pt-2 md:px-12">
          <div className="flex w-full justify-center md:block md:w-1/3">
            <Image
              src="/logo.svg"
              width={248}
              height={40}
              alt="Logo"
              className="object-contain"
            ></Image>
          </div>
          <div className="hidden w-1/3 md:block">
            {activeStep.id === "result" ? (
              <div className="flex w-full items-center justify-center gap-2">
                <span className="text-sm text-neutral-700">
                  Le N°1 des comparateurs en ligne
                </span>
                <Image
                  src="/star-y.png"
                  alt="Logo"
                  width={80}
                  height={30}
                  className=" object-contain"
                />
              </div>
            ) : (
              <ProgressBar now={actualStep / maxStep} />
            )}
          </div>
          <div className="hidden w-1/3 md:block">
            <a
              href="tel:0225661647"
              className="ml-auto flex items-center justify-end gap-2 text-primary"
            >
              <IconPhone size={22} />
              022 566 16 47
            </a>
          </div>
        </header>
        <div className="absolute bottom-0 z-[100] block w-full md:hidden">
          <ProgressBar now={actualStep / maxStep} />
        </div>
      </div>
    </>
  );
};

export default Header;
