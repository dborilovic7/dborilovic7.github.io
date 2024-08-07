module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.{md,html}',
    './*.{md,html}'
  ],
  theme: {
    extend: {
      colors: {
        'cerulean': {
          DEFAULT: '#0CB5DF',
          50: '#A8EAFA',
          100: '#94E5F9',
          200: '#6EDCF7',
          300: '#47D2F5',
          400: '#20C9F3',
          500: '#0CB5DF',
          600: '#0991B3',
          700: '#076E88',
          800: '#054B5C',
          900: '#032730',
          950: '#01161B'
        }
      }
    }
  },
  plugins: []
}