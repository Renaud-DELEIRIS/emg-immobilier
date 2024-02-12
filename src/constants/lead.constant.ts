import { z } from "zod";
import { CHCanton, ChCantonValue } from "~/data/chCanton";

export const initialData: Data = {
  nom: "",
  prenom: "",
  phone: "",
  email: "",
  dob: "",
  situation: [],
};

export const situation = [
  "Traveaux de rénovation résidence principale",
  "à éffectué des rachats d'années LPP",
  "à versé des pension alimentaires",
  "à cotisé sur un 3ème pilier",
  "à payé ses intérêts sur un crédit",
] as const;

export const schemaData = z.object({
  // Default
  phone: z.string(),
  email: z.string(),
  dob: z.string(),
  nom: z.string(),
  prenom: z.string(),
  // Step
  pays_residence: z.enum(["france", "suisse"]).optional(),
  canton_work: z
    .enum(CHCanton.map((a) => a.value) as [ChCantonValue, ...ChCantonValue[]])
    .optional(),
  regime_assurance_maladie_frontalier: z
    .enum(["LAMal", "CMU", "autre"])
    .optional(),
  nationality: z.string().optional(),
  permis_type: z.enum(["B", "C", "autre"]).optional(),
  npa: z.string().optional(),
  situation_marital: z
    .enum(["marié", "célibataire", "divorcé", "autre"])
    .optional(),
  yob: z.string().optional(),

  child_nb: z.number().optional(),
  situation_professionnelle: z
    .enum(["employé", "indépendant", "employé et indépendant", "autre"])
    .optional(),
  salary_brut: z.number().optional(),
  is_salary_above_120k: z.boolean().optional(),
  is_owner_property: z.boolean().optional(),
  situation: z.array(z.enum(situation)),
});

export type Data = z.infer<typeof schemaData>;
