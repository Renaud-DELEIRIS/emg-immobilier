import { useResult } from "./ResultProvider";
import { motion } from "framer-motion";
import ResultCardLca from "./ResultCardLca";
import { useState } from "react";

const ResultLca = ({ monthlyPrice }: { monthlyPrice: boolean }) => {
  const { lcaItems } = useResult();
  const [compare, setCompare] = useState<string[]>([]);

  return (
    <motion.div
      className="mt-8 flex flex-col gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {lcaItems
        .sort((a) => (a.bestChoice ? -1 : 1))
        .map((item, index) => (
          <ResultCardLca
            info={item}
            key={index}
            monthPrice={monthlyPrice}
            recommended={item.bestChoice}
            canCompare={
              compare.length < 3 || compare.includes(item.id.toString())
            }
            compare={compare.includes(item.id.toString())}
            onCompare={(id) => {
              if (compare.includes(id)) {
                setCompare(compare.filter((c) => c !== id));
              } else {
                setCompare([...compare, id]);
              }
            }}
          />
        ))}
    </motion.div>
  );
};

export default ResultLca;
