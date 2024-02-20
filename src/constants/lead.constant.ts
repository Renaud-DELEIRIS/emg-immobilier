import { z } from "zod";

export const initialData: Data = {
  nom: "",
  prenom: "",
  phone: "",
  email: "",
  dob: "",
  research: {
    radius: 30,
    budget: [100000, 1000000],
  },
  bien_price: 400000,
  verified: false,
  fonds_propres: {
    fonds_propres: 80000
  },
  charge: [],
  revenue_other: [],
};

export const schemaData = z.object({
  // Default
  phone: z.string(),
  email: z.string(),
  dob: z.string(),
  nom: z.string(),
  prenom: z.string(),
  verified: z.boolean(),
  idlead: z.string().optional(),
  // Step
  project: z
    .enum(["nouveau bien", "capacité d'emprunt", "renouveller hypothèque"])
    .optional(),
  which_step: z
    .enum([
      "recherche bien",
      "bien trouvé",
      "offre acceptée",
      "bientot signer",
      "signer",
    ])
    .optional(),

  research: z.object({
    npa: z.string().optional(),
    radius: z.number(),
    budget: z.array(z.number()).length(2),
  }),

  residence_type: z
    .enum(["principal", "secondaire", "invest", "other"])
    .optional(),
  bien_type: z
    .enum(["house", "appartement", "building", "construction"])
    .optional(),
  canton_bien: z.string().optional(),
  financement_actuel: z.number().optional(),
  bien_price: z.number(),
  do_work: z.boolean().optional(),
  emprunteur: z.enum(["seul", "deux", "other"]).optional(),
  ddn: z.string().optional(),
  ddn_2eme_emprunteur: z.string().optional(),
  revenue: z.number().optional(),
  revenue_other: z.array(
    z.object({
      type: z.string().optional(),
      montant: z.number().optional(),
    })
  ),
  charge: z.array(
    z.object({
      type: z.string().optional(),
      montant: z.number().optional(),
    })
  ),
  fonds_propres: z.object({
    fonds_propres: z.number().optional(),
    lpp: z.number().optional(),
    pilier3: z.number().optional(),
    donation: z.number().optional(),
    autre: z.number().optional(),
  }),
});

export type Data = z.infer<typeof schemaData>;
