/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['Raleway', 'sans-serif'],
    },
    extend: {
      maxWidth: {
        myMax: '80ch',
        w1400: '1400px',
      },
      fontFamily: {
        header: ['Permanent Marker', 'sans-serif'],
        mono: ['Fira Mono', 'monospace'],
      },
      colors: {
        accent: '#efb44e',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
