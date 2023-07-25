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
        dark: "#2F3946",
      },
    },
  },
  plugins: [],
} satisfies Config;
