/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    borderRadius: {
      none: 0,
      sm: 'var(--radius-1)',
      DEFAULT: 'var(--radius-2)',
      md: 'var(--radius-3)',
      lg: 'var(--radius-4)',
      xl: 'var(--radius-5)',
      '2xl': 'var(--radius-6)',
      full: '99999px',
    },
  },
  plugins: [require('tailwindcss-animate')],
}
