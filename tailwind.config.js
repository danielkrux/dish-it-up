/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    g: ({ theme }) => theme("spacing"),
    extend: {
      colors: {
        primary: "#BFCFBC",
        secondary: "#30362F",
        black: "#15140F",
      },
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
