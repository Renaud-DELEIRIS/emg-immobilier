import { Dialog } from "@headlessui/react";
import { IconCircleCheckFilled, IconInfoCircle } from "@tabler/icons-react";
import { Trans, useTranslation } from "next-i18next";
import { useState } from "react";
import Button from "~/components/button/Button";
import AvsInput from "~/components/inputs/Avs";
import FileInput from "~/components/inputs/FileInput";
import TextInput from "~/components/inputs/TextInput";
import { useFormStore } from "~/stores/form";

const Documents = () => {
  const [iban, setIban] = useState<string>("");
  const [avs, setAvs] = useState<string>("");
  const [justificatifDomicile, setJustificatifDomicile] = useState<string>("");
  const [permisTravail, setPermisTravail] = useState<string>("");
  const [pieceDidendite, setPieceDidendite] = useState<string>("");
  const [openCompleteLater, setOpenCompleteLater] = useState<boolean>(false);
  const [openComplete, setOpenComplete] = useState<boolean>(false);
  const lead = useFormStore((state) => state.data);
  const { t } = useTranslation("frontalier");

  const onPressLater = () => {
    setOpenCompleteLater(true);
    // TODO
  };

  const onPressContinue = () => {
    // TODO
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">{t("DOCUMENT_TITLE_COMMUN")}</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="rounded-lg border bg-white p-4 shadow">
            <TextInput
              label={t("DOCUMENT_IBAN_LABEL")}
              placeholder="P. ex. FR76XXXXXXXXXXXXXXXXXXXXXXX"
              value={iban}
              onChange={(value) => setIban(value)}
            />
            <p className="mt-2 text-sm text-gray-500">
              <IconInfoCircle size={16} className="mr-2 inline-block" />
              {t("DOCUMENT_IBAN_INFO")}
            </p>
          </div>
          <FileInput
            label={t("DOCUMENT_DOMICILE_LABEL")}
            placeholder={t("DOCUMENT_DOMICILE_LABEL")}
            value={justificatifDomicile}
            onChange={(value) => setJustificatifDomicile(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">{t("DOCUMENT_TITLE_YOUR")}</h3>
        <div className="grid grid-cols-1 gap-4">
          <FileInput
            label={t("DOCUMENT_IDENTITE_LABEL")}
            placeholder={t("DOCUMENT_IDENTITE_LABEL")}
            value={pieceDidendite}
            onChange={(value) => setPieceDidendite(value)}
          />
          <FileInput
            label={t("DOCUMENT_CONTRAT_TRAVAIL_LABEL")}
            placeholder={t("DOCUMENT_CONTRAT_TRAVAIL_LABEL")}
            value={permisTravail}
            onChange={(value) => setPermisTravail(value)}
          />
          <div className="rounded-lg border bg-white p-4 shadow">
            <AvsInput
              label={t("DOCUMENT_AVS_LABEL")}
              placeholder="P. ex. 756.XXXX.XXXX.XX"
              value={avs}
              onChange={(value) => setAvs(value)}
            />
            <p className="mt-2 text-sm text-gray-500">
              <IconInfoCircle size={16} className="mr-2 inline-block" />
              {t("DOCUMENT_AVS_INFO")}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Button
          intent={"outline"}
          onClick={() => {
            onPressLater();
          }}
        >
          {t("DOCUMENT_LATER")}
        </Button>
        <Button
          onClick={() => {
            onPressContinue();
          }}
          disabled={!permisTravail || !pieceDidendite || !justificatifDomicile}
        >
          {t("DOCUMENT_COMPLETE")}
        </Button>
      </div>
      <Dialog
        open={openCompleteLater}
        onClose={() => null}
        className="fixed inset-0 z-30 overflow-y-auto"
      >
        <div className=" flex min-h-screen w-screen justify-center bg-white pt-16 md:pt-28">
          <div className="rounded-lg bg-white p-8 text-center">
            <IconCircleCheckFilled size={64} className="mx-auto text-primary" />
            <Dialog.Title className="mt-4 text-lg font-bold md:text-xl">
              {t("DOCUMENT_COMPLETE_LATER_TITLE")}
            </Dialog.Title>
            <p className="mt-2 max-w-sm text-sm text-dark md:max-w-lg md:text-base">
              <Trans
                i18nKey="DOCUMENT_COMPLETE_LATER_TEXT"
                t={t}
                values={{
                  email: lead?.email || "",
                }}
              />
            </p>
            <Button
              onClick={() => {
                setOpenCompleteLater(false);
              }}
              className="mt-4"
            >
              {t("DOCUMENT_COMPLETE_LATER_ACTION")}
            </Button>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={openComplete}
        onClose={() => null}
        className="fixed inset-0 z-30 overflow-y-auto"
      >
        <div className=" flex min-h-screen w-screen justify-center bg-white pt-16 md:pt-28">
          <div className="rounded-lg bg-white p-8 text-center">
            <IconCircleCheckFilled size={64} className="mx-auto text-primary" />
            <Dialog.Title className="mt-4 text-lg font-bold md:text-xl">
              {t("DOCUMENT_COMPLETE_NOW_TITLE")}
            </Dialog.Title>
            <p className="mt-2 max-w-sm text-sm text-dark md:max-w-lg md:text-base">
              {t("DOCUMENT_COMPLETE_NOW_TEXT")}
            </p>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Documents;
