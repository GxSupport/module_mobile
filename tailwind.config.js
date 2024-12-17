/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        colorSpecial: '#2CC896',
        colorParagreph: '#0C61B0',
        colorText: '#10267B',
        colorTabBarBg: '#3E9DF92E',
        colorOpacityText: '#10267BCF',
        colorBoxWhite: '#F8F7F5',
      },
    },
  },
  plugins: [],
};
