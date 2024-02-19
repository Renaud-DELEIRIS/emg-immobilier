import { IconPhoneCall } from "@tabler/icons-react";
import { atom, useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Button } from "../button/Button";
import Logo from "../icon/Logo";
import RecallModal from "../modal/recallModal";

export const beCalledAtom = atom(false);

const Header = () => {
  const { t } = useTranslation("header");
  const [open, setOpen] = useAtom(beCalledAtom);

  const onOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="fixed top-0 z-50 w-full bg-white">
        <header className="flex h-[68px] w-full flex-row items-center justify-between px-2 py-2.5 md:px-8">
          <div className="flex items-center gap-6">
            <Logo />
            <div className="hidden flex-col md:flex">
              <Link
                href={"tel:0223456789"}
                passHref
                className="text-base font-bold hover:underline"
              >
                022 345 67 89
              </Link>
              <span className="text-[13px] font-normal">{t("date")}</span>
            </div>
          </div>
          <Button variant={"default"} size={"sm"} onClick={onOpen}>
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
