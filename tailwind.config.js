/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['Raleway', 'sans-serif'],
    },
    extend: {
      maxWidth: {
        myMax: '100ch',
      },
      fontFamily: {
        header: ['Permanent Marker', 'sans-serif'],
        mono: ['Fira Mono', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
