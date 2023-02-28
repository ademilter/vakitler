/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-opacity-(10|20|30|40|50|60|70|80|90|100)/,
    },
    {
      pattern: /opacity-(10|20|30|40|50|60|70|80|90|100)/,
    },
  ],
};
