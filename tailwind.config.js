/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        myPrimary: "var(--primary-bg-color)",
        mySecondary: "var(--secondary-color)",
        myTextColor: "var(--dark-light-color)",
      },
    },
    screens: {
      xxs: "320px",
      xs: "480px",
      sm: "576px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
