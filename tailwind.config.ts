import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#050505',
          soft: '#0D0D0D',
        },
        surface: {
          DEFAULT: '#141414',
          2: '#1C1C1C',
        },
        border: '#2A2A2A',
        text: {
          DEFAULT: '#F5F5F5',
          muted: '#A3A3A3',
          soft: '#D4D4D4',
        },
        accent: {
          DEFAULT: '#D62828',
          hover: '#B91C1C',
          soft: 'rgba(214, 40, 40, 0.12)',
        },
      },
      fontFamily: {
        heading: ['Oswald', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '12px',
      },
    },
  },
  plugins: [],
} satisfies Config
