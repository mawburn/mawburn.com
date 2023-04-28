/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['Raleway', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        header: ['Itim', 'sans-serif'],
        mono: ['Fira Mono', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
