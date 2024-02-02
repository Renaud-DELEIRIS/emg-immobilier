import { Dialog } from "@headlessui/react";
import { IconCircleCheckFilled, IconInfoCircle } from "@tabler/icons-react";
import dayjs from "dayjs";
import { type GetStaticProps, type NextPage } from "next";
import { Trans, useTranslation } from "next-i18next";
import nextI18nextConfig from "next-i18next.config.mjs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "~/components/button/Button";
import FileInput from "~/components/inputs/FileInput";
import TextInput from "~/components/inputs/TextInput";
import Footer from "~/components/navigation/Footer";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";
import base64MimeType from "~/utils/base64Mime";
import getParamsUrl from "~/utils/client/getParamsUrl";

interface HTTPData {
  iban: string;
  files: {
    name: string;
    profilId: number;
    type: string;
    url: string;
  }[];
  memberProfils: {
    birthdate: string;
    gender: string;
    id: number;
    subscriber: boolean;
    avs: string;
  }[];
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(
        ctx.locale ?? "fr",
        ["common", "footer", "sidebar", "frontalier", "result"],
        nextI18nextConfig
      )),
    },
  };
};
const Home: NextPage = () => {
  const { t } = useTranslation("frontalier");
  const router = useRouter();

  const { mutateAsync: createPresignedUrl } =
    api.createPresignedUrl.useMutation();

  const [documentsSent, setDocumentsSent] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [iban, setIban] = useState("");
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
  const [adherents, setAdherents] = useState<
    {
      id: number;
      type: string;
      civility: string;
      dob: string;
      avs: string;
    }[]
  >([]);

  useEffect(() => {
    // Const get leadId from url params
    const { leadId } = getParamsUrl();
    if (!leadId) {
      void router.push("/");
      return;
    }
    fetch(
      `${env.NEXT_PUBLIC_APIV2_ROOT}/comparea/getdossierlamal?leadId=${leadId}`
    )
      .then((r) => r.json())
      .then((d: HTTPData) => {
        setIban(d.iban);
        const justif = d.files.find((f) => f.type === "justificatif-domicile");
        if (justif) setJustificatifDomicile("COMPAREA_FILE:" + justif.url);
        setAdherents(
          d.memberProfils
            .filter((p) => p.subscriber)
            .map((p) => ({
              id: p.id,
              type: p.id === 1 ? "main" : p.id === 2 ? "partner" : "child",
              civility: p.gender === "Homme" ? "male" : "female",
              dob: p.birthdate,
              avs: p.avs,
            }))
        );
        setPermisTravail(
          d.files
            .filter((f) => f.type === "permis-travail")
            .map((f) => ({
              profilIndex: f.profilId,
              base64: "COMPAREA_FILE:" + f.url,
            }))
        );
        setPieceDidendite(
          d.files
            .filter((f) => f.type === "piece-idendite")
            .map((f) => ({
              profilIndex: f.profilId,
              base64: "COMPAREA_FILE:" + f.url,
            }))
        );
        setLoaded(true);
      })
      .catch(() => {
        toast.error("Erreur lors du chargement du dossier.");
      });
  }, []);

  const sendDocuments = async () => {
    const { leadId } = getParamsUrl();
    if (!leadId) return;
    const files: {
      profilId: number;
      type: string;
      name: string;
      url: string;
    }[] = [];
    if (justificatifDomicile) {
      if (justificatifDomicile.startsWith("COMPAREA_FILE:")) {
        files.push({
          profilId: 1,
          type: "justificatif-domicile",
          name: "Justificatif de domicile",
          url: justificatifDomicile.split(":")[1] || "",
        });
      } else {
        const { url, headers, key } = await createPresignedUrl({
          token: leadId,
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
    }

    for (const permisTravailFile of permisTravail) {
      const adherent = adherents.find(
        (a) => a.id === permisTravailFile.profilIndex
      );
      if (!adherent) continue;
      const fileName =
        adherent.type === "main"
          ? "Permis de travail"
          : adherent.type === "partner"
          ? "Permis de travail conjoint"
          : "Permis de travail enfant né en " +
            (dayjs(adherent.dob).year().toString() || "");

      if (permisTravailFile.base64.startsWith("COMPAREA_FILE:")) {
        files.push({
          profilId: adherent.id,
          type: "permis-travail",
          name: fileName,
          url: permisTravailFile.base64.split(":")[1] || "",
        });
      } else {
        const { url, headers, key } = await createPresignedUrl({
          token: leadId,
          filename: fileName,
          contentType: base64MimeType(permisTravailFile.base64),
        });
        await fetch(url, {
          method: "PUT",
          headers,
          body: Buffer.from(permisTravailFile.base64.split(",")[1]!, "base64"),
        });
        files.push({
          profilId: adherent.id,
          type: "permis-travail",
          name: fileName,
          url: key,
        });
      }
    }

    for (const pieceDidenditeFile of pieceDidendite) {
      const adherent = adherents.find(
        (a) => a.id === pieceDidenditeFile.profilIndex
      );
      if (!adherent) continue;

      const fileName =
        adherent.type === "main"
          ? "pi-main"
          : adherent.type === "partner"
          ? "pi-partner"
          : "pi-child-" + (dayjs(adherent.dob).year().toString() || "");

      if (pieceDidenditeFile.base64.startsWith("COMPAREA_FILE:")) {
        files.push({
          profilId: adherent.id,
          type: "piece-idendite",
          name: fileName,
          url: pieceDidenditeFile.base64.split(":")[1] || "",
        });
      } else {
        const { url, headers, key } = await createPresignedUrl({
          token: leadId,
          filename: fileName,
          contentType: base64MimeType(pieceDidenditeFile.base64),
        });
        await fetch(url, {
          method: "PUT",
          headers,
          body: Buffer.from(pieceDidenditeFile.base64.split(",")[1]!, "base64"),
        });
        files.push({
          profilId: adherent.id,
          type: "piece-idendite",
          name: fileName,
          url: key,
        });
      }
      setDocumentsSent(true);
    }

    await fetch(`${env.NEXT_PUBLIC_APIV2_ROOT}/comparea/postlatedocuments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leadId,
        iban,
        documents: files,
      }),
    });
  };

  return (
    <>
      <Head>
        <title>Comparea.ch - Comparateur de Bases et de Complémentaires</title>
        <meta
          name="description"
          content="Comparea.ch - Comparateur de Bases et de Complémentaires"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="relative flex min-h-screen flex-col pt-16">
        {loaded && (
          <>
            <div className="mx-auto w-full max-w-4xl flex-1 px-4 pb-36 pt-12 md:pt-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-bold">
                    {t("DOCUMENT_TITLE_COMMUN")}
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="rounded-lg border bg-white p-4 shadow">
                      <TextInput
                        label={t("DOCUMENT_IBAN_LABEL")}
                        placeholder="P. ex. FR76XXXXXXXXXXXXXXXXXXXXXXX"
                        value={iban}
                        onChange={(value) => setIban(value)}
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        <IconInfoCircle
                          size={16}
                          className="mr-2 inline-block"
                        />
                        {t("DOCUMENT_IBAN_INFO")}
                      </p>
                    </div>
                    <FileInput
                      label={t("DOCUMENT_DOMICILE_LABEL")}
                      placeholder={t("DOCUMENT_DOMICILE_LABEL")}
                      onChange={(value) => setJustificatifDomicile(value)}
                      existing={justificatifDomicile.length > 0}
                    />
                  </div>
                </div>
                {adherents.map((adherent) => {
                  return (
                    <div className="flex flex-col gap-4" key={adherent.id}>
                      <h3 className="text-lg font-bold">
                        {adherent.type === "main"
                          ? t("DOCUMENT_TITLE_YOUR")
                          : adherent.type === "partner"
                          ? adherent.civility === "female"
                            ? t("DOCUMENT_TITLE_SPOUSE_FEMALE")
                            : t("DOCUMENT_TITLE_SPOUSE_MALE")
                          : t("DOCUMENT_TITLE_CHILD", {
                              year: dayjs(adherent.dob).year() || "",
                            })}
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        <FileInput
                          label={t("DOCUMENT_IDENTITE_LABEL")}
                          placeholder={t("DOCUMENT_IDENTITE_LABEL")}
                          existing={
                            !!pieceDidendite.find(
                              (f) => f.profilIndex === adherent.id
                            )?.base64
                          }
                          onChange={(value) =>
                            setPieceDidendite((prev) => {
                              // Remove old adherent
                              const pieceDidendite = prev.filter(
                                (permisTravail) =>
                                  permisTravail.profilIndex !== adherent.id
                              );
                              // Add new adherent
                              pieceDidendite.push({
                                base64: value,
                                profilIndex: adherent.id,
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
                            existing={
                              !!permisTravail.find(
                                (f) => f.profilIndex === adherent.id
                              )?.base64
                            }
                            onChange={(value) =>
                              setPermisTravail((prev) => {
                                // Remove old adherent
                                const newPermisTravail = prev.filter(
                                  (permisTravail) =>
                                    permisTravail.profilIndex !== adherent.id
                                );
                                // Add new adherent
                                newPermisTravail.push({
                                  base64: value,
                                  profilIndex: adherent.id,
                                });
                                return newPermisTravail;
                              })
                            }
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Button
                    onClick={() => {
                      void sendDocuments();
                    }}
                  >
                    Envoyer mes documents
                  </Button>
                </div>
              </div>
            </div>
            <Footer />
          </>
        )}
      </main>
      <Dialog
        open={documentsSent}
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
              Vos documents ont bien été enregistrés. Si votre dossier est
              complet, un agent prendra contact avec vous prochainement afin de
              confirmer votre souscription.
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

export default Home;
