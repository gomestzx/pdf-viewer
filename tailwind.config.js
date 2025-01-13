/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundColor: {
        main: {
          100: "#aa9ef6",
          200: "#9984f3",
          300: "#8769f0",
          400: "#7B66FF",
          500: "#7650ed",
          600: "#6436ea",
          700: "#522ce1",
        },
        sepia: "#faf2e7",
        dark: {
          background: "#1C2939",
        },
      },
      colors: {
        main: {
          100: "#aa9ef6",
          200: "#9984f3",
          300: "#8769f0",
          400: "#7B66FF",
          500: "#7650ed",
          600: "#6436ea",
          700: "#522ce1",
        },
        dark: {
          background: "#1C2939",
        },
        sepia: "#faf2e7",
      },
    },
  },
  plugins: [],
}