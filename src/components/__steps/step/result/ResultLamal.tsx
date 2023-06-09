import ResultCardLamal from "./ResultCardLamal";
import { useResult } from "./ResultProvider";
import { motion } from "framer-motion";

const ResultLamal = ({ monthlyPrice }: { monthlyPrice: boolean }) => {
  const { lamalItems } = useResult();
  return (
    <motion.div
      className="mt-8 flex flex-col gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {lamalItems.map((item, index) => (
        <ResultCardLamal
          info={item}
          key={index}
          monthPrice={monthlyPrice}
          recommended={index === 0}
        />
      ))}
    </motion.div>
  );
};

export default ResultLamal;
