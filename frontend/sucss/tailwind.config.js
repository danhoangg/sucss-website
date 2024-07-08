/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'sucss-purple': '#5a67d8',
        'dark-sucss-purple': '#303672',
        'border-color': '#37393d'
      }
    },
  },
  plugins: [],
}


