/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          800: "rgba(52,53,65,1)",
          1000: "rgba(32, 33, 35, 1)",
          50: "rgba(247,247,248,1)",
        },
        green:{
          200:" rgba(16, 163, 127,1)",
        }
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
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
