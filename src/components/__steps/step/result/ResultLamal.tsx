import ResultCardLamal from "./ResultCardLamal";
import { useResult } from "./ResultProvider";
import { motion } from "framer-motion";

const ResultLamal = ({ monthlyPrice }: { monthlyPrice: boolean }) => {
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
          />
        </div>
      ))}
    </motion.div>
  );
};

export default ResultLamal;
