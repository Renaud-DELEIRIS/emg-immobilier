import { IconCheck, IconPhoneCalling } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "next-i18next";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../button/Button";
import RecallModal from "../modal/recallModal";

const Result = () => {
  const { t } = useTranslation("step");
  const [open, setOpen] = useState(false);

  const onBeCalled = () => {
    setOpen(true);
  };

  return (
    <>
      <motion.div
        className="mx-auto flex w-full max-w-[350px] flex-1 flex-col justify-center pt-12 md:max-w-2xl md:pt-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        id="result"
      >
        <span className="text-[22px] leading-[normal]">
          <Trans
            i18nKey="result.title"
            t={t}
            components={{
              b: <span className="font-semibold" />,
            }}
          />
        </span>
        <div className="my-6 flex items-center gap-4 rounded-xl bg-white px-4 py-3">
          <Image
            src="/deborah.png"
            width={80}
            height={80}
            alt="Deborah"
            className="rounded-full"
          />
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-lg">
              <Trans
                i18nKey="result.agent.title"
                tOptions={{ agent: "Deborah" }}
                t={t}
                components={{
                  b: <span className="font-semibold" />,
                }}
              />
            </span>
            <span className="leading-[19px]">{t("result.agent.subtitle")}</span>
            <Button onClick={onBeCalled} size={"sm"} className="mt-2">
              <IconPhoneCalling size={20} className="mr-1" />
              {t("result.agent.action")}
            </Button>
          </div>
        </div>
        <span className="text-[16px] leading-[22px]">
          {t("result.subtitle")}
        </span>
        <div className="mt-6 rounded-xl bg-white px-4 py-3">
          <ul className="flex flex-col gap-4">
            {Array(7)
              .fill(0)
              .map((_, i) => (
                <li key={i} className="flex items-center gap-4">
                  <IconCheck size={24} className="shrink-0 text-thirdy" />
                  <span className="text-[16px] leading-[22px]">
                    {t(`result.list.item_${i + 1}`)}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </motion.div>
      <RecallModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Result;
