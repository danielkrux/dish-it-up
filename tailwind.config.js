/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    g: ({ theme }) => theme("spacing"),
    extend: {
      maxHeight: {
        "screen-1/2": "50vh",
        "screen-3/4": "75vh",
      },
      colors: {
        primary: "#68A691",
        secondary: "#BFD3C1",
        tertiary: "#FFE5D4",
        quaternary: "#FFCAD4",
        black: "#15140F",
        acapulco: {
          50: "#f4f9f7",
          100: "#daede5",
          200: "#b5dacb",
          300: "#89bfac",
          400: "#68a691",
          500: "#468671",
          600: "#366b5b",
          700: "#2e574b",
          800: "#28473e",
          900: "#253c35",
          950: "#11221e",
        },
        gray: {
          50: "#f7f8f7",
          100: "#eef0f0",
          200: "#dadddc",
          300: "#a7aeac",
          400: "#949c99",
          500: "#77807e",
          600: "#606967",
          700: "#4f5553",
          800: "#434947",
          900: "#3b3f3e",
          950: "#272a29",
        },
      },
      gridTemplateColumns: {
        dashboard: "270px 1fr",
      },
      gridTemplateRows: {
        dashboard: "100vh",
      },
    },
    fontFamily: {
      body: ["Body"],
      display: ["Heading"],
      "body-bold": ["BodyBold"],
    },
  },
  plugins: [require("tailwindcss-animate")],
};
