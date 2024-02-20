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
            <div className="flex h-[32px] items-center rounded-full bg-primary/5 px-3.5  text-secondary">
              <span className="text-[13px] font-semibold tracking-[-0.26px]">
                <span className="capitalize">{t("step")}</span> {groupIndex + 1}
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
          <DialogContent
            className="bottom-1/4 flex h-fit flex-col  gap-4 rounded-lg border-0 bg-transparent p-6"
            effect="slide-up"
          >
            <Sidebar onClose={() => setIsFooterOpen(false)} />
          </DialogContent>
        </Dialog>
      </footer>
    </>
  );
};

export default Footer;
