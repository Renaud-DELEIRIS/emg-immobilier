import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { IconCloseRemove } from "~/components/icon/IconCloseRemove";
import { Badge } from "~/components/steps/CarInfo/components/Badge";
import { CustomAutoComplete } from "~/components/steps/CarInfo/components/CarAutoComplete";
import { useFormStore } from "~/stores/form";

export interface ICarOption {
  value: string;
  brand: string;
  label: string;
  from: number;
  to: number;
}

const CarModel = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const backStep = useFormStore((state) => state.backStep);
  const { t } = useTranslation("step");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -250 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <CustomAutoComplete
          className="h-[68px]"
          value={lead.car_option?.label ?? ""}
          onChange={(carOption: ICarOption) => {
            changeLead({ car_option: carOption });
          }}
          car_brand={lead.car_brand!}
          name="car-model"
          aria-label="Marque de voiture"
          placeholder={t("car-model.placeholder")}
          before={
            <Badge className="flex items-center justify-center rounded-[40px] border-0 bg-[#082623] px-3.5 py-2 text-center font-semibold text-white">
              {lead.car_brand!.toUpperCase()}
              <IconCloseRemove
                className="hover:cursor-pointer"
                onClick={() => backStep()}
                size={20}
              />
            </Badge>
          }
        ></CustomAutoComplete>
      </motion.div>
    </AnimatePresence>
  );
};

export default CarModel;
