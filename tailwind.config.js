/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: {
          900: "rgba(32,33,35,1)",
          800: "rgba(52,53,65,1)",
          700: "rgba(64,65,79,1)",
          600: "rgba(86,88,105,1)",
          500: "rgb(142,142,160,1)",
          400: "rgb(172,172,190,1)",
          50: "rgba(247,247,248,1)",
        },
        green: {
          200: " rgba(16, 163, 127,1)",
        },
      },
      maxHeight: {
        120: "60vh",
        "100%": "100%",
        "30vh": "30vh",
      },
      minHeight: {
        "10vh": "12vh",
      },
      height: {
        "85%": "85%",
        "15%": "15%",
        screen: "calc(var(--vh, 1vh) * 100)",
      },
      width: {
        "50vw": "50vw",
        "10vw": "10vw",
        "79.71%": "79.71%",
        "20.29%": "20.29%",
      },
      backgroundColor: {
        "vert-light-gradient":
          "linear-gradient(180deg,hsla(0,0%,100%,0) 13.94%,#fff 54.73%)",
      },
      backgroundImage: {
        "vert-light-gradient":
          "linear-gradient(180deg,hsla(0,0%,100%,0) 13.94%,#fff 54.73%)",
        "vert-dark-gradient":
          "linear-gradient(180deg,rgba(53,55,64,0),#353740 58.85%)",
      },
      fontWeight: {
        semimedium: "450",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
