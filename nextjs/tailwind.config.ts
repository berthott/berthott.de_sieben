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
