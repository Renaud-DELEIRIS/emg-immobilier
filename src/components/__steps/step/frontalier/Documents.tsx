import { useState } from "react";
import Button from "~/components/button/Button";
import FileInput from "~/components/inputs/FileInput";
import TextInput from "~/components/inputs/TextInput";

const Documents = () => {
  const [iban, setIban] = useState<string>("");
  const [avs, setAvs] = useState<string>("");
  const [justificatifDomicile, setJustificatifDomicile] = useState<string>("");
  const [permisTravail, setPermisTravail] = useState<string>("");
  const [pieceDidendite, setPieceDidendite] = useState<string>("");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">Documents communs :</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextInput
            label="IBAN (Facultatif)"
            placeholder="P. ex. FR76XXXXXXXXXXXXXXXXXXXXXXX"
            value={iban}
            onChange={(value) => setIban(value)}
          />
          <FileInput
            label="Justificatif de domicile"
            placeholder="Justificatif de domicile"
            value={justificatifDomicile}
            onChange={(value) => setJustificatifDomicile(justificatifDomicile)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">Documents communs :</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          <TextInput
            label="Numéro AVS (Facultatif)"
            placeholder="P. ex. 756.XXXX.XXXX.XX"
            value={avs}
            onChange={(value) => setAvs(value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Button
          intent={"outline"}
          onClick={() => {
            // TODO
          }}
        >
          Continuer plus tard
        </Button>
        <Button
          onClick={() => {
            // TODO
          }}
          disabled={!permisTravail || !pieceDidendite || !justificatifDomicile}
        >
          Finaliser mon dossier
        </Button>
      </div>
    </div>
  );
};

export default Documents;
