import { z } from "zod";

export const initialData: Data = {
  nom: "",
  prenom: "",
  phone: "",
  email: "",
  dob: "",
  carPossesion: "",
  carBrand: "",
  carOption: null,
};

export const schemaCarOption = z
  .object({
    value: z.string(),
    brand: z.string(),
    label: z.string(),
    from: z.number(),
    to: z.number(),
  })
  .nullable();

export const schemaData = z.object({
  // Default
  phone: z.string(),
  email: z.string(),
  dob: z.string(),
  nom: z.string(),
  prenom: z.string(),
  // Step
  for: z.string().optional(),
  npa: z.string().optional(),
  carPossesion: z.string().nullable(),
  carBrand: z.string().nullable(),
  carOption: schemaCarOption,
});

export type Data = z.infer<typeof schemaData>;
