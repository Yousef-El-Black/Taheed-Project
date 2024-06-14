/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      // Using modern `# + HEX Code`
      colorDark: "var(--color-dark)",
      colorLight: "var(--color-light)",
      backgroundColorDark: "var(--background-dark-color)",
      backgroundColorLight: "var(--background-light-color)",
      fontColor: "var(--font-color)",
      backgroundColor: "var(--background-color)",
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {},
    plugins: [],
  },
};
