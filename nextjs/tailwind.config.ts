import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-berthott)']
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-100%)', visibility: 'none' },
          '100%': { transform: 'translateY(0)', visibility: 'visible'},
        },
        'slide-out': {
          '0%': { transform: 'translateY(0)', visibility: 'visible' },
          '100%': { transform: 'translateY(-100%)', visibility: 'none' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-out': 'fade-out 0.5s ease-out forwards',
        'slide-in': 'slide-in 0.5s ease-out forwards',
        'slide-out': 'slide-out 0.5s ease-out forwards',
      },
    },
    borderWidth: {
      '10': '10px',
    },
  },
  plugins: [],
};
export default config;
