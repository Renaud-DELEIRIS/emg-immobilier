import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useFormStore } from "~/stores/form";
import CarInfos from "./components/CarInfos";

export interface ICarOption {
  value: string;
  brand: string;
  label: string;
  from: number;
  to: number;
}

const CarRecap = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);

  useEffect(() => {
    nextStep("car_info");
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -250 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <CarInfos
          carOption={lead.car_option!}
          onClick={() =>
            changeLead({
              ...lead,
              car_brand: undefined,
              car_model: undefined,
              car_option: undefined,
            })
          }
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default CarRecap;
