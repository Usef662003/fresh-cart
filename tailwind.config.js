const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true, // ✅ يجعل الـ container في المنتصف تلقائيًا
      padding: "1rem", // ✅ تباعد داخلي
      screens: {
        sm: "519px",
        md: "700px",
        lg: "940px",
        xl: "1120px",
        "2xl": "1440px",
      },
    },
    extend: {},
  },
  plugins: [heroui()], // ✅ إضافة HeroUI إلى الـ plugins
};
