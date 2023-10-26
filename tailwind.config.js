/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        gotham: ['Gotham'],
      },
      colors: {
        'dark-grey': '#333333',
        'light-grey': '#808080',
        'yellow-default': '#FFB612',
        'red-default': '#dc0a17',
        'green-default': '#2FC022',
      },
    },
  },
  plugins: [],
};
