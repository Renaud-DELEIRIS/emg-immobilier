import dayjs from "dayjs";
import { z } from "zod";

export const initialData: schemaData = {
  startInsurance: dayjs().add(1, "month").set("date", 1).format("DD.MM.YYYY"),
  paymentFrequency: "month",
  adherent: [],
  selectedAdherent: [],
  actualInsurance: undefined,
  address: "",
  email: "",
  for: undefined,
  nom: "",
  npa: undefined,
  phone: "",
  prenom: "",
  selectedOfferFrontalier: undefined,
  situation: undefined,
  verified: false,
};

export const shemaPack = z.object({
  id: z.number(),
  principal: z.string().optional(),
  options: z
    .array(
      z.object({
        id: z.number(),
        label: z.string(),
        level: z.number(),
      })
    )
    .optional(),
});

export const shemaAdherent = z.object({
  year: z.string().optional(),
  dob: z.string().optional(),
  type: z.enum(["main", "partner", "child"]),
  civility: z.enum(["man", "female"]).optional(),
  nom: z.string().optional(),
  prenom: z.string().optional(),
  nationality: z.string().optional(),
  couverture: z.boolean().optional(),
  couvertureAccident: z.enum(["oui", "non"]).optional(),
  travailSuisse: z.boolean().optional(),
  pack: shemaPack.optional(),
  franchise: z.string().optional(),
});

export const schemaKeyValue = z.object({
  key: z.union([z.number(), z.string()]),
  value: z.union([z.number(), z.string(), z.boolean()]),
});

export const schemaData = z.object({
  startInsurance: z.string(),
  paymentFrequency: z.string(),
  adherent: z.array(shemaAdherent),
  selectedAdherent: z.array(z.number()),
  actualInsurance: z.boolean().optional(),
  address: z.string().optional(),
  email: z.string(),
  for: z.string().optional(),
  nom: z.string(),
  npa: schemaKeyValue.optional(),
  phone: z.string(),
  prenom: z.string(),
  selectedOfferFrontalier: z.string().optional(),
  situation: z.enum(["frontalier", "future resident"]).optional(),
  verified: z.boolean(),
  economieimpots: z.boolean().optional(),
  idLead: z.string().optional(),
});

export type schemaData = z.infer<typeof schemaData>;
export type Adherent = z.infer<typeof shemaAdherent>;
export type keyvalue = z.infer<typeof schemaKeyValue>;
export type Pack = z.infer<typeof shemaPack>;
