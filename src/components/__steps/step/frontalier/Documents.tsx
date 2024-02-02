import { Dialog } from "@headlessui/react";
import { IconCircleCheckFilled, IconInfoCircle } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Trans, useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import AvsInput from "~/components/inputs/Avs";
import FileInput from "~/components/inputs/FileInput";
import TextInput from "~/components/inputs/TextInput";
import { useFormStore } from "~/stores/form";
import { api } from "~/utils/api";
import sendDocuments from "~/utils/api/sendDocuments";
import base64MimeType from "~/utils/base64Mime";
import { formatTelephone } from "~/utils/formatTelephone";
import { getProfilId } from "~/utils/getProfilId";

const Documents = () => {
  const [iban, setIban] = useState<string>("");
  const [avs, setAvs] = useState<
    {
      avs: string;
      profilIndex: number;
    }[]
  >([]);
  const [justificatifDomicile, setJustificatifDomicile] = useState<string>("");
  const [permisTravail, setPermisTravail] = useState<
    {
      base64: string;
      profilIndex: number;
    }[]
  >([]);
  const [pieceDidendite, setPieceDidendite] = useState<
    {
      base64: string;
      profilIndex: number;
    }[]
  >([]);
  const [openCompleteLater, setOpenCompleteLater] = useState<boolean>(false);
  const [openComplete, setOpenComplete] = useState<boolean>(false);
  const lead = useFormStore((state) => state.data);
  const { t } = useTranslation("frontalier");

  const { mutateAsync: createPresignedUrl } =
    api.createPresignedUrl.useMutation();

  useEffect(() => {
    //Scroll top
    window.scrollTo(0, 0);
  }, []);

  const onPressLater = () => {
    setOpenCompleteLater(true);
    void uploadDocuments(false);
    // TODO
  };

  const onPressContinue = () => {
    setOpenComplete(true);
    void uploadDocuments(true);
    // TODO
  };

  const uploadDocuments = async (completed: boolean) => {
    if (!lead.idLead) {
      return;
    }
    const files: {
      profilId: number;
      type: string;
      name: string;
      url: string;
    }[] = [];
    if (justificatifDomicile) {
      const { headers, url, key } = await createPresignedUrl({
        token: lead.idLead,
        filename: "Justificatif de domicile",
        contentType: base64MimeType(justificatifDomicile),
      });
      await fetch(url, {
        method: "PUT",
        headers,
        body: Buffer.from(justificatifDomicile.split(",")[1]!, "base64"),
      });
      files.push({
        profilId: 1,
        type: "justificatif-domicile",
        name: "Justificatif de domicile",
        url: key,
      });
    }
    //
    for (const permisTravailFile of permisTravail) {
      const adherent = lead.adherent[permisTravailFile.profilIndex]!;
      const profilId = getProfilId(adherent, permisTravailFile.profilIndex);
      const fileName =
        adherent.type === "main"
          ? "Permis de travail"
          : adherent.type === "partner"
          ? "Permis de travail conjoint"
          : "Permis de travail enfant né en " + (adherent.year || "");

      const { headers, url, key } = await createPresignedUrl({
        token: lead.idLead,
        filename: fileName,
        contentType: base64MimeType(permisTravailFile.base64),
      });
      await fetch(url, {
        method: "PUT",
        headers,
        body: Buffer.from(permisTravailFile.base64.split(",")[1]!, "base64"),
      });
      files.push({
        profilId,
        type: "permis-travail",
        name: fileName,
        url: key,
      });
    }

    for (const pieceDidenditeFile of pieceDidendite) {
      const adherent = lead.adherent[pieceDidenditeFile.profilIndex]!;
      const profilId = getProfilId(adherent, pieceDidenditeFile.profilIndex);

      const fileName =
        adherent.type === "main"
          ? "pi-main"
          : adherent.type === "partner"
          ? "pi-partner"
          : "pi-child-" + (adherent.year || "");

      const { headers, url, key } = await createPresignedUrl({
        token: lead.idLead,
        filename: fileName,
        contentType: base64MimeType(pieceDidenditeFile.base64),
      });
      await fetch(url, {
        method: "PUT",
        headers,
        body: Buffer.from(pieceDidenditeFile.base64.split(",")[1]!, "base64"),
      });
      files.push({
        profilId,
        type: "piece-idendite",
        name: fileName,
        url: key,
      });
    }
    await sendDocuments({
      leadId: lead.idLead,
      startInsurance: lead.startInsurance,
      paymentFrequency: lead.paymentFrequency,
      address: lead.address,
      adherents: lead.adherent,
      documents: files,
      completed,
      iban,
    });
  };

  return (
    <>
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
                autocomplete="iban"
              />
              <p className="mt-2 text-sm text-gray-500">
                <IconInfoCircle size={16} className="mr-2 inline-block" />
                {t("DOCUMENT_IBAN_INFO")}
              </p>
            </div>
            <FileInput
              label={t("DOCUMENT_DOMICILE_LABEL")}
              placeholder={t("DOCUMENT_DOMICILE_LABEL")}
              onChange={(value) => setJustificatifDomicile(value)}
            />
          </div>
        </div>
        {lead.selectedAdherent.map((adherentIndex) => {
          const adherent = lead.adherent[adherentIndex]!;
          return (
            <div className="flex flex-col gap-4" key={adherentIndex}>
              <h3 className="text-lg font-bold">
                {adherent.type === "main"
                  ? t("DOCUMENT_TITLE_YOUR")
                  : adherent.type === "partner"
                  ? adherent.civility === "female"
                    ? t("DOCUMENT_TITLE_SPOUSE_FEMALE")
                    : t("DOCUMENT_TITLE_SPOUSE_MALE")
                  : t("DOCUMENT_TITLE_CHILD", {
                      year: adherent.year || "",
                    })}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <FileInput
                  label={t("DOCUMENT_IDENTITE_LABEL")}
                  placeholder={t("DOCUMENT_IDENTITE_LABEL")}
                  onChange={(value) =>
                    setPieceDidendite((prev) => {
                      // Remove old adherent
                      const pieceDidendite = prev.filter(
                        (permisTravail) =>
                          permisTravail.profilIndex !== adherentIndex
                      );
                      // Add new adherent
                      pieceDidendite.push({
                        base64: value,
                        profilIndex: adherentIndex,
                      });
                      return pieceDidendite;
                    })
                  }
                />
                {!(
                  adherent.type === "child" &&
                  dayjs(adherent.dob).year() > dayjs().year() - 18
                ) && (
                  <FileInput
                    label={t("DOCUMENT_CONTRAT_TRAVAIL_LABEL")}
                    placeholder={t("DOCUMENT_CONTRAT_TRAVAIL_LABEL")}
                    onChange={(value) =>
                      setPermisTravail((prev) => {
                        // Remove old adherent
                        const newPermisTravail = prev.filter(
                          (permisTravail) =>
                            permisTravail.profilIndex !== adherentIndex
                        );
                        // Add new adherent
                        newPermisTravail.push({
                          base64: value,
                          profilIndex: adherentIndex,
                        });
                        return newPermisTravail;
                      })
                    }
                  />
                )}
                <div className="rounded-lg border bg-white p-4 shadow">
                  <AvsInput
                    label={t("DOCUMENT_AVS_LABEL")}
                    placeholder="P. ex. 756.XXXX.XXXX.XX"
                    value={
                      avs.find((avs) => avs.profilIndex === adherentIndex)
                        ?.avs || ""
                    }
                    onChange={(value) => {
                      setAvs((prev) => {
                        // Remove old adherent
                        const newAvs = prev.filter(
                          (avs) => avs.profilIndex !== adherentIndex
                        );
                        // Add new adherent
                        newAvs.push({
                          avs: value,
                          profilIndex: adherentIndex,
                        });
                        return newAvs;
                      });
                    }}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    <IconInfoCircle size={16} className="mr-2 inline-block" />
                    {t("DOCUMENT_AVS_INFO")}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Button
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
            disabled={
              !justificatifDomicile ||
              pieceDidendite.length !== lead.selectedAdherent.length ||
              permisTravail.length !== lead.selectedAdherent.length
            }
          >
            {t("DOCUMENT_COMPLETE")}
          </Button>
        </div>
      </div>
      <Dialog
        open={openCompleteLater}
        onClose={() => null}
        className="fixed inset-0 z-30 overflow-y-auto"
      >
        <div className="min-h-screen w-full bg-white pt-16 text-center md:pt-28">
          <div className="mx-auto grid max-w-lg grid-cols-1 items-center rounded-lg bg-white px-4 py-8 text-center">
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
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => {
                  setOpenCompleteLater(false);
                }}
                className="mt-4"
              >
                {t("DOCUMENT_COMPLETE_LATER_ACTION")}
              </Button>
              {/* <Button href="https://www.comparea.ch" intent={"outline"}>
                {t("DOCUMENT_COMPLETE_LATER_ACTION_2")}
              </Button> */}
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={openComplete}
        onClose={() => null}
        className="fixed inset-0 z-30 overflow-y-auto"
      >
        <div className="min-h-screen w-full bg-white pt-16 text-center md:pt-28">
          <div className="mx-auto grid max-w-lg grid-cols-1 items-center rounded-lg bg-white px-4 py-8 text-center">
            <IconCircleCheckFilled size={64} className="mx-auto text-primary" />
            <Dialog.Title className="mt-4 text-lg font-bold md:text-xl">
              {t("DOCUMENT_COMPLETE_NOW_TITLE")}
            </Dialog.Title>
            <p className="mx-auto mt-2 max-w-sm text-sm text-dark md:max-w-lg md:text-base">
              <Trans
                t={t}
                i18nKey={"DOCUMENT_COMPLETE_NOW_TEXT"}
                components={{
                  span: <span className="font-bold text-primary" />,
                  phone: (
                    <a
                      href="tel:022 566 16 47"
                      className="font-bold text-primary"
                    />
                  ),
                }}
                values={{
                  phone: formatTelephone(lead.phone),
                }}
              />
            </p>
            <p className="mx-auto mt-4 max-w-sm text-sm text-dark md:max-w-lg md:text-base">
              <Trans
                t={t}
                i18nKey={"DOCUMENT_COMPLETE_NOW_QUESTION"}
                components={{
                  phone: (
                    <a
                      href="tel:022 566 16 47"
                      className="font-bold text-primary"
                    />
                  ),
                }}
              />
            </p>
            {/* <Button href="https://www.comparea.ch" className="mt-6">
              {t("DOCUMENT_COMPLETE_LATER_ACTION_2")}
            </Button> */}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Documents;
