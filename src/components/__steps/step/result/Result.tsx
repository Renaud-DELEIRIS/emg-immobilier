import { IconEdit, IconLoader } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import ReactSwitch from "react-switch";
import Select from "~/components/inputs/Select";
import { Adherent } from "~/constants/lead.constant";
import { useFormStore } from "~/stores/form";
import ResultLamal from "./ResultLamal";
import ResultLca from "./ResultLca";
import { useResult } from "./ResultProvider";

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
  const { t } = useTranslation("result");
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col items-center justify-center gap-4 px-[5%]"
    >
      <div className="flex w-full max-w-6xl flex-row items-center justify-between">
        <h2 className="hidden text-[20px] font-bold text-[#2F3946] md:block">
          {t("RESULT_TITLE")}
          {lead.adherent[0]?.civility === "female" ? "e" : ""}
        </h2>
        <h2 className="block text-[20px] font-bold text-[#2F3946] md:hidden">
          {t("RESULT_MY_COMPARATIF")}
        </h2>
        <button
          className="flex items-center gap-2 rounded-lg border border-primary bg-white p-1 font-bold text-primary hover:bg-primary-50"
          onClick={() =>
            nextStep(lead.npa?.key === -1 ? "situation" : "assurance-actuelle")
          }
        >
          <span className="hidden md:block">{t("RESULT_MY_COMPARATIF")}</span>
          <span className="md:hidden">{t("RESULT_MODIFY_PROFILE_MOBILE")}</span>
          <IconEdit />
        </button>
      </div>
      <div className="flex w-full max-w-6xl flex-row items-center gap-6">
        {lead.adherent.length > 1 && (
          <Select
            label={t("PROFIL_SELECT_LABEL")}
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
            {t("PRICE_SWITCH_LABEL")}
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
            {t("LCA")}
          </button>
          <button
            className={`flex-1 rounded-lg py-4 font-bold ${
              show === "lamal" ? "bg-primary text-white" : "bg-neutral-200"
            }`}
            onClick={() => setShow("lamal")}
          >
            {t("LAMAL")}
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
            {show === "lamal" && (
              <ResultLamal
                monthlyPrice={monthlyPrice}
                adherent={lead.adherent[profil]!}
              />
            )}
            {show === "lca" && (
              <ResultLca
                monthlyPrice={monthlyPrice}
                adherent={lead.adherent[profil]!}
              />
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Result;
