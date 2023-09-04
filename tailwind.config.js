/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-bg-color)",
        secondary: "var(--secondary-color)",
        textColor: "var(--dark-light-color)",
      },
    },
  },
  plugins: [],
};
