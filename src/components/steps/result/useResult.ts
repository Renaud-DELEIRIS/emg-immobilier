import { getStepById, getStepInfo } from "~/constants/step.constant";
import { useFormStore } from "~/stores/form";
import { api } from "~/utils/api";

const useResult = () => {
  const lead = useFormStore((state) => state.data);
  const currentStep = useFormStore((state) => state.currentVisibleStep);
  const res = api.getOffers.useQuery(
    {
      apport:
        (lead.fonds_propres.fonds_propres ?? 0) +
        (lead.fonds_propres.lpp ?? 0) +
        (lead.fonds_propres.pilier3 ?? 0),
      revenues:
        (lead.revenue ?? 0) +
        (lead.revenue_other.reduce((acc, cur) => acc + (cur.montant ?? 0), 0) ??
          0),
      totalPret:
        lead.which_step === "recherche bien"
          ? lead.research.budget[1] ?? 0
          : lead.bien_price,
    },
    {
      staleTime: 1000 * 60 * 30,
      trpc: {},
      enabled:
        getStepInfo(currentStep, lead)[0] >=
        getStepInfo(getStepById("loader"), lead)[0],
    }
  );
  return res;
};

export default useResult;
