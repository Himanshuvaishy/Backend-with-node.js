/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.ejs'],
  theme: {
  extend: {
    colors: {
      customBlue: '#1DA1F2',
      customRed: '#E0245E',
      customGreen: '#17BF63',
      // Add more custom colors as needed
    },
  },
  },
  plugins: [
  {
  tailwindcss: {},
  autoprefixer: {},
  },
  ],
  };

