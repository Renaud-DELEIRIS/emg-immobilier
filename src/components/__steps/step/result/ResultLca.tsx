import { useResult } from "./ResultProvider";
import { motion } from "framer-motion";
import ResultCardLca from "./ResultCardLca";
import { useState } from "react";
import Button from "~/components/button/Button";
import FlatModal from "~/components/modal/FlatModal";
import ModalComparatifTable from "./ModalComparatifTable";

const ResultLca = ({ monthlyPrice }: { monthlyPrice: boolean }) => {
  const { lcaItems } = useResult();
  const [compare, setCompare] = useState<string[]>([]);

  const [open, setOpen] = useState<boolean>(false);

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
      {compare.length > 1 && (
        <div className="fixed bottom-12 left-0 right-0 flex justify-center">
          <Button onClick={() => setOpen(true)} intent="outline" rounded={"xl"}>
            Comparer les {compare.length} offres
          </Button>
        </div>
      )}
      <ModalComparatifTable
        offres={lcaItems.filter((item) => compare.includes(item.id.toString()))}
        open={open}
        onClose={() => setOpen(false)}
      />
    </motion.div>
  );
};

export default ResultLca;
