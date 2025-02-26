import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        moveUp: "moveUp 1s ease-out forwards",
      },
      keyframes: {
        moveUp: {
          "0%": { transform: "translateX(-50%) translateY(0)", opacity: "1" },
          "100%": {
            transform: "translateX(-50%) translateY(-50px)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
