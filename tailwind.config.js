/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      borderRadius : {
        xs: '10',
        sm: '12',
        md: '14',
        lg: '16',
        xl: '18'
      }
    },
  },
  plugins: [],
}