const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    textColor: ['disabled'],
    cursor: ['disabled'],
  },
  plugins: [require('@tailwindcss/ui')],
};
