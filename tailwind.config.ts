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
      animation: {
        fadeIn: "fadeIn 1s ease-in",
        fadeOut: "fadeOut 6s ease-out,",
        banner_come: "banner_come linear 6s",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        banner_come: {
          "0%": {
            transform: "translate(0px, -60vh)",
          },
          "33%": {
            transform: "translate(0px, -30dvh) rotate(10deg)",
          },
          "66%": {
            transform: "translate(0px, -30dvh) rotate(-10deg)",
          },
          "100%": {
            transform: "translate(0px, -30vh) rotate(0deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
