import { motion } from "framer-motion";
import { Adherent } from "~/constants/lead.constant";
import ResultCardLamal from "./ResultCardLamal";
import { useResult } from "./ResultProvider";

const ResultLamal = ({
  monthlyPrice,
  adherent,
}: {
  monthlyPrice: boolean;
  adherent: Adherent;
}) => {
  const { lamalItems } = useResult();
  return (
    <motion.div
      className="mt-8 flex w-full flex-col gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {lamalItems.map((item, index) => (
        <div
          className={
            index === 0 ? "mb-4 border-b-2 border-neutral-400 pb-8 " : ""
          }
          key={index}
        >
          <ResultCardLamal
            info={item}
            monthPrice={monthlyPrice}
            recommended={index === 0}
            adherent={adherent}
          />
        </div>
      ))}
    </motion.div>
  );
};

export default ResultLamal;
