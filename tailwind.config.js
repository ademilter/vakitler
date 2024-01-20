/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  safelist: [
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
