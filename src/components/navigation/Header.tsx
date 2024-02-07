import { IconPhoneCall } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useFormStore } from "~/stores/form";
import { Button } from "../button/Button";
import Logo from "../icon/Logo";
import RecallModal from "../modal/recallModal";

const Header = () => {
  const lead = useFormStore((state) => state.data);
  const currentStep = useFormStore((state) => state.currentVisibleStep);
  const { t } = useTranslation("header");
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="fixed top-0 z-50 w-full bg-[#f9fafd]">
        <header className="flex h-[82px] w-full flex-row items-center justify-between px-2 md:px-12">
          <Logo />
          <Button variant={"thirdy"} size={"sm"} onClick={onOpen}>
            <IconPhoneCall size={20} className="mr-1" />
            <span className="hidden md:inline-block">{t("recall.action")}</span>
          </Button>
        </header>
      </div>
      <RecallModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Header;
