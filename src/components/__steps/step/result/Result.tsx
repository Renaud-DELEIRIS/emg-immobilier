import { IconEdit, IconLoader, IconPhoneCalling } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { HTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "~/components/button/Button";
import GoogleReview from "~/components/feedback/GoogleReview";
import Logo, { LogoNoMascotte } from "~/components/icon/Logo";
import { SelectInput } from "~/components/inputs/Select";
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
    "Votre enfant né" +
      (profile.civility === "female" ? "e" : "") +
      " en " +
      (profile.year || "");
  return "";
};

const EditButton: React.FC<HTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const nextStep = useFormStore((state) => state.nextStep);
  const lead = useFormStore((state) => state.data);
  const { t } = useTranslation("result");
  return (
    <button
      className={twMerge(
        "flex h-11 items-center gap-2.5 rounded-full border border-[#88889440] bg-[#8888941A] px-5 text-base font-semibold text-[#082623CC] transition-colors hover:bg-[#082623CC] hover:text-white",
        className
      )}
      onClick={(e) =>
        nextStep(lead.npa?.key === -1 ? "situation" : "assurance-actuelle")
      }
      {...props}
    >
      <span className="hidden md:block">{t("RESULT_MODIFY_PROFILE")}</span>
      <span className="md:hidden">{t("RESULT_MODIFY_PROFILE_MOBILE")}</span>
      <IconEdit />
    </button>
  );
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
      className="relative flex w-full flex-row gap-5"
    >
      <div className="sticky top-6 hidden h-fit w-[250px] shrink-0 flex-col items-center py-[18px] md:flex">
        <LogoNoMascotte />
        <Image
          src={"/mascotte/doctor.png"}
          width={238}
          height={238}
          alt="mascotte mt-[18px]"
        />
        <div className="flex flex-col items-center rounded-xl border border-[#8888941A] bg-white px-3 py-6 text-center">
          <span className="text-sm font-normal">{t`EXPERT`}</span>
          <strong className="text-[18px]">{t`FREE`}</strong>
          <Button variant={"thirdy"} className="mt-4 w-full">
            <IconPhoneCalling size={20} />
            <span className="ml-2">{t`BE_CALLED_BACK`}</span>
          </Button>
        </div>
        <GoogleReview className="mt-[18px]" theme="white" />
      </div>
      <div className="flex w-full flex-col gap-3.5">
        <div className="flex w-full justify-between md:hidden">
          <Logo />
          <EditButton />
        </div>
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <h2 className="text-[20px] font-bold">
              {t("RESULT_TITLE", {
                name: lead.prenom,
              })}
            </h2>
            <p className="text-sm">{t("RESULT_INFO")}</p>
          </div>
          <EditButton className="hidden md:flex" />
        </div>
        <div className="flex items-center gap-4">
          {lead.adherent.length > 1 && (
            <SelectInput
              options={lead.adherent.map((adherent, index) => ({
                label: textByIndex(adherent),
                value: index.toString(),
              }))}
              value={profil.toString()}
              onChange={(e) => setProfile(parseInt(e))}
              className="w-40"
            />
          )}
          <div className="flex h-full items-center overflow-hidden rounded-xl">
            <button
              className={`h-full flex-1 ${
                show === "lamal"
                  ? "bg-secondary text-white"
                  : "bg-neutral-200 text-dark"
              }`}
              onClick={() => setShow("lamal")}
            >
              {t("LAMAL")}
            </button>
            <button
              className={`h-full flex-1 ${
                show === "lca"
                  ? "bg-secondary text-white"
                  : "bg-neutral-200 text-dark "
              }`}
              onClick={() => setShow("lca")}
            >
              {t("LCA")}
            </button>
          </div>
        </div>
        <div>
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
      </div>
    </motion.div>
  );
};

export default Result;
