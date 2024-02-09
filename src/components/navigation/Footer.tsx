import { IconChevronUp } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";

import { IconClockTimer } from "~/components/icon/IconClockTimer";
import { IconSmileFace } from "~/components/icon/IconSmileFace";
import { IconThumbsUp } from "~/components/icon/IconThumbsUp";
import { stepGroupId } from "~/constants/step.constant";
import { useFormStore } from "~/stores/form";
import { Dialog, DialogContent } from "../modal/dialog";
import Sidebar from "./Sidebar";
export const highlight = [
  {
    key: "item_1",
    icon: <IconThumbsUp size={30} />,
  },
  {
    key: "item_2",
    icon: <IconClockTimer size={30} />,
  },
  {
    key: "item_3",
    icon: <IconSmileFace size={30} />,
  },
];

const Footer = () => {
  const { t } = useTranslation("footer");
  const { t: tSidebar } = useTranslation("sidebar");
  const currentStep = useFormStore((state) => state.currentStep);

  const currentStepGroup = currentStep.group;
  const groupIndex = stepGroupId.indexOf(currentStepGroup);
  const [isFooterOpen, setIsFooterOpen] = useState(false);

  return (
    <>
      {/* Mobile */}
      <footer className="sticky bottom-0">
        <button
          className="flex h-[52px] w-full items-center justify-between gap-2.5 rounded-t-lg border border-[#8888941A] bg-white px-4 xl:hidden"
          onClick={() => setIsFooterOpen(!isFooterOpen)}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-[32px] items-center rounded-full bg-[#0CBCB033] px-3.5  text-secondary">
              <span className="text-[13px] font-semibold tracking-[-0.26px]">
                Étape {groupIndex + 1}
              </span>
            </div>
            <span className="text-[14px] font-normal leading-normal text-secondary">
              {tSidebar("group." + currentStepGroup)}
            </span>
          </div>
          <IconChevronUp
            className={`transform transition-all ${
              isFooterOpen ? "rotate-180" : ""
            }`}
            size={20}
          />
        </button>
        <Dialog open={isFooterOpen} onOpenChange={setIsFooterOpen}>
          <DialogContent className="bottom-1/4  rounded-lg border-0 bg-transparent p-6 data-[state=closed]:slide-out-to-bottom-[25%] data-[state=closed]:slide-out-to-left-[48%] data-[state=open]:slide-in-from-bottom-0 data-[state=open]:slide-in-from-left-[48%]">
            <Sidebar onClose={() => setIsFooterOpen(false)} />
          </DialogContent>
        </Dialog>
      </footer>

      {/* Desktop */}
      <footer className="hidden h-[104px] w-full shrink-0 bg-white xl:block">
        <div className="mx-auto grid h-full w-full max-w-6xl grid-cols-1 place-items-center justify-between gap-[24px]  md:grid-cols-3">
          {highlight.map((item, index) => (
            <div key={index} className="flex flex-row items-center gap-3.5">
              <div className="grid h-[59px] w-[59px] place-items-center rounded-full bg-[#0cbcb026] text-secondary">
                {item.icon}
              </div>
              <div className="flex flex-col text-left">
                <h3 className="text-lg font-bold">{t(item.key + ".title")}</h3>
                <p className="text-base">{t(item.key + ".subtitle")}</p>
              </div>
            </div>
          ))}
        </div>
      </footer>
    </>
  );
};

export default Footer;
