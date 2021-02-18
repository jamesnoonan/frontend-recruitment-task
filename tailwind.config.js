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
      orange: {
        600: '#FF9F00',
      },
    },
    extend: {
      colors: {
        gray: {
          50: '#F6F7F9',
        },
      },
      height: {
        'screen-xs': '50vh',
        'screen-sm': '75vh',
      },
      fontSize: {
        xs: '0.875rem', // 14px
        sm: '0.9375rem', // 15px
        lg: '1.125rem', // 18px
        xl: '1.375rem', // 22px
        '2xl': '1.5rem', // 24px
        '3xl': '2rem', // 32px
        '4xl': '2.75rem', // 44px
      },
      borderRadius: {
        md: '0.3125rem', // 5px
        lg: '0.625rem', // 10px
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
