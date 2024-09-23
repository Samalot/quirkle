import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        shake: {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translateX(-10px)",
          },
          "20%, 40%, 60%, 80%": {
            transform: "translateX(10px)",
          },
        },
      },
      animation: {
        shake: 'shake 0.6s ease-in-out 0.05s 1',
      }
    },
  },
  plugins: [],
  purge: {
    safelist: [
      'bg-purple-100',
      'border-purple-200',
      'bg-red-100',
      'border-red-200',
      'bg-green-100',
      'border-green-200',
      'bg-gray-100',
      'border-gray-200'
    ],
  },
};
export default config;
