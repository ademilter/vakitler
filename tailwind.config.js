/** @type {import("tailwindcss").Config} */
module.exports = {
  // darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "gradient-from": "var(--gradient-from)",
        "gradient-via": "var(--gradient-via)",
        "gradient-to": "var(--gradient-to)",
        "moon-light": "var(--moon-light)",
        "moon-dark": "var(--moon-dark)",
        card: "var(--card-bg)",
      },
      textColor: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        card: "var(--card-text)",
      },
    },
  },
};
