/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vendorOrange: '#fc631e',
      },
      boxShadow: {
        vendorShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
      },
      padding: {
        ten: '10px',
      },
      margin: {
        ten: '10px',
      },
    },
  },
  plugins: [],
};
