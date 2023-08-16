import { IconArrowLeft } from "@tabler/icons-react";
import { type ReactNode } from "react";
import Adherant from "~/components/__steps/step/Adherant";
import Assurance from "~/components/__steps/step/Assurance";
import ChoosePack from "~/components/__steps/step/ChoosePack";
import For from "~/components/__steps/step/For";
import Franchise from "~/components/__steps/step/Franchise";
import Hours from "~/components/__steps/step/Hours";
import BigLoader2 from "~/components/__steps/step/Loader";
import Name from "~/components/__steps/step/Name";
import Npa from "~/components/__steps/step/Npa";
import Situation from "~/components/__steps/step/Situation";
import Verification from "~/components/__steps/step/Verification";
import Documents from "~/components/__steps/step/frontalier/Documents";
import PersonalData from "~/components/__steps/step/frontalier/PersonalData";
import Profils from "~/components/__steps/step/frontalier/Profils";
import Recapitulatif from "~/components/__steps/step/frontalier/Recapitulatif";
import ResultFrontalier from "~/components/__steps/step/frontalier/ResultFrontalier";
import Souscrire from "~/components/__steps/step/frontalier/Souscire";
import Result from "~/components/__steps/step/result/Result";
import { ResultProvider } from "~/components/__steps/step/result/ResultProvider";
import { schemaData } from "~/constants/lead.constant";
import { StepId } from "~/constants/step.constant";

export const getStepComponent = (
  stepId: StepId,
  decreaseStep: () => void,
  lead: schemaData
) => {
  const childs: ReactNode[] = [];

  switch (stepId) {
    case "documents":
      childs.push(<Documents key={"documents"} />);
      childs.push(
        <div className=" mt-8" key={"title"}>
          <button
            className="mb-4 flex items-center gap-1 text-primary hover:underline"
            onClick={() => {
              decreaseStep();
            }}
          >
            <IconArrowLeft size={20} />
            <span>Retour</span>
          </button>
          <div className="relative mb-6 hidden text-3xl font-extrabold text-dark after:absolute after:-bottom-8 after:left-0 after:h-1.5 after:w-28 after:rounded-3xl after:bg-primary md:block">
            Documents
          </div>
        </div>
      );
      break;
    case "donnee-personnelle":
      childs.push(<PersonalData key={"personnelle"} />);
      childs.push(
        <div className=" mt-8" key={"title"}>
          <button
            className="mb-4 flex items-center gap-1 text-primary hover:underline"
            onClick={() => {
              decreaseStep();
            }}
          >
            <IconArrowLeft size={20} />
            <span>Retour</span>
          </button>
          <div className="relative mb-6 hidden text-3xl font-extrabold text-dark after:absolute after:-bottom-8 after:left-0 after:h-1.5 after:w-28 after:rounded-3xl after:bg-primary md:block">
            Preneur d&apos;assurance
          </div>
        </div>
      );
      break;
    case "profils":
      childs.push(<Profils key={"profil"} />);
      childs.push(
        <div className=" mt-8" key={"title"}>
          <button
            className="mb-4 flex items-center gap-1 text-primary hover:underline"
            onClick={() => {
              decreaseStep();
            }}
          >
            <IconArrowLeft size={20} />
            <span>Retour</span>
          </button>
          <div className="relative mb-6 hidden text-3xl font-extrabold text-dark after:absolute after:-bottom-8 after:left-0 after:h-1.5 after:w-28 after:rounded-3xl after:bg-primary md:block">
            Pour qui souhaitez vous souscrire ?
          </div>
        </div>
      );
      break;
    case "souscrire":
      childs.push(<Souscrire key={"souscrire"} />);
      childs.push(
        <div className=" mt-8" key={"title"}>
          <button
            className="mb-4 flex items-center gap-1 text-primary hover:underline"
            onClick={() => {
              decreaseStep();
            }}
          >
            <IconArrowLeft size={20} />
            <span>Retour</span>
          </button>
          <div className="relative mb-6 hidden text-3xl font-extrabold text-dark after:absolute after:-bottom-8 after:left-0 after:h-1.5 after:w-28 after:rounded-3xl after:bg-primary md:block">
            Souscription
          </div>
        </div>
      );
      break;
    case "recap-frontalier":
      childs.push(<Recapitulatif key={"recap"} />);
      childs.push(
        <div className=" mt-8" key={"title"}>
          <button
            className="mb-4 flex items-center gap-1 text-primary hover:underline"
            onClick={() => {
              decreaseStep();
            }}
          >
            <IconArrowLeft size={20} />
            <span>Retour</span>
          </button>
          <div className="relative mb-6 hidden text-3xl font-extrabold text-dark after:absolute after:-bottom-8 after:left-0 after:h-1.5 after:w-28 after:rounded-3xl after:bg-primary md:block">
            Récapitulatif
          </div>
        </div>
      );
      break;
    case "work-hours":
      childs.push(<Hours key={"hours"} />);
      childs.push(
        <div
          className="relative mb-6 mt-12 hidden text-3xl font-extrabold text-dark after:absolute after:-bottom-8 after:left-0 after:h-1.5 after:w-28 after:rounded-3xl after:bg-primary md:block"
          key={"title"}
        >
          Frontalier
        </div>
      );
      break;
    case "result-frontalier":
      childs.push(
        <div key={"result-frontalier"} className="md:pt-12">
          {!lead.verified && <Verification />}

          <ResultFrontalier />
        </div>
      );
      break;

    case "loader":
      childs.push(<BigLoader2 key={"loader"} />);
      break;
    case "result":
      return (
        <>
          <div className="mx-auto max-w-7xl md:py-8" key={"result"}>
            {lead.verified && <Verification />}
            <ResultProvider>
              <Result />
            </ResultProvider>
          </div>
        </>
      );
    case "name":
      childs.push(<Name key={"name"} />);
      childs.push(
        <div
          className="relative mb-6 mt-12 hidden text-3xl font-extrabold text-dark after:absolute after:-bottom-8 after:left-0 after:h-1.5 after:w-28 after:rounded-3xl after:bg-primary md:block"
          key={"title"}
        >
          Finalisation
        </div>
      );
      break;
    case "package":
      childs.push(<ChoosePack key={"package"} />);
    case "franchise":
      childs.push(<Franchise key={"franchise"} />);
      childs.push(
        <div
          className="relative mb-6 mt-12 hidden text-3xl font-extrabold text-dark after:absolute after:-bottom-8 after:left-0 after:h-1.5 after:w-28 after:rounded-3xl after:bg-primary md:block"
          key={"title"}
        >
          Besoins
        </div>
      );
      break;
    case "situation":
    case "assurance-actuelle":
      if (stepId === "situation") childs.push(<Situation key={"situation"} />);
      else childs.push(<Assurance key={"assurance-actuelle"} />);
    case "npa":
      childs.push(<Npa key={"npa"} />);
    case "adherent":
      childs.push(<Adherant key={"adherant"} />);
    case "for-who":
      childs.push(<For key={"for-who"} />);
      childs.push(
        <div
          className="relative mb-6 mt-12 hidden text-3xl font-extrabold text-dark after:absolute after:-bottom-8 after:left-0 after:h-1.5 after:w-28 after:rounded-3xl after:bg-primary md:block"
          key={"title"}
        >
          Adhérent
        </div>
      );
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 md:gap-12">
      {childs.reverse()}
    </div>
  );
};
