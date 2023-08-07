import { Dialog } from "@headlessui/react";
import {
  IconCheck,
  IconCircleCheck,
  IconCircleCheckFilled,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useState } from "react";
import { set } from "zod";
import Button from "~/components/button/Button";
import AvsInput from "~/components/inputs/Avs";
import FileInput from "~/components/inputs/FileInput";
import TextInput from "~/components/inputs/TextInput";
import { useLead } from "~/components/provider/LeadProvider";

const Documents = () => {
  const { lead } = useLead();
  const [iban, setIban] = useState<string>("");
  const [avs, setAvs] = useState<string>("");
  const [justificatifDomicile, setJustificatifDomicile] = useState<string>("");
  const [permisTravail, setPermisTravail] = useState<string>("");
  const [pieceDidendite, setPieceDidendite] = useState<string>("");
  const [openCompleteLater, setOpenCompleteLater] = useState<boolean>(false);
  const [openComplete, setOpenComplete] = useState<boolean>(false);
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
        <h3 className="text-lg font-bold">Documents communs :</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="rounded-lg border bg-white p-4 shadow">
            <TextInput
              label="IBAN (Facultatif)"
              placeholder="P. ex. FR76XXXXXXXXXXXXXXXXXXXXXXX"
              value={iban}
              onChange={(value) => setIban(value)}
            />
            <p className="mt-2 text-sm text-gray-500">
              <IconInfoCircle size={16} className="mr-2 inline-block" />
              Votre IBAN vous permettra de bénéficier des futurs remboursement de frais de santé
            </p>
          </div>
          <FileInput
            label="Justificatif de domicile"
            placeholder="Justificatif de domicile"
            value={justificatifDomicile}
            onChange={(value) => setJustificatifDomicile(justificatifDomicile)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">Vos documents :</h3>
        <div className="grid grid-cols-1 gap-4">
          <FileInput
            label="Pièce d'identité"
            placeholder="Pièce d'identité"
            value={pieceDidendite}
            onChange={(value) => setPieceDidendite(value)}
          />
          <FileInput
            label="Contrat de travail ou Permis G"
            placeholder="Contrat de travail ou Permis G"
            value={permisTravail}
            onChange={(value) => setPermisTravail(value)}
          />
          <div className="rounded-lg border bg-white p-4 shadow">
            <AvsInput
              label="Numéro AVS (Facultatif)"
              placeholder="P. ex. 756.XXXX.XXXX.XX"
              value={avs}
              onChange={(value) => setAvs(value)}
            />
            <p className="mt-2 text-sm text-gray-500">
              <IconInfoCircle size={16} className="mr-2 inline-block" />
              Vous trouverez votre numéro AVS sur votre carte d'assuré. Il ne sera pas nécessaire dans le cas d'une première souscription.
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
          Continuer plus tard
        </Button>
        <Button
          onClick={() => {
            onPressContinue();
          }}
          disabled={!permisTravail || !pieceDidendite || !justificatifDomicile}
        >
          Finaliser mon dossier
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
              A plus tard !
            </Dialog.Title>
            <p className="mt-2 max-w-sm text-sm text-dark md:max-w-lg md:text-base">
              Un email vous a été envoyé à l&apos;adresse <b>{lead.email}</b>{" "}
              avec un lien vous permettant de poursuivre votre souscription.
            </p>
            <Button
              onClick={() => {
                setOpenCompleteLater(false);
              }}
              className="mt-4"
            >
              Remplir mon dossier
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
              Votre dossier est complet !
            </Dialog.Title>
            <p className="mt-2 max-w-sm text-sm text-dark md:max-w-lg md:text-base">
              Vous allez être recontacté par un de nos conseillers dans les
              prochaines 48h.
            </p>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Documents;
