import { IconEdit, IconLoader } from "@tabler/icons-react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useState } from "react";
import ReactSwitch from "react-switch";
import Select from "~/components/inputs/Select";
import ResultLamal from "./ResultLamal";
import ResultLca from "./ResultLca";
import { useResult } from "./ResultProvider";
import { Adherent, schemaData } from "~/constants/lead.constant";
import { useFormStore } from "~/stores/form";

const textByIndex = (profile: Adherent) => {
  if (profile.type === "main") return "Vous";
  if (profile.type === "partner")
    return "Votre conjoint" + (profile.civility === "female" ? "e" : "");
  if (profile.type === "child")
    return (
      "Votre enfant né" +
      (profile.civility === "female" ? "e" : "") +
      " en " +
      (profile.year || "")
    );
  return "";
};

const Result = () => {
  const lead = useFormStore((state) => state.data);
  const nextStep = useFormStore((state) => state.nextStep);
  const {
    profilIndex: profil,
    setProfileIndex: setProfile,
    loading,
  } = useResult();
  const [monthlyPrice, setMonthlyPrice] = useState<boolean>(true);
  const [show, setShow] = useState<"lca" | "lamal">("lca");
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col items-center justify-center gap-4 px-[5%]"
    >
      <div className="flex w-full max-w-6xl flex-row items-center justify-between">
        <h2 className="hidden text-[20px] font-bold text-[#2F3946] md:block">
          12 offres trouvées pour vous! Plus qu‘un clic pour être assuré
          {lead.adherent[0]?.civility === "female" ? "e" : ""}
        </h2>
        <h2 className="block text-[20px] font-bold text-[#2F3946] md:hidden">
          Mon comparatif
        </h2>
        <button
          className="flex items-center gap-2 rounded-lg border border-primary bg-white p-1 font-bold text-primary hover:bg-primary-50"
          onClick={() =>
            nextStep(lead.npa?.key === -1 ? "situation" : "assurance-actuelle")
          }
        >
          <span className="hidden md:block">Modifier mon profil</span>
          <span className="md:hidden">Modifier</span>
          <IconEdit />
        </button>
      </div>
      <div className="flex w-full max-w-6xl flex-row items-center gap-6">
        {lead.adherent.length > 1 && (
          <Select
            label="Personne à assurer"
            options={lead.adherent.map((adherent, index) => ({
              label: textByIndex(adherent),
              value: index.toString(),
            }))}
            value={profil.toString()}
            onChange={(e) => setProfile(parseInt(e))}
            wrapperClassName="hidden sm:block w-[240px]"
          />
        )}
        <div className="hidden flex-col sm:flex">
          <p className="mb-1 block text-sm font-normal text-neutral-800">
            Prix mensuel
          </p>
          <div className="grid h-[46px] place-items-center">
            <ReactSwitch
              checked={monthlyPrice}
              onChange={setMonthlyPrice}
              onColor="#00C49B"
              checkedIcon={false}
              uncheckedIcon={false}
              height={24}
              width={48}
              handleDiameter={24}
            />
          </div>
        </div>
        <div className="mt-auto flex flex-1 flex-row items-center rounded-lg bg-neutral-200 p-px">
          <button
            className={`flex-1 rounded-lg py-4 font-bold ${
              show === "lca" ? "bg-primary text-white" : "bg-neutral-200 "
            }`}
            onClick={() => setShow("lca")}
          >
            LCA
          </button>
          <button
            className={`flex-1 rounded-lg py-4 font-bold ${
              show === "lamal" ? "bg-primary text-white" : "bg-neutral-200"
            }`}
            onClick={() => setShow("lamal")}
          >
            LAMAL
          </button>
        </div>
      </div>
      <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-4">
        {loading ? (
          <div className="mt-12 grid w-full place-items-center">
            <IconLoader className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {show === "lamal" && <ResultLamal monthlyPrice={monthlyPrice} />}
            {show === "lca" && <ResultLca monthlyPrice={monthlyPrice} />}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Result;
