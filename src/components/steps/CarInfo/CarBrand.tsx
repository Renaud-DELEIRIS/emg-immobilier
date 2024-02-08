import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { IconMagnify } from "~/components/icon/IconMagnify";
import Input from "~/components/inputs/input";
import CarLogos from "~/components/steps/CarInfo/components/CarLogos";
import { useFormStore } from "~/stores/form";

const CarBrand = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const { t } = useTranslation("step");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -250 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Input
          wrapperClassName="inline-flex px-[14px] items-center gap-[8px] shrink-0 w-[670px] h-[68px]"
          className="border-transparent bg-[#8888941a] text-sm font-normal not-italic leading-none text-[#082623] opacity-50"
          value={lead.car_brand ?? ""}
          onChange={(car_brand) => {
            changeLead({ car_brand });
          }}
          name="car-brand"
          aria-label="Marque de voiture"
          placeholder={t("car-brand.placeholder")}
          icon={
            <IconMagnify
              size={32}
              className="opacity-1 pr-[8px] text-[#082623]"
            />
          }
        />
        <CarLogos
          query={lead.car_brand ?? ""}
          onClick={(modelName) => {
            changeLead({ car_brand: modelName });
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default CarBrand;
