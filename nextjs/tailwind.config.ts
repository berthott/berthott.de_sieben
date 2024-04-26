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
        'scrolling-text': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(var(--scroll-distance))' },
        },
      },
      animation: {
        'scrolling-text': 'scrolling-text 15s linear infinite alternate',
      },
    },
  },
  plugins: [],
};
export default config;
