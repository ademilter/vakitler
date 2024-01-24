const { TimeNames } = require("./lib/types");

/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        [TimeNames.Imsak]: {
          light: "#daf2fe",
          dark: "#192b3b",
        },
        [TimeNames.Gunes]: {
          light: "#feead6",
          dark: "#40221a",
        },
        [TimeNames.Ogle]: {
          light: "#fef6cc",
          dark: "#3a281a",
        },
        [TimeNames.Ikindi]: {
          light: "#ffe4e7",
          dark: "#421a25",
        },
        [TimeNames.Aksam]: {
          light: "#e0edff",
          dark: "#1b2448",
        },
        [TimeNames.Yatsi]: {
          light: "#e4e8fe",
          dark: "#212044",
        },
      },
    },
  },
  safelist: [
    {
      pattern: /bg-(imsak|gunes|ogle|ikindi|aksam|yatsi)-(light|dark)/,
    },
    {
      pattern:
        /bg-(sky|orange|yellow|rose|blue|indigo)-(50|100|200|300|400|500|600|700|800|900)/,
      variants: ["dark"],
    },
    {
      pattern:
        /text-(sky|orange|yellow|rose|blue|indigo)-(50|100|200|300|400|500|600|700|800|900)/,
      variants: ["dark"],
    },
    {
      pattern:
        /bg-opacity-(0|5|10|15|20|25|30|35|40|45|50|55|60|65|70|75|80|85|90|95|100)/,
      variants: ["dark"],
    },
    {
      pattern:
        /opacity-(0|5|10|15|20|25|30|35|40|45|50|55|60|65|70|75|80|85|90|95|100)/,
      variants: ["dark"],
    },
  ],
};
