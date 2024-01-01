/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    g: ({ theme }) => theme("spacing"),
    extend: {
      colors: {
        primary: "#68A691",
        secondary: "#BFD3C1",
        tertiary: "#FFE5D4",
        quaternary: "#FFCAD4",
        black: "#15140F",
      },
    },
    fontFamily: {
      body: ["Body"],
      display: ["Heading"],
      bold: ["BodyBold"],
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          g: (value) => ({
            gap: value,
          }),
        },
        { values: theme("g") }
      );
    }),
  ],
};
