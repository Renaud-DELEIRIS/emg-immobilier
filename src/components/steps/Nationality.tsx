import { useTranslation } from "next-i18next";
import Image from "next/image";
import nationalities from "~/data/nationalites.json";
import { useFormStore } from "~/stores/form";
import AutoComplete from "../inputs/Autocomplete";
import StepContainer from "./StepContainer";

const country = [
  {
    nationalite: "suisse",
    flags: "/flags/rounded_switz.png",
    key: "swiss",
  },
  {
    nationalite: "française",
    flags: "/flags/rounded_france.png",
    key: "french",
  },
  {
    nationalite: "allemande",
    flags: "/flags/rounded_dutch.png",
    key: "german",
  },
  {
    nationalite: "italienne",
    flags: "/flags/rounded_italia.png",
    key: "italian",
  },
];

const Nationality = () => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const { t } = useTranslation("step");
  return (
    <StepContainer title={t("nationality.title")} stepId="nationality">
      <div className="mb-2.5 grid grid-cols-2 gap-2.5 md:grid-cols-4">
        {country.map((item, index) => (
          <button
            className="flex h-[110px] w-full min-w-[160px] flex-col items-center justify-center gap-2.5 rounded-xl border-[1.5px] border-[#8888941A] bg-white shadow transition-all hover:bg-opacity-80 hover:shadow-md"
            key={index}
            onClick={() => {
              changeLead({
                nationality: item.nationalite,
              });
              nextStep("nationality");
            }}
          >
            <Image width={34} height={34} src={item.flags} alt="flag" />
            <span className="text-center text-[14px] font-semibold leading-[normal]">
              {t("nationality." + item.key)}
            </span>
          </button>
        ))}
      </div>
      <AutoComplete
        value={lead.nationality}
        onChange={(value) => {
          changeLead({
            nationality: value,
          });
        }}
        name="nationalite"
        options={nationalities.map(({ libelle, nationalite }) => ({
          value: nationalite,
          label: libelle,
        }))}
        placeholder={t("nationality.placeholder")}
      />
    </StepContainer>
  );
};

export default Nationality;
