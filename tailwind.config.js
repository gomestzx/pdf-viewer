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
        customLightPurple: {
          100: "#F5F5FF",
          200: "#ECEAFF",
          300: "#DDD6FE",
          400: "#C4B5FD",
          500: "#A78BFA",
          600: "#8B5CF6",
          700: "#7C3AED",
          800: "#6D28D9",
          900: "#5B21B6",
        },
        customOrange: '#EB5A3C',
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
        customLightPurple: {
          100: "#F5F5FF",
          200: "#ECEAFF",
          300: "#DDD6FE",
          400: "#C4B5FD",
          500: "#A78BFA",
          600: "#8B5CF6",
          700: "#7C3AED",
          800: "#6D28D9",
          900: "#5B21B6",
        },
        customOrange: '#EB5A3C',
      },
    },
  },
  plugins: [],
};
