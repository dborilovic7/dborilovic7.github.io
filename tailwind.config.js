module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.{md,html}',
    './*.{md,html}',
    './_data/content.yml'
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
      },
      height: {
        'full-win-content': 'calc(100% - var(--topbar-height))',
        'desktop': 'calc(100% - var(--taskbar-height))'
      },
      gridTemplateColumns: {
        'win': 'repeat(auto-fill, 40px)',
        'win-sm': 'repeat(auto-fill, 66px)',
        'win-md': 'repeat(auto-fill, 88px)',
        'win-lg': 'repeat(auto-fill, 110px)',
        'win-xl': 'repeat(auto-fill, 133px)',
        'win-2xl': 'repeat(auto-fill, 150px)'
      },
      gridTemplateRows: {
        'win': 'repeat(auto-fill, 48px)',
        'win-sm': 'repeat(auto-fill, 67px)',
        'win-md': 'repeat(auto-fill, 80px)',
        'win-lg': 'repeat(auto-fill, 93px)',
        'win-xl': 'repeat(auto-fill, 104px)',
        'win-2xl': 'repeat(auto-fill, 124px)'
      }
    }
  },
  plugins: []
}