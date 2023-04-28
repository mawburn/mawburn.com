/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        header: ['Baloo 2', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
