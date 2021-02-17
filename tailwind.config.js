const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['ProductSans', 'sans-serif'],
    },
    colors: {
      gray: colors.coolGray,
      black: colors.black,
      white: '#FFFFFF',
      blue: {
        600: '#004DFF',
      },
      green: {
        500: '#1DC679',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
