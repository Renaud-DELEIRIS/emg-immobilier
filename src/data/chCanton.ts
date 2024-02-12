export const CHCanton = [
  {
    name: "Zurich",
    value: "ZH",
    index: 1,
  },
  {
    name: "Berne",
    value: "BE",
    index: 2,
  },
  {
    name: "Lucerne",
    value: "LU",
    index: 3,
  },
  {
    name: "Uri",
    value: "UR",
    index: 4,
  },
  {
    name: "Schwytz",
    value: "SZ",
    index: 5,
  },
  {
    name: "Obwald",
    value: "OW",
    index: 6,
  },
  {
    name: "Nidwald",
    value: "NW",
    index: 7,
  },
  {
    name: "Glaris",
    value: "GL",
    index: 8,
  },
  {
    name: "Zoug",
    value: "ZG",
    index: 9,
  },
  {
    name: "Fribourg",
    value: "FR",
    index: 10,
  },
  {
    name: "Soleure",
    value: "SO",
    index: 11,
  },
  {
    name: "Bâle-Ville",
    value: "BS",
    index: 12,
  },
  {
    name: "Bâle-Campagne",
    value: "BL",
    index: 13,
  },
  {
    name: "Schaffhouse",
    value: "SH",
    index: 14,
  },
  {
    name: "Appenzell Rhodes-Extérieures",
    value: "AR",
    index: 15,
  },
  {
    name: "Appenzell Rhodes-Intérieures",
    value: "AI",
    index: 16,
  },
  {
    name: "Saint-Gall",
    value: "SG",
    index: 17,
  },
  {
    name: "Grisons",
    value: "GR",
    index: 18,
  },
  {
    name: "Argovie",
    value: "AG",
    index: 19,
  },
  {
    name: "Thurgovie",
    value: "TG",
    index: 20,
  },
  {
    name: "Tessin",
    value: "TI",
    index: 21,
  },
  {
    name: "Vaud",
    value: "VD",
    index: 22,
  },
  {
    name: "Valais",
    value: "VS",
    index: 23,
  },
  {
    name: "Neuchâtel",
    value: "NE",
    index: 24,
  },
  {
    name: "Genève",
    value: "GE",
    index: 25,
  },
  {
    name: "Jura",
    value: "JU",
    index: 26,
  },
] as const;

export type ChCantonValue = (typeof CHCanton)[number]["value"];
