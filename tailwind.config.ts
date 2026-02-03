import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        steam: {
          dark: '#1b2838',
          darker: '#171a21',
          blue: '#66c0f4',
          'blue-dark': '#1a9fff',
          green: '#5c7e10',
          text: '#c7d5e0',
          'text-light': '#ffffff',
        },
        amazon: {
          orange: '#FF9900',
        },
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'spin-slot': 'spin-slot 0.1s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
