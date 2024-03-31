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
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "gradient-1": "var(--gradient-from)",
        "gradient-2": "var(--gradient-to)",
        "moon-light": "var(--moon-light)",
        "moon-dark": "var(--moon-dark)",
      },
      textColor: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
    },
  },
};
