import { z } from "zod";

export const initialData: Data = {
  nom: "",
  prenom: "",
  phone: "",
  email: "",
  dob: "",
  car_buy_date: {},
  car_option: null,
};

export const schemaCarOption = z
  .object({
    value: z.string(),
    brand: z.string(),
    logo: z.string(),
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
  car_type: z.enum(["my_car", "future_car"]).optional(),
  car_brand: z.string().optional(),
  car_model: z.string().optional(),
  car_version: z.string().optional(),
  car_buy_date: z.object({
    month: z.string().optional(),
    year: z.string().optional(),
  }),
  car_distance: z.enum(["-7000km", "7000-15000", "+15000km"]).optional(),
  car_usage: z
    .enum(["private and go to work", "private", "professional"])
    .optional(),
  car_park_place: z.string().optional(),
  car_park_type: z
    .enum(["close parking", "secure parking", "street", "other"])
    .optional(),
  civility: z.enum(["mr", "mrs"]).optional(),
  nationality: z.string().optional(),
  residency_type: z.enum(["owner", "tenant", "other"]).optional(),
  eco_assurance_menage: z.boolean().optional(),
  car_leasing: z.boolean().optional(),
  needs: z.enum(["casco-partielle", "casco-complete"]).optional(),
  contract_start: z.string().optional(),
  already_assure: z.boolean().optional(),
  for: z.string().optional(),
  npa: z.string().optional(),
  car_option: schemaCarOption,
});

export type Data = z.infer<typeof schemaData>;
