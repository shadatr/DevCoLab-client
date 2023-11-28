/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.jsx",
    "./src/**/*.js",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#FFFFFF",
        lightRed: "#C52727",
        darkRed: "#6E2E2E",
        gray: "#908E8E",
        darkGray:"#161616"
      },
      fontSize: {
        xxlg: "60px",
        xlg: "48px",
        lg: "32px",
        md: "20px",
        sm:"16px",
        xsm:"15px",
      },
    },
    screens: {
      sm: "200px",
      md: "900px",
      lg: "1300px",
      xl: "1440px",
    },
  },
  plugins: [],
}