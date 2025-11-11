import type { Config } from 'tailwindcss'

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsla(6, 100%, 66%, 1)',
        dark: '#000000',
      },
      fontFamily: {
        micro: ['MicroSquare', 'sans-serif'],
      },
      animation: {
        slideInLeft: 'slideInLeft 1s ease forwards',
        slideInRight: 'slideInRight 1s ease forwards',
      },
      keyframes: {
        slideInLeft: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
