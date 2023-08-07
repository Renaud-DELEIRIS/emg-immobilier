interface PackFrontalier {
  name: string;
  price: (age: number, couverture: boolean) => number;
  hash: string;
}

export const PackFrontalier: PackFrontalier[] = [
  {
    name: "LAMal Helsana Bilas",
    price: (age, couverture) => {
      const price =
        age < 19
          ? couverture
            ? 43.7
            : 40.7
          : age < 26
          ? couverture
            ? 157.5
            : 146.5
          : couverture
          ? 175
          : 162.8;
      return price;
    },
    hash: "1562",
  },
  {
    name: "Provita",
    price: (age, couverture) => {
      const price =
        age < 19
          ? couverture
            ? 62.4
            : 67
          : age < 26
          ? couverture
            ? 209.2
            : 194.6
          : couverture
          ? 259.4
          : 278.9;
      return price;
    },
    hash: "182",
  },
  {
    name: "Sanitas",
    price: (age, couverture) => {
      const price =
        age < 19
          ? couverture
            ? 112.2
            : 120
          : age < 26
          ? couverture
            ? 340
            : 317.9
          : couverture
          ? 374
          : 400;
      return price;
    },
    hash: "1509",
  },
  {
    name: "Concordia",
    price: (age, couverture) => {
      const price =
        age < 19
          ? couverture
            ? 134.5
            : 141.7
          : age < 26
          ? couverture
            ? 453.3
            : 430.2
          : couverture
          ? 537.8
          : 566.6;
      return price;
    },
    hash: "290",
  },
  {
    name: "Swica",
    price: (age, couverture) => {
      const price =
        age < 19
          ? couverture
            ? 177.5
            : 190.8
          : age < 26
          ? couverture
            ? 596.2
            : 554.5
          : couverture
          ? 739.3
          : 794.9;
      return price;
    },
    hash: "1384",
  },
  {
    name: "KPT",
    price: (age, couverture) => {
      const price =
        age < 19
          ? couverture
            ? 182.3
            : 196
          : age < 26
          ? couverture
            ? 605
            : 562.7
          : couverture
          ? 609.2
          : 655;
      return price;
    },
    hash: "376",
  },
  {
    name: "Agrisano",
    price: (age, couverture) => {
      const price =
        age < 19
          ? couverture
            ? 186.2
            : 196
          : age < 26
          ? couverture
            ? 560
            : 532
          : couverture
          ? 532
          : 560;
      return price;
    },
    hash: "1560",
  },
];
