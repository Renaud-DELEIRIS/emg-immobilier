import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Update default border color
      borderColor: {
        DEFAULT: "#eaebec",
      },
      colors: {
        primary: {
          "50": "#eafff8",
          "100": "#cdfeeb",
          "200": "#a0fadc",
          "300": "#63f2ca",
          "400": "#25e2b4",
          "500": "#00c49b",
          "600": "#00a482",
          "700": "#00836c",
          "800": "#006757",
          "900": "#005548",
          "950": "#00302a",
          DEFAULT: "#00c49b",
        },
        grey: {
          "50": "#f5f6f8",
          "100": "#eceef3",
          "200": "#dddfe8",
          "300": "#c7cada",
          "400": "#b0b1c9",
          "500": "#9898b7",
          "600": "#8885a6",
          "700": "#757290",
          "800": "#605d76",
          "900": "#4f4f60",
          "950": "#2f2e38",
          DEFAULT: "#9898B7",
        },
        green: {
          "50": "#eafff5",
          "100": "#cdfee5",
          "200": "#a0fad1",
          "300": "#63f2b9",
          "400": "#25e29d",
          "500": "#00b67a",
          "600": "#00a46e",
          "700": "#00835c",
          "800": "#00674a",
          "900": "#00553e",
          "950": "#003024",
          DEFAULT: "#00b67a",
        },
        dark: "#2F3946",
      },
    },
  },
  plugins: [],
} satisfies Config;
