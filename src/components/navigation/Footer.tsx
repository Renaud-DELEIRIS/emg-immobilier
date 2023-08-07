import { useTranslation } from "next-i18next";

const Footer = () => {
  const { t } = useTranslation("footer");
  return (
    <footer className="flex flex-col justify-evenly gap-8 bg-[#f9fafb] px-4 py-12 md:flex-row">
      <div className="flex w-full flex-col md:w-1/4 ">
        <p className="mb-2 text-lg font-bold text-primary md:mb-4">
          {t("SAFE_DATA")}
        </p>
        <p className="text-[#828890]">
          {t("SAFE_DATA_DESCRIPTION")}
        </p>
      </div>
      <div className="flex w-full flex-col md:w-1/4 ">
        <p className="mb-2 text-lg font-bold text-primary md:mb-4">
          {t("INDE")}
        </p>
        <p className="text-[#828890]">
          {t("INDE_DESCRIPTION")}
        </p>
      </div>
      <div className="flex w-full flex-col md:w-1/4 ">
        <p className="mb-2 text-lg font-bold text-primary md:mb-4">
          {t("SURCOUT")}
        </p>
        <p className="text-[#828890]">
          {t("SURCOUT_DESCRIPTION")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
