import { useTranslation } from "next-i18next";

import { IconClockTimer } from "~/components/icon/IconClockTimer";
import { IconSmileFace } from "~/components/icon/IconSmileFace";
import { IconThumbsUp } from "~/components/icon/IconThumbsUp";
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
  return (
    <footer className="h-[104px] w-full shrink-0 bg-white">
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
  );
};

export default Footer;
