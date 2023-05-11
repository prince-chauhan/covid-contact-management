/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        '112': '28rem',
        '116': '30rem',
        '114': '38rem'
      }
    },
  },
  plugins: [],
}