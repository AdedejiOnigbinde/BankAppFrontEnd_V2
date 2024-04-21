/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors:{
        primaryGreenLight:"#e9f2e9",
        primaryGreenLightHover:"#deecde",
        primaryGreenLightActive:"#bad7ba",
        primaryGreen:"#207d20",
        primaryGreenHover:"#1d711d",
        primaryGreenActive:"#1a641a",
        primaryGreenDark:"#185e18",
        primaryGreenDarkHover:"#134b13",
        primaryGreenDarkAcvtive:"#0e380e",
        primaryGreenDarker:"#0b2c0b",
        errorLight:"#fee9e9",
        errorLightHover:"#fedede",
        errorLightActive:"#fdbaba",
        error:"#f92020",
        errorHover:"#e01d1d",
        errorActive:"#c71a1a",
        errorDark:"#bb1818",
        errorDarkHover:"#951313",
        errorDarkAcvtive:"#700e0e",
        errorDarker:"#570b0b",
        successLight:"#e9fae6",
        successLightHover:"#def7da",
        successLightActive:"#baefb2",
        success:"#22cb06",
        successHover:"#1fb705",
        successActive:"#1ba205",
        successDark:"#1a9805",
        successDarkHover:"#147a04",
        successDarkAcvtive:"#0f5b03",
        successDarker:"#0c4702",
        warningLight:"#fbf4e6",
        warningLightHover:"#f9efda",
        warningLightActive:"#f3ddb2",
        warning:"#d99105",
        warningHover:"#c38305",
        warningActive:"#ae7404",
        warningDark:"#a36d04",
        warningDarkHover:"#825703",
        warningDarkAcvtive:"#624102",
        warningDarker:"#4c3302",
        lightgray:"#F1F1F1"
      },
      fontFamily:{
        mulish:["Mulish"]
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};