/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hejo-muda': '#E3FFF2',
        'hejo': '#73C376',
        'biru-euy': '#698BE2',
        'krim': '#F9FCE5',
        'coklat-muda': '#CBB294',
        'coklat-tua': '#7A6E60',
        'beureum': '#B65353',
      },
      fontFamily: {
        'inter': 'Inter, sans-serif'
      },
      borderWidth: {
        '1': '1px'
      },
      spacing: {
        'gede': '27rem',
        'gede-pisan': '33rem'
      }
    },
  },
  plugins: [],
}