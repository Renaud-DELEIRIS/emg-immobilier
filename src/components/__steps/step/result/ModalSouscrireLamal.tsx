import { IconCircleCheck } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "~/components/button/Button";
import { SelectInput } from "~/components/inputs/Select";
import TextInput from "~/components/inputs/TextInput";
import FlatModal from "~/components/modal/FlatModal";
import { type Adherent } from "~/constants/lead.constant";
import { env } from "~/env.mjs";
import { useFormStore } from "~/stores/form";
import { type Lamal } from "~/types/comparatif";

interface Props {
  open: boolean;
  onClose: () => void;
  lamal: Lamal;
  adherent: Adherent;
}

const ModalSouscrireLamal = ({ open, onClose, lamal, adherent }: Props) => {
  const [affiliation, setAffiliation] = useState<string>();
  const [affiliattionCaisse, setAffiliationCaisse] = useState("");
  const [affiliationTime, setAffiliationTime] = useState("");
  const lead = useFormStore((state) => state.data);
  const { t } = useTranslation("result");
  const { t: tCommon } = useTranslation("common");

  const sendInfo = () => {
    const commentaire = `Pour ${
      adherent.type === "main"
        ? "personne principal"
        : adherent.type === "partner"
        ? adherent.civility === "man"
          ? "conjoint"
          : "conjointe"
        : `enfant né en ${adherent?.year || ""}`
    } : ${
      !!(affiliation === "non")
        ? `Non affilié pour Lamal.`
        : `Affilié Lamal chez ${affiliattionCaisse} depuis ${affiliationTime}.`
    }`;
    try {
      void fetch(
        `${
          env.NEXT_PUBLIC_APIV2_ROOT
        }/addcmtleadcomparea?commentaire=${commentaire}&idlead=${
          lead.idLead || ""
        }`
      );
      void toast.success("Vos informations ont bien été reçus.");
    } catch (error: any) {
      void toast.error("Une erreur est survenue.");
    } finally {
      onClose();
    }
  };

  return (
    <FlatModal open={open} onClose={onClose}>
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
        <IconCircleCheck className="text-primary-600" size={64} />
        <h1 className="mt-4 text-xl font-bold text-neutral-700">
          {t("SOUSCRIRE_TITLE")}
        </h1>
        <h3 className="mt-2 text-lg font-semibold text-neutral-700">
          {lamal.caisse} - {lamal.modele}
        </h3>
        <p className="mt-1 text-lg text-neutral-600">
          <p className="mt-1 text-lg text-neutral-600">
            <strong>
              {new Intl.NumberFormat("de-CH", {
                style: "currency",
                currency: "CHF",
                maximumFractionDigits: 0,
              }).format(parseInt(lamal.mois))}
            </strong>{" "}
            / {t("MONTH")}
          </p>
        </p>
        <p className="mt-4 text-sm">{t("SOUSCRIRE_DESCRIPTION")}</p>
        <p className="mt-4 text-sm font-bold">
          {t("SOUSCRIRE_QUESTION_LAMAL")}
        </p>
        <div className="mt-4 flex w-full flex-col gap-4">
          {/* <div className="flex w-full flex-row items-center gap-2">
            <Tile
              selected={affiliation === "oui"}
              onClick={() => setAffiliation("oui")}
              widthFull
            >
              {tCommon("YES")}
            </Tile>
            <Tile
              selected={affiliation === "non"}
              onClick={() => setAffiliation("non")}
              widthFull
            >
              {tCommon("NO")}
            </Tile>
          </div> */}
          {affiliation === "non" && (
            <Button onClick={sendInfo}>{t("SOUSCRIRE_SEND_INFO")}</Button>
          )}
          {affiliation === "oui" && (
            <>
              <TextInput
                label={t("SOUSCRIRE_CAISSE_LABEL")}
                placeholder={t("SOUSCRIRE_CAISSE_PLACEHOLDER")}
                value={affiliattionCaisse}
                onChange={(e) => setAffiliationCaisse(e)}
              />
              <SelectInput
                options={[
                  {
                    label: t("SOUSCRIRE_SINCE_LESS"),
                    value: "moins_d_un_an",
                  },
                  {
                    label: t("SOUSCRIRE_SINCE_BETWEEN"),
                    value: "entre_1_et_3_ans",
                  },
                  {
                    label: t("SOUSCRIRE_SINCE_MORE"),
                    value: "plus_de_3_ans",
                  },
                ]}
                label={t("SOUSCRIRE_SINCE_LABEL")}
                value={affiliationTime}
                onChange={(e) => setAffiliationTime(e)}
                placeholder={tCommon("SELECT")}
              />
              {affiliationTime && affiliattionCaisse && (
                <Button onClick={sendInfo} className="mt-4">
                  {t("SOUSCRIRE_SEND_INFO")}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </FlatModal>
  );
};

export default ModalSouscrireLamal;
