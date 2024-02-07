import { z } from "zod";

export const initialData: Data = {
  nom: "",
  prenom: "",
  phone: "",
  email: "",
  dob: "",
};

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
});

export type Data = z.infer<typeof schemaData>;
