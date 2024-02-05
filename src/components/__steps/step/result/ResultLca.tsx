import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Button } from "~/components/button/Button";
import { type Adherent } from "~/constants/lead.constant";
import ModalComparatifTable from "./ModalComparatifTable";
import ResultCardLca from "./ResultCardLca";
import { useResult } from "./ResultProvider";
////
const ResultLca = ({
  monthlyPrice,
  adherent,
}: {
  monthlyPrice: boolean;
  adherent: Adherent;
}) => {
  const { lcaItems } = useResult();
  const [compare, setCompare] = useState<string[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation("result");

  return (
    <motion.div
      className="mt-8 flex w-full flex-col gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {lcaItems
        .sort((a) => (a.bestChoice ? -1 : 1))
        .map((item, index) => (
          <div
            className={
              index === 0 ? "mb-4 border-b-2 border-neutral-400 pb-8 " : ""
            }
            key={index}
          >
            <ResultCardLca
              info={item}
              monthPrice={monthlyPrice}
              recommended={item.bestChoice}
              adherent={adherent}
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
          </div>
        ))}
      {compare.length > 1 && (
        <div className="fixed bottom-12 left-0 right-0 flex justify-center">
          <Button onClick={() => setOpen(true)}>
            {t("LCA_COMPARE", {
              count: compare.length,
            })}
          </Button>
        </div>
      )}
      <ModalComparatifTable
        offres={lcaItems.filter((item) => compare.includes(item.id.toString()))}
        open={open}
        onClose={() => setOpen(false)}
        adherent={adherent}
      />
    </motion.div>
  );
};

export default ResultLca;
