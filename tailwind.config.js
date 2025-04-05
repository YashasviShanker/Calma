/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        text: "var(--color-text)",
        background: "var(--color-background)",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      height: {
        hero: "calc(100vh - 64px)",
      },
      ringColor: {
        primary: "var(--color-primary)",
      },
    },
  },
  plugins: [],
};
