import { IconCheck, IconCircleCheck } from "@tabler/icons-react";
import { useState } from "react";
import Button from "~/components/button/Button";
import Tile from "~/components/button/Tile";
import Select from "~/components/inputs/Select";
import TextInput from "~/components/inputs/TextInput";
import TileInput from "~/components/inputs/Tile";
import FlatModal from "~/components/modal/FlatModal";
import { type Lamal } from "~/types/comparatif";

interface Props {
  open: boolean;
  onClose: () => void;
  lamal: Lamal;
}

const ModalSouscrireLamal = ({ open, onClose, lamal }: Props) => {
  const [affiliation, setAffiliation] = useState<string>();
  const [affiliattionCaisse, setAffiliationCaisse] = useState("");
  const [affiliationTime, setAffiliationTime] = useState("");

  const sendInfo = () => {
    onClose();
  };

  return (
    <FlatModal open={open} onClose={onClose}>
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
        <IconCircleCheck className="text-primary-600" size={64} />
        <h1 className="mt-4 text-xl font-bold text-neutral-700">
          Votre demande a bien été enregistrée
        </h1>
        <h3 className="mt-2 text-lg font-semibold text-neutral-700">
          {lamal.caisse} - {lamal.modele}
        </h3>
        <p className="mt-1 text-lg text-neutral-600">
          <strong>CHF {lamal.mois}</strong> / mois
        </p>
        <p className="mt-4 text-sm">
          Vous pouvez gagner du temps sur votre souscription en répondant aux
          questions suivantes
        </p>
        <p className="mt-4 text-sm font-bold">
          Possedez-vous une caisse d‘assurance pour vos assurances
          complémentaires ?
        </p>
        <div className="mt-4 flex w-full flex-col gap-4">
          <div className="flex w-full flex-row items-center gap-2">
            <Tile
              selected={affiliation === "oui"}
              onClick={() => setAffiliation("oui")}
              widthFull
            >
              Oui
            </Tile>
            <Tile
              selected={affiliation === "non"}
              onClick={() => setAffiliation("non")}
              widthFull
            >
              Non
            </Tile>
          </div>
          {affiliation === "non" && (
            <Button onClick={sendInfo}>Envoyé mes informations</Button>
          )}
          {affiliation === "oui" && (
            <>
              <TextInput
                label="À quelle caisse êtes-vous affilié ?"
                placeholder="Caisse"
                value={affiliattionCaisse}
                onChange={(e) => setAffiliationCaisse(e)}
              />
              <Select
                options={[
                  {
                    label: "Moins d'un an",
                    value: "moins_d_un_an",
                  },
                  {
                    label: "Entre 1 et 3 ans",
                    value: "entre_1_et_3_ans",
                  },
                  {
                    label: "Plus de 3 ans",
                    value: "plus_de_3_ans",
                  },
                ]}
                label="Depuis combien de temps êtes-vous affilié ?"
                value={affiliationTime}
                onChange={(e) => setAffiliationTime(e)}
                placeholder="Sélectionner"
              />
              {affiliationTime && affiliattionCaisse && (
                <Button onClick={sendInfo} className="mt-4">
                  Envoyé mes informations
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